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
