import db from "./connection.js";

// Adds an item to the database
export function dbAddItem(item) {
  db.query(
    "INSERT INTO items (id, name, description, price, rating, category, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      item.id,
      item.name,
      item.description,
      item.price,
      item.rating,
      item.category,
      item.image,
    ],
  );
}

// Gets all the items with all the data of each item
export function dbGetItems(querryMeassage, params) {
  const items = db.query(querryMeassage, params);
  console.log("Items:", items);
  return items;
}

// Get a specific item data
export function dbGetItem(itemId) {
  const [itemData] = db.query(`SELECT * FROM items WHERE id=?`, [itemId]);
  const item = {
    id: itemData[0],
    name: itemData[1],
    description: itemData[2],
    price: itemData[3],
    rating: itemData[4],
    category: itemData[5],
    image: itemData[6],
  };
  return item;
}
