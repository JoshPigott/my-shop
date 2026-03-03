import listingTemplate from "./listing-template.js";

function listingPageTemplate(listing) {
  return /*html*/ `
      <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>My Shop</title>
      <script src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.8/dist/htmx.min.js" integrity="sha384-/TgkGk7p307TH7EXJDuUlgG3Ce1UVolAOFopFekQkkXihi5u/6OCvVKyz1W+idaz" crossorigin="anonymous"></script>
    </head>
    <body>
      <a href="/index.html">Back</a>
      <div>This is an listing</div>
      ${listingTemplate(listing)}
      <button hx-post="/watch-list-listing-add" hx-swap="outerHTML">Add To Watch List</button>
      <script src="/setup-session.js" type="module"></script>
    </body>
  </html>

    `;
}
export default listingPageTemplate;
