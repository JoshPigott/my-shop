import { adminPageView } from "../views/admin/admin-page.js";
import htmlResponse from "../utils/html-response.js";
import { getLoginStatus } from "../services/auth.js";

export function adminPage(ctx) {
  const loginStatus = getLoginStatus(ctx.req);
  const html = adminPageView(loginStatus);
  return htmlResponse(html, { status: 200 });
}
