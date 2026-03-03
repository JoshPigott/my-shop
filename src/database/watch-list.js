import db from "./connection.js";

export function dbCreateNewWatchList(sessionId) {
  // watchList-${sessionId} is in " " as it contains - so it gets interpreted as a string
  db.prepare(
    `CREATE TABLE IF NOT EXISTS "watchList-${sessionId}" (id TEXT PRIMARY KEY, listingId TEXT, name TEXT, price INTEGER)`,
  ).run();
}

export function dbAddWatchList(sessionId, id, listingId, name, price) {
  db.prepare(`INSERT INTO "watchList-${sessionId}" VALUES(?,?,?,?)`).run([
    id,
    listingId,
    name,
    price,
  ]);
}

export function dbDeleteWatchList(sessionId, listingId) {
  db.prepare(`DELETE FROM "watchList-${sessionId}" WHERE listingId=?`).run([
    listingId,
  ]);
}

export function dbGetWatchList(sessionId) {
  const watchList = db.prepare(`SELECT * FROM "watchList-${sessionId}"`).all();
  return watchList;
}
