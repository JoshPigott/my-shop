import { dbAddListing, dbIsUniqueName } from "../database/listings.js";

// Avoids file traversal
function sanitizeFileName(fileName) {
  return fileName
    .replace(/[^a-zA-Z0-9.\-_]/g, "_")
    .replace(/\.+/g, ".");
}

// Checks if valid image (for security)
function validImage(image, bytes) {
  // ~ 5 MB  max image size
  const maxFileSize = 5 * 1024 * 1024;

  if (!(image instanceof File)) {
    return false;
  } // Makes stite does not crash if file is too big
  else if (image.size > maxFileSize) {
    return false;
  } else if (image.type !== "image/jpeg") {
    return false;
  } // Check if bytes look a jpg file
  else if (bytes[0] !== 0xFF || bytes[1] !== 0xD8 || bytes[2] !== 0xFF) {
    return false;
  }
  return true;
}

// If image is valid adds image file and creates a new listing in the database
export async function createListingService(listing, image) {
  const fileStoragePath = "./src/public/assets/listings-pics";
  const buffer = await image.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  // The Date.now() is used to avoid duplicate image file names
  listing.imageFileName = `${sanitizeFileName(listing.name)}-${Date.now()}`;

  if (!dbIsUniqueName(listing.name)) {
    return false;
  }
  if (!validImage(image, bytes)) return false;

  await Deno.writeFile(
    `${fileStoragePath}/${listing.imageFileName}.jpg`,
    bytes,
  );
  dbAddListing(listing);
  return true;
}
