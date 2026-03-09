import listingView from "../listing.js";

function watchlistListingView(listings) {
  const html = listings.map((listing) =>
    /*html*/ ` 
    <a class="watchlist__listing" href="/get-listing-page/${listing.id}">
      ${listingView(listing)}
      <!--When button is pressed the listing is in the watch list
      due to the hx-swap="delete" so the return html is ignored-->
      <button hx-delete="/watch-list-delete/${listing.id}"
       hx-target="closest a" hx-swap="delete">Remove From Watch List</button>
    </a>  
    `
  ).join("");
  return html;
}
export default watchlistListingView;
