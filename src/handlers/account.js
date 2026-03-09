import * as bcrypt from "@da/bcrypt";
import { updateLoginStatus } from "../services/sessions.js";
import { adminLoginView } from "../views/admin/admin-login.js";
import { createListingView } from "../views/listings/create-listing.js";
import {
  dbAddAccount,
  dbGetHashedPassword,
  dbUniqueUsername,
} from "../database/admin-accounts.js";
import htmlResponse from "../utils/html-response.js";

// Logs in user in if username and password are valid
export async function isValidPassword(ctx) {
  const formData = await ctx.req.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  const hashedPassword = dbGetHashedPassword(username);
  const valid = await bcrypt.compare(password, hashedPassword);

  if (valid) {
    updateLoginStatus(ctx.req);
    const html = createListingView();
    return htmlResponse(html, { status: 200 });
  } else {
    const html = adminLoginView("Invalid credentials");
    // I can't return status of 401 because it treats it as an error and fails to load the html
    return htmlResponse(html, { status: 200 });
  }
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

// Makes a new account if username is valid
export async function newAccount(ctx) {
  const formData = await ctx.req.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  // Checks if username is valid
  const valid = isValidUsername(username);
  if (!valid) {
    const html = adminLoginView("Invalid credentials");
    // I can't return status of 401 because it treats it as an error and fails to load the html
    return htmlResponse(html, { status: 200 });
  }

  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(password, salt);

  dbAddAccount(username, hashedPassword);
  updateLoginStatus(ctx.req);
  const html = createListingView();
  return htmlResponse(html, { status: 200 });
}
