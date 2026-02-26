import { dbGetStockLevels } from "../database/stock.js";

// Checks if item is available to buy
function inStock(itemId, quantityWanted, size) {
  const stock = dbGetStockLevels(itemId);
  const quantityAvailable = stock[size];
  return quantityWanted < quantityAvailable;
}
export default inStock;
