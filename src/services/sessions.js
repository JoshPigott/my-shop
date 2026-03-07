import {
  dbCreateSession,
  dbDeleteSession,
  dbGetAllSessions,
  dbUpdateLoginStatus,
} from "../database/sessions.js";

// Creates a session in the data with an expiry data
export function createSession() {
  const sessionId = crypto.randomUUID();
  const sixHours = 6 * 60 * 60 * 1000;
  const expiryTime = Date.now() + sixHours;
  dbCreateSession(sessionId, expiryTime);
  setTimeout(() => {
    dbDeleteSession(sessionId);
    console.log(`session ${sessionId} has been deleted`);
  }, sixHours);

  return sessionId;
}

// Used to delete sessions when the server start up
export function deleteExpiredSessions() {
  const currTime = Date.now();
  const sessions = dbGetAllSessions();

  sessions.forEach((session) => {
    // The session has expiried
    if (session.expiryTime <= currTime) {
      dbDeleteSession(session.sessionId);
      console.log(`session ${session.sessionId} has been deleted`);
    } else {
      const timeTillExpiry = session.expiryTime - currTime;
      setTimeout(() => {
        dbDeleteSession(session.sessionId);
        console.log(`session ${session.sessionId} has been deleted`);
      }, timeTillExpiry);
    }
  });
}

// Gets cookies and changes the format from an array into an object
function getCookies(req) {
  const cookiesString = req?.headers.get("cookie");
  if (!cookiesString) return false;

  // Breaks cookies into individual cookies
  let spiltCookies = cookiesString.split(";");
  // Remove white space
  spiltCookies = spiltCookies.map((spiltCookie) =>
    spiltCookie.trim().replaceAll('"', "")
  );
  // Breaks individual cookies into key values arrays
  const keyValueCookies = spiltCookies.map((c) => c.split("="));
  // Connverts key value arrays into an object
  return Object.fromEntries(keyValueCookies);
}

// Gets the sessionId from the cookies
export function getSession(req) {
  const cookies = getCookies(req);
  const sessionId = cookies?.sessionId;
  return sessionId;
}

// Updates login status to true
export function updateLoginStatus(req) {
  const sessionId = getSession(req);
  dbUpdateLoginStatus(sessionId);
}
