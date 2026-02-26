import db from "./connection.js";

export function dbCreateSession(sessionId) {
  db.query("INSERT INTO sessions (sessionId) VALUES(?)", [sessionId]);
}

export function dbDeleteSession(sessionId) {
  db.query("DELETE FROM sessions WHERE sessionId=?", [sessionId]);
}
