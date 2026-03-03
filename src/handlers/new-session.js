import { createSession } from "../services/sessions.js";
import { dbCreateNewWatchList } from "../database/watch-list.js";

function newSession(_ctx) {
  const sessionId = createSession();
  // Create a watch list for the user
  dbCreateNewWatchList(sessionId);
  console.log("session created:", sessionId);
  return new Response(null, {
    status: 204,
    header: {
      "Set-Cookies":
        `sessionId=${sessionId}; HttpOnly; SameSite=Scrict; path=/`,
    },
  });
}
export default newSession;
