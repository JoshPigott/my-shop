import db from "./connection.js";

// Adds an listing to the database
export function dbAddListing(listing) {
  db.prepare(
    "INSERT INTO listings (id, name, description, price, rating, status, category, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
  ).run([
    listing.id,
    listing.name,
    listing.description,
    listing.price,
    listing.rating,
    "available",
    listing.category,
    listing.image,
  ]);
}

// Gets all the listings with all the data of each listing
export function dbGetListings(querryMeassage, params) {
  const listings = db.prepare(querryMeassage).all(params);
  console.log(listings);
  return listings;
}

// Get a specific listing data
export function dbGetListing(listingId) {
  const listing = db.prepare(`SELECT * FROM listings WHERE id=?`).get([
    listingId,
  ]);
  return listing;
}

// Upates status to sold
export function dbBuy(listingId) {
  const updated = db.prepare(
    `UPDATE listings SET status = 'sold' WHERE id = ? AND status = 'available' RETURNING *`,
  ).run([listingId]);
  return updated;
}
