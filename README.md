## My-Shop

- This project recreates a shop

## Features

- Adding items
- Checking if the stock is available
- Adding and Remove stock
- A cart to check track of the items
- A buy options

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
├── public
│   ├── index.html
│   └── setup-session.js
│
└── src
    ├── server.js
    │
    ├── database
    │   ├── cart.js
    │   ├── connection.js
    │   ├── items.js
    │   ├── schema.js
    │   ├── sessions.js
    │   └── stock.js
    │
    ├── handlers
    │   ├── cart.js
    │   ├── items.js
    │   ├── new-session.js
    │   └── stock.js
    │
    ├── routes
    │   └── table.js
    │
    ├── services
    │   └── sessions.js
    │
    └── utils
        ├── in-stock.js
        └── json.js
```

- I am going to make an online shop
- lululemon their home page imteas with their price

- a cost
- filter - like the price category ect
- change color
- pitrues
- a current shopping cart
- as long as I have got cute pictures it will be okay

## Plan

- Add a shopping cart
- Make some handlers for the cart
- Draw the flow of the app out

- Think about the filters
  - By category
  - By price high to low
  - By price low to high
  - Rating
