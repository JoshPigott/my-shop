import { dbGetListings } from "../database/listings.js";

// Gets the formated querry meassage
function getQuerryMeassage(conditions, order) {
  let querryMeassage = `SELECT * FROM listings`;
  if (conditions.length > 0) {
    querryMeassage = querryMeassage + ` WHERE ` + conditions.join(` AND `);
  }
  if (order.length > 0) {
    querryMeassage = querryMeassage + ` ORDER BY ` + order.join(` AND `);
  }
  querryMeassage = querryMeassage + ` LIMIT 14`;
  return querryMeassage;
}

// Builds a safe query from allowed filters and returns matching listings
export function getListingsService(filters) {
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
    } // Filter with WHERE
    else {
      if (filtersAllowed.includes(key)) {
        conditions.push(`${key} = ?`);
        params.push(value);
      }
    }
  }

  const querryMeassage = getQuerryMeassage(conditions, order);

  const listings = dbGetListings(querryMeassage, params);
  return listings;
}
