export function createListing() {
  return /*html*/ `
  <div class="create-listing">
  <form class="create-listing__form" hx-post="/create-listing" hx-target=".create-listing__message">
    <label for="name">Name</label>
    <input
     type="text"
     id="name"
     name="name"
     maxlength="20"
     required>
    
    <label for="price">Price</label>
    <input
     type="number"
     id="price"
     name="price"
     required
     min="0">

    <label for="rating">Rating</label>
    <input
     type="number"
     id="rating"
     name="rating"
     required
     min="0"
     max="10">

    <label for="category">Category</label>
      <select name="category" id="category">
        <option value="small">small</option>
        <option value="medium">medium</option>
        <option value="large">large</option>
      </select>
    
    <label for="description">Description</label>
    <textarea
     type="text"
     id="description"
     name="description"
     required>
    </textarea>
    
    <!-- Later on I will need to be able to accept an image here -->

    <button type="submit">Add listing</button>
    <h3 class="create-listing__message"></h3>
  </form>
  </div>
  `;
}
