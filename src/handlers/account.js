import { dbGetAllListings } from "../database/listings.js";
import { registrationService, verifyLoginService } from "../services/auth.js";
import { adminLoginView } from "../views/admin/admin-login.js";
import { adminMainView } from "../views/admin/admin-page.js";
import htmlResponse from "../utils/html-response.js";

// Logs in user in if username and password are valid
export async function isValidPassword(ctx) {
  const formData = await ctx.req.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  const valid = await verifyLoginService(username, password, ctx.req);

  if (valid) {
    const listings = dbGetAllListings();
    const html = adminMainView(listings);
    return htmlResponse(html, { status: 200 });
  } else {
    const html = adminLoginView("Invalid credentials");
    // I can't return status of 401 because it treats it as an error and fails to load the html
    return htmlResponse(html, { status: 200 });
  }
}

// Makes a new account if username is valid
export async function newAccount(ctx) {
  const formData = await ctx.req.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  const valid = await registrationService(username, password, ctx.req);
  if (!valid) {
    const html = adminLoginView("Invalid credentials");
    // I can't return status of 401 because it treats it as an error and fails to load the html
    return htmlResponse(html, { status: 200 });
  }

  const listings = dbGetAllListings();
  const html = adminMainView(listings);
  return htmlResponse(html, { status: 200 });
}
