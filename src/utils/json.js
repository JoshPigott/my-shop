// Sets the content-type to be application/json
function json(data, init) {
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json; charset=UTF-8");
  return new Response(JSON.stringify(data), { ...init, headers });
}
export default json;
