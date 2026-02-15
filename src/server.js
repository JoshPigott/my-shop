import { join } from "pathModule";
import { serveFile } from "serveFileModule";

import json from "./helper-functions/json.js";
import dbNewTables from "./database/table.js";

import compile from "./routes/table.js";

// sets up tables for database
dbNewTables();

// Checks if the file exists or not
async function isFile(filepath) {
  try {
    const fileInfo = await Deno.stat(filepath);
    return fileInfo.isFile;
  } catch (_err) {
    return false;
  }
}

async function serveStaticFiles(req, pathname) {
  const currworkingDir = Deno.cwd();
  const filepath = join(currworkingDir, "/public", pathname);

  // returns a default of index.html
  if (pathname === "/") {
    return await serveFile(req, join(currworkingDir, "/public/index.html"));
  }
  // serves the static file
  if (await isFile(filepath)) {
    return await serveFile(req, filepath);
  } // There is no static file
  else {
    return null;
  }
}

async function server(req) {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const method = req.method;

  // If a static file it gets served
  const staticFile = await serveStaticFiles(req, pathname);
  if (staticFile != null) {
    return staticFile;
  }
  // Routes the request with pathname and method
  for (const r of compile) {
    if (r.method !== method) continue;

    const matches = r.pattern.exec({ pathname: pathname });
    if (!matches) continue;
    const params = matches.pathname.groups ?? {};

    return await r.handler({ req, url, params });
  }
  return json({ error: `${pathname} was not found` });
}

function safeServer(req) {
  try {
    return server(req);
  } // makes sure errors never leak
  catch (err) {
    console.log(err);
    return json({ error: err }, { status: 400 });
  }
}

// Starts server
Deno.serve({ port: 8000 }, safeServer);
