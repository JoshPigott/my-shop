import json from "../utils/json.js";
import { dbAddItem, dbGetItems } from "../database/items.js";
import { dbNewStock, dbTrackStock } from "../database/stock.js";

// Creates an item adding it to the database and tracks stock for the item
export async function createItem(ctx) {
  const body = await ctx.req.json();
  // item info
  const id = crypto.randomUUID();
  const name = body.name;
  const description = body.description;
  const price = body.price;
  const rating = body.rating;
  const category = body.category;
  const image = body.image;

  const quantity = { small: 4, medium: 9, large: 1 };
  console.log("The item is", id);

  const item = { id, name, description, price, rating, category, image };
  dbAddItem(item);

  // Creates new table
  dbTrackStock(id);
  // Add stock for the first time
  dbNewStock(id, quantity);
  return new Response({ status: 201 });
}

// Gets querry meassage
function getQuerryMeassage(conditions, order) {
  let querryMeassage = `SELECT * FROM items`;
  if (conditions.length > 0) {
    querryMeassage = querryMeassage + ` WHERE ` + conditions.join(` AND `);
  }
  if (order.length > 0) {
    querryMeassage = querryMeassage + ` ORDER BY ` + order.join(` AND `);
  }
  querryMeassage = querryMeassage + ` LIMIT 3`;
  console.log("querryMeassage:", querryMeassage);
  return querryMeassage;
}

// Gets specific items in the database with their data
export function getItems(ctx) {
  const filters = new URLSearchParams(ctx.url.searchParams);
  const conditions = [];
  const order = [];
  const params = [];

  for (const [key, value] of filters.entries()) { // This is not going to work Object.entries(filters)
    // filter with ORDER
    if (key === "price_order") {
      console.log(value);
      order.push(`price ${value}`);
    } // filter with WHERE
    else {
      conditions.push(`${key} = ?`);
      params.push(value);
    }
  }

  const querryMeassage = getQuerryMeassage(conditions, order);

  const items = dbGetItems(querryMeassage, params);
  // I will return so format html here later on
  return new json({ "items": items }, { status: 200 });
}
