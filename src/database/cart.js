import db from "./connection.js";

export function dbCreateNewCart(sessionId) {
  // cart-${sessionId} is in " " as it contains - so it gets interpreted as a string
  db.query(
    `CREATE TABLE IF NOT EXISTS "cart-${sessionId}" (id TEXT PRIMARY KEY, itemId TEXT, name TEXT, size TEXT, quantity INTEGER, price INTEGER)`,
  );
}

export function dbAddItem(sessionId, id, itemId, name, size, quantity, price) {
  db.query(`INSERT INTO "cart-${sessionId}" VALUES(?,?,?,?,?,?)`, [
    id,
    itemId,
    name,
    size,
    quantity,
    price,
  ]);
}

export function dbDeleteItem(sessionId, id) {
  db.query(`DELETE FROM "cart-${sessionId}" WHERE id=?`, [id]);
}

export function dbGetTotalPrice(sessionId) {
  let totalPrice = 0;
  const items = db.query(`SELECT (quantity, price) FROM "cart-${sessionId}"`);
  // The cart is empty
  if (items[0] === undefined) {
    return 0;
  }
  items.forEach((item) => {
    const quantity = item[0];
    const price = item[1];
    totalPrice += price * quantity;
  });
  return totalPrice;
}

export function dbGetCart(sessionId) {
  const rows = db.query(`SELECT * FROM "cart-${sessionId}"`);
  const cartItems = rows.map((row) => ({
    id: row[0],
    itemId: row[1],
    name: row[2],
    size: row[3],
    quantity: row[4],
    price: row[5],
  }));
  return cartItems;
}

export function dbClearCart(sessionId) {
  db.query(`DELETE FROM "cart-${sessionId}"`);
}
