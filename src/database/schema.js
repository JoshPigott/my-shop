import db from "./connection.js";
function dbNewTables() {
  // Items
  db.query(`CREATE TABLE IF NOT EXISTS items (
      id TEXT PRIMARY KEY, name TEXT, description TEXT, price REAL, rating REAL, category TEXT, image TEXT)`);

  // Stores session ids
  db.query(`CREATE TABLE IF NOT EXISTS sessions (sessionId TEXT PRIMARY KEY)`);
}
export default dbNewTables;
