// deno-fmt-ignore-file

import createItem from ".././handlers/new-item.js";
import getItems from ".././handlers/get-items.js"
import available from ".././handlers/in-stock.js";
import addStock from "../handlers/add-stock.js";
import removeStock from "../handlers/remove-stock.js";

const routingTable = [
  {method: "POST", path: "/create-item",          handler: createItem},
  {method: "GET",  path: "/get-items",            handler: getItems},
  {method: "POST", path: "/in-stock/:itemId",     handler: available},
  {method: "POST", path: "/add-stock/:itemId",    handler: addStock},
  {method: "POST", path: "/remove-stock/:itemId", handler: removeStock}
];


// Caches the table for speed and cleaness
const compile = routingTable.map((r) => ({
  method: r.method.toUpperCase(),
  pattern: new URLPattern({ pathname: r.path }),
  handler: r.handler,
}));

export default compile;
