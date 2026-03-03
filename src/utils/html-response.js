// Sets the content-type to be text/html
function htmlResponse(data, init) {
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "text/html; charset=UTF-8");
  return new Response(data, { ...init, headers });
}
export default htmlResponse;
