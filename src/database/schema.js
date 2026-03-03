import db from "./connection.js";
function dbNewTables() {
  // Listings
  db.prepare(`CREATE TABLE IF NOT EXISTS listings (
      id TEXT PRIMARY KEY, name TEXT UNIQUE, description TEXT, price REAL, rating REAL, status TEXT, category TEXT, image TEXT)`)
    .run();

  // Stores session ids
  db.prepare(`CREATE TABLE IF NOT EXISTS sessions (sessionId TEXT PRIMARY KEY)`)
    .run();
}
export default dbNewTables;
