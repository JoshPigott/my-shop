import listingTemplate from "./listing-template.js";

function listingsTemplate(listings) {
  if (listings.length === 0) return "";

  const html = listings.map((listing) =>
    /*html*/ ` 
    <a href="/get-listing-page/${listing.id}">
      ${listingTemplate(listing)}
    </a>  
    `
  ).join("");
  return html;
}

export default listingsTemplate;
