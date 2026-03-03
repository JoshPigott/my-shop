import db from "./connection.js";

export function dbCreateSession(sessionId) {
  db.prepare("INSERT INTO sessions (sessionId) VALUES(?)").run([sessionId]);
}

export function dbDeleteSession(sessionId) {
  db.prepare("DELETE FROM sessions WHERE sessionId=?").run([sessionId]);
}
