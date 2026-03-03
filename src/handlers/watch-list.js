import {
  dbAddWatchList,
  dbDeleteWatchList,
  dbGetWatchList,
} from "../database/watch-list.js";
import { dbGetListing, dbGetListings } from "../database/listings.js";
import { getSession } from "../services/sessions.js";

// Adds listing to the watch list
export function addToWatchList(ctx) {
  const listingId = ctx.params.listingId;
  console.log(listingId);

  console.log("all Listings:", dbGetListings(`SELECT * FROM listings`));
  const listing = dbGetListing(listingId);
  const sessionId = getSession(ctx.req);

  // Tracks listing in the watch list
  const id = crypto.randomUUID();
  dbAddWatchList(
    sessionId,
    id,
    listing.id,
    listing.name,
    listing.price,
  );
  return new Response("Listing add to watch list", { status: 201 }); // I will need to return some htmx later on here
}

// Return the html need to display the watch list
export function getWatchList(ctx) {
  const sessionId = getSession(ctx.req);
  const watchList = dbGetWatchList(sessionId);
  // I am going to have some htmx here
  console.log("watchList:", watchList);
  return new Response("Here is your watch list!", { status: 200 });
}

// Deletes watch list listing
export function removeFromWatchList(ctx) {
  const listingId = ctx.params.listingId;
  const sessionId = getSession(ctx.req);

  dbDeleteWatchList(sessionId, listingId);
  return new Response({ status: 204 });
}
