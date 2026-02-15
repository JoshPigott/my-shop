import { dbGetItems } from "../database/items.js";

// Gets all items in the database with there data
function getItems(_ctx) {
  const items = dbGetItems();
  console.log(items);
  // I will return so format html here later on
  return new Response({ status: 200 });
}
export default getItems;
