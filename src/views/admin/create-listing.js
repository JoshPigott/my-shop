export function createListingView() {
  return /*html*/ `
  <div class="create-listing">
  <form class="create-listing__form" hx-post="/create-listing" hx-target=".create-listing__message" enctype="multipart/form-data">
    <label for="name">Name</label>
    <input
     type="text"
     id="name"
     name="name"
     maxlength="20"
     required>

    <label for="address">Address</label>
    <input
     type="text"
     id="address"
     name="address"
     maxlength="35"
     >

    <label for="area">Area</label>
    <input
     type="text"
     id="area"
     name="area"
     maxlength="35"
     >

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
     required
    ></textarea>

    <label for="image">Image</label>
    <input 
     type="file"
     accept="image/jpeg"
     id="image"
     name="image" 
    >

    <button type="submit">Add listing</button>
    <h3 class="create-listing__message"></h3>
  </form>
  </div>
  `;
}
