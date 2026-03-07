// importing middleware
import { serveStaticFiles } from "./middleware/server-static-files.js";
import { getSubdomain } from "./middleware/get-subdomain.js";

import { getCompiledTable } from "./routes/index.js";
import dbNewTables from "./database/schema.js";
import { deleteExpiredSessions } from "./services/sessions.js";
import json from "./utils/json.js";

// sets up tables for database
dbNewTables();
deleteExpiredSessions();

// function

async function server(req) {
  const subdomain = getSubdomain(req);
  const url = new URL(req.url);
  const pathname = url.pathname;
  const method = req.method;
  console.log(`There has been a request from ${pathname}`);

  // If a static file it gets served
  const staticFile = await serveStaticFiles(req, pathname, subdomain);
  if (staticFile != null) {
    return staticFile;
  }

  // Routes the request with pathname and method and subdomian
  const compiledTable = getCompiledTable(subdomain);
  for (const r of compiledTable) {
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
