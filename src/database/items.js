import { DB } from "sqliteModule";

// Adds an item to the database
export function dbAddItem(item) {
  const db = new DB("data/database");
  db.query(
    "INSERT INTO items (id, name, description, rating, category, image) VALUES (?, ?, ?, ?, ?, ?)",
    [
      item.id,
      item.name,
      item.description,
      item.rating,
      item.category,
      item.image,
    ],
  );
  db.close();
}

// Gets all the items with all the data of each item
export function dbGetItems() {
  const db = new DB("data/database");
  const items = db.query(`SELECT * FROM items`);
  db.close();
  return items;
}
