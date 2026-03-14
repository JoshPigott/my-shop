import db from "./connection.js";

// Adds an listing to the database
export function dbAddListing(listing) {
  db.prepare(
    `INSERT INTO listings (id, name, address, area, description, price,
     rating, status, category, imageFileName) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    listing.id,
    listing.name,
    listing.address,
    listing.area,
    listing.description,
    listing.price,
    listing.rating,
    "available",
    listing.category,
    listing.imageFileName,
  );
}

// Returns if listing name is unique or not
export function dbIsUniqueName(listingName) {
  const listings = db.prepare(`SELECT * FROM listings WHERE name=?`).all(
    listingName,
  );
  if (listings.length === 0) {
    return true;
  }
  return false;
}

// Gets all the listings with all the data of each listing with filter applied
export function dbGetListings(querryMeassage, params) {
  const listings = db.prepare(querryMeassage).all(params);
  return listings;
}

// Returns all listings with no filters appiled
export function dbGetAllListings() {
  return db.prepare(`SELECT * FROM listings`).all();
}

// Get a specific listing data
export function dbGetListing(listingId) {
  const listing = db.prepare(`SELECT * FROM listings WHERE id=?`).get(
    listingId,
  );
  return listing;
}

export function dbDeleteListing(listingId) {
  db.prepare(`DELETE FROM listings WHERE id=?`).run(listingId);
}
