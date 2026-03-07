import db from "./connection.js";

export function dbCreateSession(sessionId, expiryTime) {
  // expiryTime is a string to safely store large numbers without overflow
  db.prepare(
    "INSERT INTO sessions (sessionId, login, expiryTime) VALUES(?, ?, ?)",
  ).run(sessionId, false, expiryTime.toString());
}

export function dbDeleteSession(sessionId) {
  db.prepare("DELETE FROM sessions WHERE sessionId=?").run(sessionId);
}

// Now the database remembers that user is login
export function dbUpdateLoginStatus(sessionId) {
  db.prepare("UPDATE sessions SET login=? WHERE sessionId=?").run(
    true,
    sessionId,
  );
}

export function dbGetLoginStatus(sessionId) {
  const res = db.prepare("SELECT login FROM sessions WHERE sessionId=?").get(
    sessionId,
  );
  return res?.login;
}

export function dbGetAllSessions() {
  const sessions = db.prepare("SELECT * FROM sessions").all();
  // Converts expiryTime back to a number
  return sessions.map((session) => ({
    sessionId: session.sessionId,
    login: session.login,
    expiryTime: Number(session.expiryTime),
  }));
}
