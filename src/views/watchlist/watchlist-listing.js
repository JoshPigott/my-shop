import { listingFullView } from "../listing.js";

// Renders watchlist listings with a button to remove listings
function watchlistListingView(listings) {
  const html = listings.map((listing) =>
    /*html*/ ` 
    <a class="watchlist__listing" href="/get-listing-page/${listing.id}">
      ${listingFullView(listing)}
      <!--When the button is pressed, the listing is delete from the watchlist.
          Because hx-swap="delete" is used, the returned HTML is ignored.-->
      <button hx-delete="/watch-list-delete/${listing.id}"
       hx-target="closest a" hx-swap="delete">Remove From Watch List</button>
    `
  ).join("");
  return html;
}
export default watchlistListingView;
