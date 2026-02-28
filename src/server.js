import { join } from "pathModule";
import { serveFile } from "serveFileModule";

import json from "./utils/json.js";
import dbNewTables from "./database/schema.js";

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
  const filepath = join(currworkingDir, "/src/public", pathname);

  // returns a default of index.html
  if (pathname === "/") {
    return await serveFile(req, join(currworkingDir, "src/public/index.html"));
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
  console.log(`${pathname} was not found`);
  return json({ error: `Not found` }, { status: 404 });
}

function safeServer(req) {
  try {
    return server(req);
  } // makes sure errors never leak
  catch (err) {
    console.log(err);
    return json({ error: "Somthing went wrong" }, { status: 500 });
  }
}

// Starts server
Deno.serve({ port: 8000 }, safeServer);
