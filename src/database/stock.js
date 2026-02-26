import db from "./connection.js";

// When new items are add the stock gets tracked
export function dbTrackStock(itemId) {
  // "" must use around the table name as it contains -
  db.query(`CREATE TABLE IF NOT EXISTS "${itemId}-stock" (
            small INTEGER, medium INTEGER, large INTEGER)`);
}

// Adds new stock with the quantity
export function dbNewStock(itemId, quantity) {
  db.query(
    `INSERT INTO "${itemId}-stock" (small, medium, large) VALUES (?, ?, ?)`,
    [quantity.small, quantity.medium, quantity.large],
  );
}

// Gets stock quntity of an item
export function dbGetStockLevels(itemId) {
  const [data] = db.query(`SELECT * FROM "${itemId}-stock"`);
  const stock = { small: data[0], medium: data[1], large: data[2] };
  return stock;
}

// Adds new stock in the database
export function dbAddStock(itemId, quantity) {
  // Math is done in the database to avoid a race condition
  db.query(
    `UPDATE "${itemId}-stock" SET small = small + ?, medium = medium + ?, large = large + ?`,
    [quantity.small, quantity.medium, quantity.large],
  );
}

// Removes stock in the database
export function dbRemoveStock(itemId, quantity, size) {
  // Math is done in the database to avoid a race condition
  if (size === "small") {
    db.query(`UPDATE "${itemId}-stock" SET small = small - ?`, [quantity]);
  } else if (size === "medium") {
    db.query(`UPDATE "${itemId}-stock" SET medium = medium - ?`, [quantity]);
  } else if (size === "large") {
    db.query(`UPDATE "${itemId}-stock" SET large = large - ?`, [quantity]);
  }
}
