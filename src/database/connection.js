import { Database } from "@db/sqlite";
const db = new Database("data/database");

// Makes sure database closes when serve is closed
Deno.addSignalListener("SIGINT", () => {
  db.close();
  Deno.exit();
});

export default db;
