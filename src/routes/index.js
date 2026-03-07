// deno-fmt-ignore-file

import newSession from "../handlers/new-session.js";
import { createListing, getListings, listingPage, buy }from "../handlers/listings.js";
import { addToWatchList, getWatchList, removeFromWatchList } from "../handlers/watch-list.js";
import { isValidPassword, newAccount } from "../handlers/account.js";
import { getAdminPage } from "../handlers/admin.js";

import { isLogin } from "../middleware/protect-routes.js"

// Routes possible on admin subdomain 
const routingTableAdmin = [  
  {method: "GET",    path: "/",                              handler: getAdminPage},
  {method: "POST",   path: "/create-session",                handler: newSession}, 
  {method: "POST",   path: "/login",                         handler: isValidPassword},
  {method: "POST",   path: "/new-account",                   handler: newAccount},
  {method: "POST",   path: "/create-listing",                handler: isLogin(createListing)},
  // Maybe I add a remove listing thing here in the future
  // {method: "GET",    path: "/get-listings",                  handler: isLogin(getListings)}, 
  // {method: "GET",    path: "/get-listing-page/:listingId",   handler: isLogin(listingPage)},
  // {method: "GET",    path: "/buy/:listingId",                handler: isLogin(buy)}, 
];

// Public routes
const routingTablePublic = [  
  {method: "POST",   path: "/create-session",                handler: newSession},
  {method: "GET",    path: "/get-listings",                  handler: getListings},
  {method: "GET",    path: "/get-listing-page/:listingId",   handler: listingPage},
  {method: "GET",    path: "/buy/:listingId",                handler: buy},
  {method: "POST",   path: "/watch-list-add/:listingId",     handler: addToWatchList},
  {method: "GET",    path: "/watch-list-get",                handler: getWatchList},
  {method: "DELETE", path: "/watch-list-delete/:listingId",  handler: removeFromWatchList}, 
];

// Caches the tables for speed and cleaness
const compiledTableAdmin = routingTableAdmin.map((r) => ({
    method: r.method.toUpperCase(),
    pattern: new URLPattern({ pathname: r.path }),
    handler: r.handler,
  }));

const compiledTablePublic = routingTablePublic.map((r) => ({
    method: r.method.toUpperCase(),
    pattern: new URLPattern({ pathname: r.path }),
    handler: r.handler,
  }));

// Gets compiled table 
export function getCompiledTable(subdomain){
  if (subdomain === "admin"){
    return compiledTableAdmin;
  }
  else{
    return compiledTablePublic;
  }
}