import { join } from "@std/path";
import { serveFile } from "@std/http/file-server";

// Checks if the file exists or not
async function isFile(filepath) {
  try {
    const fileInfo = await Deno.stat(filepath);
    return fileInfo.isFile;
  } catch (_err) {
    return false;
  }
}

export async function serveStaticFiles(req, pathname, subdomain) {
  const currworkingDir = Deno.cwd();
  const filepath = join(currworkingDir, "/src/public", pathname);

  // returns a default depending on subdomain (admin subdomain is server side rendered)
  if (pathname === "/" && subdomain !== "admin") {
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
