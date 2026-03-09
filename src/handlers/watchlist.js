import {
  dbAddToWatchlist,
  dbGetWatchlist,
  dbRemoveFromWatchlist,
} from "../database/watchlist.js";
import { dbGetListing } from "../database/listings.js";
import watchlistListingView from "../views/watchlist/watchlist-listing.js";
import {
  addButtonView,
  removeButtonView,
} from "../views/listings/listings-page.js";
import { getSession } from "../services/sessions.js";
import htmlResponse from "../utils/html-response.js";

// Adds listing to the watch list
export function addToWatchlist(ctx) {
  const listingId = ctx.params.listingId;

  const listing = dbGetListing(listingId);
  const sessionId = getSession(ctx.req);

  dbAddToWatchlist(
    sessionId,
    listing.id,
  );
  const html = removeButtonView(listing.id);
  return htmlResponse(html, { status: 201 });
}

// Return the html need to display the watch list
export function getWatchlist(ctx) {
  const sessionId = getSession(ctx.req);
  const watchlist = dbGetWatchlist(sessionId);
  const watchlistListings = watchlist.map((listing) => (
    dbGetListing(listing.listingId)
  ));
  const html = watchlistListingView(watchlistListings);
  return htmlResponse(html, { status: 200 });
}

// Deletes watch list listing
export function removeFromWatchlist(ctx) {
  const listingId = ctx.params.listingId;
  const sessionId = getSession(ctx.req);

  dbRemoveFromWatchlist(sessionId, listingId);
  const html = addButtonView(listingId);
  return htmlResponse(html, { status: 200 });
}
