import {
  dbAddListing,
  dbBuy,
  dbGetListing,
  dbGetListings,
} from "../database/listings.js";
import { dbIsInWatchlist } from "../database/watchlist.js";
import listingsView from "../views/listings/listings.js";
import listingPageView from "../views/listings/listings-page.js";
import { getSession } from "../services/sessions.js";
import htmlResponse from "../utils/html-response.js";

// Creates an listing adding it to the database
export async function createListing(ctx) {
  const body = await ctx.req.json();
  // listing info
  const id = crypto.randomUUID();
  const name = body.name;
  const description = body.description;
  const price = body.price;
  const rating = body.rating;
  const category = body.category;
  const image = body.image;

  const listing = { id, name, description, price, rating, category, image };
  dbAddListing(listing);

  return new Response({ status: 201 });
}

// Gets querry meassage
function getQuerryMeassage(conditions, order) {
  let querryMeassage = `SELECT * FROM listings`;
  if (conditions.length > 0) {
    querryMeassage = querryMeassage + ` WHERE ` + conditions.join(` AND `);
  }
  if (order.length > 0) {
    querryMeassage = querryMeassage + ` ORDER BY ` + order.join(` AND `);
  }
  querryMeassage = querryMeassage + ` LIMIT 2`;
  return querryMeassage;
}

// Gets specific listings in the database with their data
export function getListings(ctx) {
  const filters = new URLSearchParams(ctx.url.searchParams);
  // Whitelist filters so it prevents any input from being enter in (security)
  const filtersAllowed = ["rating", "category", "status"];
  const conditions = [];
  const order = [];
  const params = [];

  for (const [key, value] of filters.entries()) { // This is not going to work Object.entries(filters)
    // filter with ORDER
    if (key === "price_order") {
      // Prevents any input from being enter in (security)
      if (value === "ASC" || value === "DESC") {
        order.push(`price ${value}`);
      }
    } // filter with WHERE
    else {
      if (filtersAllowed.includes(key)) {
        conditions.push(`${key} = ?`);
        params.push(value);
      }
    }
  }

  const querryMeassage = getQuerryMeassage(conditions, order);

  const listings = dbGetListings(querryMeassage, params);
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
