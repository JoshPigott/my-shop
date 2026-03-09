import db from "./connection.js";
function dbNewTables() {
  // Listings
  db.prepare(`CREATE TABLE IF NOT EXISTS listings (
      id TEXT PRIMARY KEY, name TEXT UNIQUE, description TEXT, price REAL, rating REAL, status TEXT, category TEXT, image TEXT)`)
    .run();

  // Stores session ids
  db.prepare(
    `CREATE TABLE IF NOT EXISTS sessions (sessionId TEXT PRIMARY KEY, login BOOLEAN, expiryTime TEXT)`,
  ).run();

  // Creates table for admin accounts
  db.prepare(
    `CREATE TABLE IF NOT EXISTS accounts (username TEXT PRIMARY KEY, password TEXT)`,
  ).run();

  // Watch list table
  db.prepare(`CREATE TABLE IF NOT EXISTS watchlist (sessionId TEXT,
     listingId TEXT, FOREIGN KEY (listingId) REFERENCES listings (id),
     PRIMARY KEY (sessionId, listingId))`).run();
}
export default dbNewTables;
