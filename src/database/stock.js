import { DB } from "sqliteModule";

// When new items are add the stock gets tracked
export function dbTrackStock(itemId) {
  const db = new DB("data/database");
  // "" must use around the table name as it contains -
  db.query(`CREATE TABLE IF NOT EXISTS "${itemId}-stock" (
            small INTEGER, medium INTEGER, large INTEGER)`);
  db.close();
}

// Adds new stock with the quantity
export function dbNewStock(itemId, quantity) {
  const db = new DB("data/database");
  db.query(
    `INSERT INTO "${itemId}-stock" (small, medium, large) VALUES (?, ?, ?)`,
    [quantity.small, quantity.medium, quantity.large],
  );
  db.close();
}

// Gets stock quntity of an item
export function dbGetStockLevels(itemId) {
  const db = new DB("data/database");
  const [data] = db.query(`SELECT * FROM "${itemId}-stock"`);
  const stock = { small: data[0], medium: data[1], large: data[2] };
  db.close();
  return stock;
}

// Adds new stock in the database
export function dbAddStock(itemId, quantity) {
  const db = new DB("data/database");
  // Math is done in the database to avoid a race condition
  db.query(
    `UPDATE "${itemId}-stock" SET small = small + ?, medium = medium + ?, large = large + ?`,
    [quantity.small, quantity.medium, quantity.large],
  );
  db.close();
}

// removes stock in the database
export function dbRemoveStock(itemId, quantity) {
  const db = new DB("data/database");
  // Math is done in the database to avoid a race condition
  db.query(
    `UPDATE "${itemId}-stock" SET small = small - ?, medium = medium - ?, large = large - ?`,
    [quantity.small, quantity.medium, quantity.large],
  );
  db.close();
}
