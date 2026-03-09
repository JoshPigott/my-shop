import db from "./connection.js";

export function dbCreateWatchlist(sessionId) {
  // watchlist-${sessionId} is in " " as it contains - so it gets interpreted as a string
  db.prepare(
    `CREATE TABLE IF NOT EXISTS "watchlist-${sessionId}" (listingId TEXT PRIMARY KEY)`,
  ).run();
}

export function dbAddToWatchlist(sessionId, listingId) {
  db.prepare(`INSERT INTO "watchlist-${sessionId}" VALUES(?)`).run(
    listingId,
  );
}

export function dbRemoveFromWatchlist(sessionId, listingId) {
  db.prepare(`DELETE FROM "watchlist-${sessionId}" WHERE listingId=?`).run(
    listingId,
  );
}

export function dbGetWatchlist(sessionId) {
  const watchlist = db.prepare(`SELECT * FROM "watchlist-${sessionId}"`).all();
  return watchlist;
}

// Deletes when session end so number of tables/watch list don't build up
export function dbDeleteWatchlist(sessionId) {
  db.prepare(`DROP TABLE IF EXISTS "watchlist-${sessionId}"`).run();
}

export function dbIsInWatchlist(sessionId, listingId) {
  const res = db.prepare(
    `SELECT * FROM "watchlist-${sessionId}" WHERE listingId=?`,
  ).get(listingId);
  if (res === undefined) {
    return false;
  }
  return true;
}
