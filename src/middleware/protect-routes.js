import { getLoginStatus } from "../services/auth.js";

// Restricts certain routes to logged-in users only
export function isLogin(handler) {
  // Is login
  return async (ctx) => {
    const login = getLoginStatus(ctx.req);
    if (login === false) {
      console.log("Unauthorised access to this route");
      return new Response("Unauthorised access", { status: 401 });
    }
    return await handler(ctx);
  };
}
