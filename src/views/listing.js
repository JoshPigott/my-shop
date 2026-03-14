export function listingFullView(listing) {
  const html = /*html*/ `
    <h1>${listing?.name}</h1>
    <h2>${listing?.address}</h2>
    <h2>${listing?.area}</h2>
    <h3>${listing?.description}</h3>
    <img src="/assets/listings-pics/${listing?.imageFileName}.jpg" alt="${listing?.name} image">
    <h3>Price: $${listing?.price}</h3>
    <h3>Rating: ${listing?.rating}/10</h3>
  `;

  return html;
}
// A more conise listing
export function listingView(listing) {
  const html = /*html*/ `
    <a href="/get-listing-page/${listing.id}">
      <img class=listing-preview__image src="/assets/listings-pics/${listing?.imageFileName}.jpg" alt="${listing?.name} image">
    </a>  
    <div class="listing-preview__text">
      <h2>${listing?.name}</h2>
      <p>${listing.address}</p>
      <p>${listing.area}</p>
    </div>
  `;

  return html;
}
