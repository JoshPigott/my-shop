import listingView from "../listing.js";

function watchlistListingView(listings) {
  const html = listings.map((listing) =>
    /*html*/ ` 
    <a href="/get-listing-page/${listing.id}">
      ${listingView(listing)}
    </a>  
    `
  ).join("");
  return html;
}

export default watchlistListingView;
