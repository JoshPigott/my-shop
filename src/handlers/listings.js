import {
  dbAddListing,
  dbBuy,
  dbDeleteListing,
  dbGetListing,
} from "../database/listings.js";
import {
  dbDeleteListingsById,
  dbIsInWatchlist,
} from "../database/watchlist.js";
import listingsView from "../views/home/listings.js";
import listingPageView from "../views/listings/listings-page.js";
import { getListingsService } from "../services/get-listings.js";
import { getSession } from "../services/sessions.js";
import htmlResponse from "../utils/html-response.js";

// Creates an listing adding it to the database
export async function createListing(ctx) {
  const formData = await ctx.req.formData();

  // listing info
  const id = crypto.randomUUID();
  const name = formData?.get("name") ?? "";
  const address = formData?.get("address") ?? "";
  const area = formData?.get("area") ?? "";
  const description = formData?.get("description") ?? "";
  const price = formData?.get("price") ?? "By negation";
  const rating = formData?.get("rating") ?? "unable";
  const category = formData?.get("category");
  const image = formData?.get("image");

  const listing = {
    id,
    name,
    address,
    area,
    description,
    price,
    rating,
    category,
    image,
  };
  try {
    dbAddListing(listing);
    return htmlResponse(`Listing Added`, { status: 201 });
  } catch (_err) {
    return htmlResponse(
      `Failed to Add Listing (Make sure listing Name is unique)`,
      { status: 200 },
    );
  }
}

// Gets specific listings in the database with their data
export function getListings(ctx) {
  const filters = new URLSearchParams(ctx.url.searchParams);
  const listings = getListingsService(filters);

  const html = listingsView(listings);
  // I will return so format html here later on
  return htmlResponse(html, { status: 200 });
}

// Gets the page for an individual listing
export function getListingPage(ctx) {
  const listingId = ctx.params.listingId;
  const sessionId = getSession(ctx.req);

  const inWatchlist = dbIsInWatchlist(sessionId, listingId);
  const listing = dbGetListing(listingId);

  const html = listingPageView(listing, inWatchlist);
  return htmlResponse(html, { status: 200 });
}

// Buys the house
export function buy(ctx) {
  const listingId = ctx.params.listingId;
  // Updated to state if you brought the house or not to void race condation
  const updated = dbBuy(listingId);
  if (updated === 1) {
    return new Response("Transaction was successful", { status: 200 }); // Later on this will be htmx
  } else {
    console.log("Unable to buy the house");
    return new Response("Unable to buy house", { status: 409 }); // Later on this will be htmx
  }
}

export function deleteListings(ctx) {
  const listingId = ctx.params.listingId;
  dbDeleteListing(listingId);
  // Deletes all listings in the watchlist so errors don't happen when rendering
  dbDeleteListingsById(listingId);
  const html = /*html*/ `<div>Listing was deleted</div>`;
  return htmlResponse(html, { status: 200 });
}
