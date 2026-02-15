import { dbRemoveStock } from "../database/stock.js";

async function removeStock(ctx) {
  const body = await ctx.req.json();
  const quantity = body.quantity;
  const itemId = ctx.params.itemId;

  // Makes sure error don't get thrown if an attribute does not exist
  quantity.small = quantity?.small ?? 0;
  quantity.medium = quantity?.medium ?? 0;
  quantity.large = quantity?.large ?? 0;

  // Updates quantity
  dbRemoveStock(itemId, quantity);
  return new Response({ "result": "Stock was removed" }, { status: 201 });
}
export default removeStock;
