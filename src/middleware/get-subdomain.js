// Returns which subdomain made the requests like admin
export function getSubdomain(req) {
  const host = req.headers.get("host") || "";
  const subdomain = host.split(".")[0];
  return subdomain;
}
