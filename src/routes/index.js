// deno-fmt-ignore-file

import newSession from "../handlers/new-session.js";
import { createListing, getListings, listingPage, buy }from "../handlers/listings.js";
import { addToWatchList, getWatchList, removeFromWatchList } from "../handlers/watch-list.js"

// Some of these routes will need to be protected later on
const routingTable = [  
  {method: "POST",   path: "/create-session",                handler: newSession},
  {method: "POST",   path: "/create-listing",                handler: createListing},
  {method: "GET",    path: "/get-listings",                  handler: getListings},
  {method: "GET",    path: "/get-listing-page/:listingId",   handler: listingPage},
  {method: "GET",    path: "/buy/:listingId",                handler: buy},
  {method: "POST",   path: "/watch-list-add/:listingId",     handler: addToWatchList},
  {method: "GET",    path: "/watch-list-get",                handler: getWatchList},
  {method: "DELETE", path: "/watch-list-delete/:listingId",  handler: removeFromWatchList}, 
];


// Caches the table for speed and cleaness
const compile = routingTable.map((r) => ({
  method: r.method.toUpperCase(),
  pattern: new URLPattern({ pathname: r.path }),
  handler: r.handler,
}));

export default compile;
