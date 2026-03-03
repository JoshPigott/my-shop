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
.
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
    │   ├── connection.js
    │   ├── listings.js
    │   ├── schema.js
    │   ├── sessions.js
    │   └── watch-list.js
    │
    ├── handlers
    │   ├── listings.js
    │   ├── new-session.js
    │   └── watch-list.js
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
    │   └── sessions.js
    │
    ├── utils
    │   ├── html-response.js
    │   └── json.js
    │
    └── views
        ├── listing-template.js
        ├── listings-page-template.js
        └── listings-template.js
```

"sqlite": "https://deno.land/x/sqlite@v3.9.1/mod.ts"
