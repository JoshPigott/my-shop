import db from "./connection.js";

export function dbAddToWatchlist(sessionId, listingId) {
  db.prepare(`INSERT INTO watchlist (sessionId, listingId) VALUES(?, ?)`).run(
    sessionId,
    listingId,
  );
}

// Used when user wants to delete listing from watchlist
export function dbRemoveFromWatchlist(sessionId, listingId) {
  db.prepare(`DELETE FROM watchlist WHERE sessionId=? AND listingId=?`).run(
    sessionId,
    listingId,
  );
}

// Used when agent deletes listing
export function dbDeleteListingsById(listingId) {
  db.prepare(`DELETE FROM watchlist WHERE listingId=?`).run(listingId);
}

// Returns all the user listings id in their watch list
export function dbGetWatchlist(sessionId) {
  const watchlist = db.prepare(`SELECT * FROM watchlist WHERE sessionId=?`).all(
    sessionId,
  );
  return watchlist;
}

// Deletes when session end so number of rows don't bulid up
export function dbClearWatchlist(sessionId) {
  db.prepare(`DELETE FROM watchlist WHERE sessionId=?`).run(sessionId);
}

// Checks if a listing is in the user watchlist
export function dbIsInWatchlist(sessionId, listingId) {
  const res = db.prepare(
    `SELECT * FROM watchlist WHERE sessionId=? AND listingId=?`,
  ).get(sessionId, listingId);
  if (res === undefined) {
    return false;
  }
  return true;
}
