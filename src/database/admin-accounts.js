import db from "../database/connection.js";

// Returns hashed password or undefined if username is invalid
export function dbGetHashedPassword(username) {
  const res = db.prepare(`SELECT password FROM accounts WHERE username=?`).get(
    username,
  );
  return res?.password;
}

export function dbAddAccount(username, hashedPassword) {
  db.prepare(`INSERT INTO accounts (username, password) VALUES (?, ?)`).run(
    username,
    hashedPassword,
  );
}

// Checks username is taken
export function dbUniqueUsername(username) {
  const res = db.prepare(`SELECT * FROM accounts WHERE username=?`).get(
    username,
  );
  // Account is unique
  if (res === undefined) {
    return true;
  }
  // The account is not unique
  return false;
}
