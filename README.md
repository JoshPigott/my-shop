## My-Shop

- This project recreates real estate webstite

## Features

- Adding listings
- A watch-list to check track of the listings
- A buy option
- filters

## Requirements

- Install deno
- Run `iwr https://deno.land/install.ps1 -useb | iex` (windows)

## How to run

- This will come later once I build the html

## File structure

```text
├── deno.json
├── deno.lock
├── flow.md
├── README.md
│
├── .vscode
│   └── settings.json
│
├── data
│   ├── .gitkeep
│   └── database
│
└── src
    ├── server.js
    │
    ├── database
    │   ├── admin-accounts.js
    │   ├── connection.js
    │   ├── listings.js
    │   ├── schema.js
    │   ├── sessions.js
    │   └── watch-list.js
    │
    ├── handlers
    │   ├── account.js
    │   ├── admin.js
    │   ├── listings.js
    │   ├── new-session.js
    │   └── watch-list.js
    │
    ├── middleware
    │   ├── get-subdomain.js
    │   ├── protect-routes.js
    │   └── server-static-files.js
    │
    ├── public
    │   ├── index.html
    │   ├── setup-session.js
    │   ├── watch-list.html
    │   │
    │   └── assets
    │       └── listings-pics
    │           ├── bella-italia.jpg
    │           ├── big-sky.jpg
    │           ├── focal-point.jpg
    │           ├── grandeur.jpg
    │           ├── la-belle-vie.jpg
    │           ├── lifestyle-collective.jpg
    │           ├── maison-du-soleil.jpg
    │           ├── safehaven.jpg
    │           ├── sky-view.jpg
    │           ├── substance.jpg
    │           ├── the-beacon.jpg
    │           ├── town-country.jpg
    │           └── watercolours.jpg
    │
    ├── routes
    │   └── index.js
    │
    ├── services
    │   ├── auth.js
    │   └── sessions.js
    │
    ├── utils
    │   ├── html-response.js
    │   └── json.js
    │
    └── views
        ├── admin-login.js
        ├── admin-page.js
        ├── create-listing.js
        ├── listing.js
        ├── listings-page.js
        └── listings.js
```
