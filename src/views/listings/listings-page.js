import { listingFullView } from "../listing.js";

function listingPageView(listing, inWatchlist) {
  return /*html*/ `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Crown Point Estates</title>
      <script src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.8/dist/htmx.min.js" integrity="sha384-/TgkGk7p307TH7EXJDuUlgG3Ce1UVolAOFopFekQkkXihi5u/6OCvVKyz1W+idaz" crossorigin="anonymous"></script>
      <link rel="stylesheet" href="/style.css">
      <link rel="icon" href="assets/favicon.png">
    </head>
    <body>
      <header>
        <h1>Crown Point Estates</h1>
        <a href="/index.html" class="header__link">Home</a>
        <a href="watchlist.html" class="header__link">Watch list</a>
      </header>
      <main>
        <div>This is an listing</div>
        ${listingFullView(listing)}
        ${
    inWatchlist ? removeButtonView(listing?.id) : addButtonView(listing?.id)
  }
      </main>
      <footer>
      <div class="footer__description">
        <h2 class="footer__description">Crown Point Estates</h2>
        <p>
          At Crown Point Estates, we specialize in luxury properties and provide
          unmatched service with meticulous attention to detail.
        </p>
      </div>
      <div class="footer__email">
        <p>For any question or querrys email</p>
        <a class="footer__link" href="mailto:crownpointestates@gmail.com"
        >crownpointestates@gmail.com</a>
      </div>
    </footer>
      <script src="/setup-session.js" type="module"></script>
    </body>
  </html>

    `;
}
// Adds listing to watchlist
export function addButtonView(listingId) {
  return /*html*/ `<button hx-post="/watch-list-add/${listingId}" hx-swap="outerHTML">Add To Watch List</button>`;
}

// Removes listing from watchlist
export function removeButtonView(listingId) {
  return /*html*/ `<button hx-delete="/watch-list-delete/${listingId}" hx-swap="outerHTML">Remove From Watch List</button>`;
}

export default listingPageView;
