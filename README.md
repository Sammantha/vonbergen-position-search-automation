# VonBergen Position Search Automation
A simple front-end built with NextJS to display open position listings from the web matching previously determined criteria. 

MVP: One parent page of listings, which consist of a card with a title, url, and delete button. 

v2: Form to modify the scraping parameters and update the DB for multiple users.

## Project Running Info
To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


To ensure that your types are always up-to-date, make sure to run:
```bash
 wrangler types --env-interface CloudflareEnv
 ```
 after any changes to your config file.


## Project Deployment Info
Project is hosted on CloudFlare using Workers.

To deploy local code:

```bash
npm run deploy
```

Cloudflare will build and update with the latest.

Deploy using CLI, no pipeline from GitHub to CloudFlare Worers is set up.


## Local Development
CloudFlare: Local development is supported for Service bindings. For each Worker, open a new terminal and use wrangler dev in the relevant directory. When running wrangler dev, service bindings will show as connected/not connected depending on whether Wrangler can find a running wrangler dev session for that Worker.

Wrangler also supports running multiple Workers at once with one command. To try it out, pass multiple -c flags to Wrangler, like this: wrangler dev -c wrangler.json -c ../other-worker/wrangler.json. The first config will be treated as the primary worker, which will be exposed over HTTP as usual at http://localhost:8787. The remaining config files will be treated as secondary and will only be accessible via a service binding from the primary worker.

## Architecture
CloudFlare demo model: https://github.com/cloudflare/js-rpc-and-entrypoints-demo/tree/main

api is a Worker which has access to a D1 database, and exposes two different entrypoints: PublicStore and AdminStore. These stores expose different functions, appropriate for their associated access level. 
PublicStore exposes getListingsByUserId() and deleteListing(). 
AdminStore exposes a mutating deleteAllTasks() function. 
The D1 database can only be queried with code owned by the api Worker, since the binding is only present in the api Worker's wrangler.toml file.

public-service is a Worker which hosts the SaaS application dashboard. public-service has one webpage: /. 
When a user is selected on the / page, it shows listings and allows the user to soft-delete listings. 
public-service has a Service binding to api's PublicStore entrypoint. This allows the public-service to request an AuthedStore (a class extending RpcTarget) from the PublicStore for the given user. This AuthedStore has context on who this user is, and can only access that particular user's information.

admin-service is a Worker (hypothetically protected by Cloudflare Access).
It has a binding to api's AdminStore entrypoint, which grants it access to the administrative function upsertListings().

Not only does this design showcase how to design a secure system using entrypoints as a mechanism to gate role-based access control within your application, but it also shows how you might separate out ownership of a complex application across various development teams. For example, public-service might be developed by a team of frontend-focused developers, whereas api and the queries within might be maintained by database experts.