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

## Project Deployment Info
Project is hosted on CloudFlare. 

To deploy local code:

```bash
npm run deploy
```

Cloudflare will build and update with the latest.

Builds resulting from a push to the GitHub repo will fail; committing the .open-next directory will resolve this but seems unnecesssary.

Deploy from local, no bloaty files needed.