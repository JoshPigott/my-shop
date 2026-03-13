// Here I will make a area which allows me to delete listings
// I will just need to loop over listing
export function deleteListingsView(listings) {
  return listings.map((listing) =>
    /*html*/ ` 
    <div>
      <p>${listing.name}</p>
      <button hx-delete="/delte-listing/${listing.id}" hx-swap="delete" hx-target="closest div">Delete listing</button>
    </div>
    `
  ).join("");
}
