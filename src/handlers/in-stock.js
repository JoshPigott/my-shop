// So here I am going to have to get the data from the body of the request and call a funcation from teh database
import { dbGetStockLevels } from "../database/stock.js";
import json from "../helper-functions/json.js";

// Checks if items are available to buy
async function available(ctx) {
  const itemId = ctx.params.itemId;
  const body = await ctx.req.json();
  const stock = dbGetStockLevels(itemId);
  console.log(stock);

  const quantityAvailable = stock[body.size];
  // Checks to see if the quntity wanted is greater than the quantity available
  return json(body.quantity < quantityAvailable);
}
export default available;
