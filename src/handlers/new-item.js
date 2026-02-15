import { dbAddItem } from "../database/items.js";
import { dbNewStock, dbTrackStock } from "../database/stock.js";

function createItem(_ctx) {
  // I item info
  const id = crypto.randomUUID();
  const name = "blake";
  const description = "money, freedom, W person";
  const rating = "4.3";
  const category = "Mentor";
  const image = "idk";

  const quantity = { small: 4, medium: 9, large: 1 };
  console.log("The item is", id);

  const item = { id, name, description, rating, category, image };
  dbAddItem(item);

  // Creates new table
  dbTrackStock(id);

  // Add stock for the first time
  dbNewStock(id, quantity);
  return new Response({ status: 201 });
}

export default createItem;
