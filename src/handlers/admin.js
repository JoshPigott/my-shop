import { adminPage } from "../views/admin-page-template.js";
import htmlResponse from "../utils/html-response.js";
import { getLoginStatus } from "../services/auth.js";

export function getAdminPage(ctx) {
  const loginStatus = getLoginStatus(ctx.req);
  const html = adminPage(loginStatus);
  return htmlResponse(html, { status: 200 });
}
