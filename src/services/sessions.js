import { dbCreateSession, dbDeleteSession } from "../database/sessions.js";

// Creates a session in the data with an expiry data
export function createSession() {
  const sessionId = crypto.randomUUID();
  const sixHours = 6 * 60 * 60 * 100;

  dbCreateSession(sessionId);
  setTimeout(dbDeleteSession(sessionId), sixHours);

  return sessionId;
}

// Gets cookies and changes the format from an array into an object
function getCookies(req) {
  const cookiesString = req.headers.get("cookie");
  // Breaks cookies into individual cookies
  let spiltCookies = cookiesString.split(";");
  // Remove white space
  spiltCookies = spiltCookies.map((spiltCookie) => spiltCookie.trim());
  const keyValueCookies = [];

  spiltCookies.forEach((spiltCookie) => {
    // Breaks individual cookies into key values arrays
    keyValueCookies.push(spiltCookie.split("="));
  });
  // Connverts key value arrays into an object
  return Object.fromEntries(keyValueCookies);
}

// Gets the sessionId from the cookies
export function getSession(req) {
  const cookies = getCookies(req);
  const sessionId = cookies?.sessionId;
  return sessionId;
}
