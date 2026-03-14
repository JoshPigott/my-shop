import { adminPageView } from "../views/admin/admin-page.js";
import htmlResponse from "../utils/html-response.js";
import { getLoginStatus } from "../services/auth.js";
import { dbGetAllListings } from "../database/listings.js";

// Gets data need to set admin page and the data in html format
export function adminPage(ctx) {
  const loginStatus = getLoginStatus(ctx.req);
  const listings = dbGetAllListings();
  const html = adminPageView(loginStatus, listings);
  return htmlResponse(html, { status: 200 });
}
