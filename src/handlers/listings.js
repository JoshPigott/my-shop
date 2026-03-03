import {
  dbAddListing,
  dbBuy,
  dbGetListing,
  dbGetListings,
} from "../database/listings.js";
import listingsTemplate from "../views/listings-template.js";
import listingPageTemplate from "../views/listings-page-template.js";
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

  console.log("The listing is:", id);

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
  const conditions = [];
  const order = [];
  const params = [];

  for (const [key, value] of filters.entries()) { // This is not going to work Object.entries(filters)
    // filter with ORDER
    if (key === "price_order") {
      console.log(value);
      order.push(`price ${value}`);
    } // filter with WHERE
    else {
      conditions.push(`${key} = ?`);
      params.push(value);
    }
  }

  const querryMeassage = getQuerryMeassage(conditions, order);

  const listings = dbGetListings(querryMeassage, params);
  const html = listingsTemplate(listings);
  // I will return so format html here later on
  return htmlResponse(html, { status: 200 });
}

export function listingPage(ctx) {
  const listingId = ctx.params.listingId;
  console.log(listingId);
  const listing = dbGetListing(listingId);
  const html = listingPageTemplate(listing);
  return htmlResponse(html, { status: 200 });
}

// Buys the house
export function buy(ctx) {
  const listingId = ctx.params.listingId;
  // Updated to state if you brought the house or not to void race condation
  const updated = dbBuy(listingId);
  console.log(updated);
  console.log(typeof updated);
  if (updated === 1) {
    return new Response("Transaction was successful", { status: 200 }); // Later on this will be htmx
  } else {
    console.log("Unable to buy house");
    return new Response("Unable to buy house", { status: 409 }); // Later on this will be htmx
  }
}
