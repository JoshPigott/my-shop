import { DB } from "sqliteModule";
function dbNewTables() {
  const db = new DB("data/database");
  db.query(`CREATE TABLE IF NOT EXISTS items (
      id INTEGER, name TEXT, description TEXT, rating REAL, category TEXT, image TEXT)`);

  db.close();
}

export default dbNewTables;
