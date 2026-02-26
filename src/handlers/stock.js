import { dbAddStock } from "../database/stock.js";
import inStock from "../utils/in-stock.js";
import json from "../utils/json.js";

// Checks if items are available to buy
export async function available(ctx) {
  const itemId = ctx.params.itemId;
  const body = await ctx.req.json();

  const stock = inStock(itemId, body.quantity, body.size);
  return json({ available: stock });
}

export async function addStock(ctx) {
  const body = await ctx.req.json();
  const quantity = body.quantity;
  const itemId = ctx.params.itemId;

  // Makes sure error don't get thrown if an attribute does not exist
  quantity.small = quantity?.small ?? 0;
  quantity.medium = quantity?.medium ?? 0;
  quantity.large = quantity?.large ?? 0;

  // Updates quantity
  dbAddStock(itemId, quantity);
  return new Response("Stock was added", { status: 201 });
}

// import { dbRemoveStock } from "../database/stock.js";

// async function removeStock(ctx) {
//   const body = await ctx.req.json();
//   const quantity = body.quantity;
//   const itemId = ctx.params.itemId;

//   // Makes sure error don't get thrown if an attribute does not exist
//   quantity.small = quantity?.small ?? 0;
//   quantity.medium = quantity?.medium ?? 0;
//   quantity.large = quantity?.large ?? 0;

//   // Updates quantity
//   dbRemoveStock(itemId, quantity);
//   return new Response({ "result": "Stock was removed" }, { status: 201 });
// }
