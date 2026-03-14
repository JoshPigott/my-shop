import { listingView } from "../listing.js";

// Wraps each listing in a div element for easier CSS styling
function listingsView(listings) {
  if (listings.length === 0) return "";

  const html = listings.map((listing) =>
    /*html*/ ` 
    <div class="listing-preview">
      ${listingView(listing)}
    </div>  
    `
  ).join("");
  return html;
}

export default listingsView;
