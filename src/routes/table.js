// deno-fmt-ignore-file

import newSession from "../handlers/new-session.js";
import { createItem, getItems }from "../handlers/items.js";
import { addStock, available } from "../handlers/stock.js";
import { buy, addToCart, getCart, removeFromCart } from "../handlers/cart.js"

// Some of these routes will need to be protected later on
const routingTable = [
  {method: "POST",   path: "/create-session",       handler: newSession},
  {method: "POST",   path: "/create-item",          handler: createItem},
  {method: "GET",    path: "/get-items",            handler: getItems},
  {method: "POST",   path: "/in-stock/:itemId",     handler: available},
  {method: "POST",   path: "/add-stock/:itemId",    handler: addStock},
  {method: "GET",    path: "/buy",                  handler: buy},
  {method: "POST",   path: "/cart-item-add",        handler: addToCart},
  {method: "GET",    path: "/cart-get",             handler: getCart},
  {method: "DELETE", path: "/cart-item-delete",     handler: removeFromCart}, 
];


// Caches the table for speed and cleaness
const compile = routingTable.map((r) => ({
  method: r.method.toUpperCase(),
  pattern: new URLPattern({ pathname: r.path }),
  handler: r.handler,
}));

export default compile;
