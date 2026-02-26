import { DB } from "sqliteModule";
const db = new DB("data/database");

// Makes sure database closes when serve is closed
Deno.addSignalListener("SIGINT", () => {
  db.close();
  Deno.exit();
});

export default db;
