import inStock from "../utils/in-stock.js";
import {
  dbAddItem,
  dbClearCart,
  dbDeleteItem,
  dbGetCart,
} from "../database/cart.js";
import { dbGetItem } from "../database/items.js";
import { dbRemoveStock } from "../database/stock.js";
import { getSession } from "../services/sessions.js";

// Checks if all stock is still available to buy
function isAvailable(cartItems) {
  for (const cartItem of cartItems) {
    if (!inStock(cartItem.itemId, cartItem.quantity, cartItem.size)) {
      return false;
    }
  }
  return true;
}

// Buys all the items in your cart if available
export function buy(ctx) {
  const sessionId = getSession(ctx.req);
  const cartItems = dbGetCart(sessionId);
  // Checks if all items are in stocks or not
  if (isAvailable(cartItems) === false) {
    return new Response("Stock not available", { status: 409 }); // Later on this will be htmx
  }

  // Remove stock
  for (const cartItem of cartItems) {
    dbRemoveStock(cartItem.itemId, cartItem.quantity, cartItem.size);
  }
  dbClearCart(sessionId);
  return new Response("Transaction was successful", { status: 200 }); // Later on this will be htmx
}

// Adds item to the cart
export async function addToCart(ctx) {
  const body = await ctx.req.json();

  const item = dbGetItem(body.itemId);
  const sessionId = getSession(ctx.req);

  // Tracks item in the cart
  const id = crypto.randomUUID();
  dbAddItem(
    sessionId,
    id,
    item.id,
    item.name,
    body.size,
    body.quantity,
    item.price,
  );
  return new Response("Item add to cart", { status: 201 }); // I will need to return some htmx later on here
}

// Return the html need to display the cart
export function getCart(ctx) {
  const sessionId = getSession(ctx.req);
  const cartItems = dbGetCart(sessionId);
  // I am going to have some htmx here
  console.log("cartItems:", cartItems);
  return new Response("Here is your cart!", { status: 200 });
}

// Deletes cart item
export async function removeFromCart(ctx) {
  const body = await ctx.req.json();
  const sessionId = getSession(ctx.req);

  dbDeleteItem(sessionId, body.id);
  return new Response({ status: 204 });
}
