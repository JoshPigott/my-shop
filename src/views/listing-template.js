function listingTemplate(listing) {
  const html = /*html*/ `
    <h1>${listing.name}</h1>
    <h3>${listing.description}</h3>
    <img src="/assets/listings-pics/${listing.image}.jpg" alt="${listing.name} image">
    <h3>Price: $${listing.price}</h3>
    <h3>Rating: ${listing.rating}/10</h3>
  `;

  return html;
}
export default listingTemplate;
