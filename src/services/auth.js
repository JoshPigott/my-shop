import * as bcrypt from "@da/bcrypt";
import { getSession, updateLoginStatus } from "./sessions.js";
import { dbGetLoginStatus } from "../database/sessions.js";
import {
  dbAddAccount,
  dbGetHashedPassword,
  dbUniqueUsername,
} from "../database/admin-accounts.js";

// Check user is login or not from sessions
export function getLoginStatus(req) {
  const sessionId = getSession(req);
  const login = dbGetLoginStatus(sessionId);

  if (login === 1) {
    return true;
  }
  return false;
}

// Check if hashed password is the same as the one stored
export async function verifyLoginService(username, password, req) {
  const hashedPassword = dbGetHashedPassword(username);
  const valid = await bcrypt.compare(password, hashedPassword);
  if (valid) {
    updateLoginStatus(req);
  }
  return valid;
}

// Checks if username start with agent and is a unique username
function isValidUsername(username) {
  if (!username.startsWith("agent")) {
    return false;
  }
  if (!dbUniqueUsername(username)) {
    return false;
  }
  return true;
}

// Stores hashed password and now the user is login
export async function registrationService(username, password, req) {
  // Checks if username is valid
  const valid = isValidUsername(username);
  if (!valid) return valid;

  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(password, salt);

  dbAddAccount(username, hashedPassword);
  updateLoginStatus(req);
  return valid;
}
