import listingView from "../listing.js";

function listingsView(listings) {
  if (listings.length === 0) return "";

  const html = listings.map((listing) =>
    /*html*/ ` 
    <a href="/get-listing-page/${listing.id}">
      ${listingView(listing)}
    </a>  
    `
  ).join("");
  return html;
}

export default listingsView;
