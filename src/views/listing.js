import { escapeHtml } from "../utils/escape-html.js";

// Returns a detail version of the listing
export function listingFullView(listing) {
  const html = /*html*/ `
    <h1>${escapeHtml(listing?.name)}</h1>
    <h2>${escapeHtml(listing?.address)}</h2>
    <h2>${escapeHtml(listing?.area)}</h2>
    <h3>${escapeHtml(listing?.description)}</h3>
    <img src="/assets/listings-pics/${
    escapeHtml(listing?.imageFileName)
  }.jpg" alt="${escapeHtml(listing?.name)} image">
    <h3>Price: $${escapeHtml(listing?.price)}</h3>
    <h3>Rating: ${escapeHtml(listing?.rating)}/10</h3>
  `;

  return html;
}
// A more conise listing
export function listingView(listing) {
  const html = /*html*/ `
    <a href="/get-listing-page/${listing.id}">
      <img class=listing-preview__image src="/assets/listings-pics/${
    escapeHtml(listing?.imageFileName)
  }.jpg" alt="${escapeHtml(listing?.name)} image">
    </a>  
    <div class="listing-preview__text">
      <h2>${escapeHtml(listing?.name)}</h2>
      <p>${escapeHtml(listing.address)}</p>
      <p>${escapeHtml(listing.area)}</p>
    </div>
  `;

  return html;
}
