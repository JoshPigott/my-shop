1. So when you go to the stite there will need to be a request for all the
   content. There will need to be somthing that gets evrything from the database
   and return the html. I am going to render the page from the backend with
   templates. (get-items)

2. Next the user can click on items. Then with a <a> tag and hfer it will send a
   request to the server. I should have the itemId part of the url param. From
   there I will return a html page. (I will just need to make a handler and data
   base function which lets get the data of a know item)

3. Then when the page get load there should be somthing at check if stuff is in
   stock or not. This will hidden verus show button depening on the request. (I
   don't feel this is the most imporant thing at the start later on).

4. Then the user can press add to cart (there will be a qunatity button beside).
   Then the item will get added to the cart. So I will need to update database
   of the cart. I think I will not need to update the page as I will get
   rendered every time the cart opens up. (I need to make a handler which adds a
   item to the cart with size and quaninity, ect)

5. Then on the cart thing the user will to press buy. This will remove the items
   from the database. It will also clear the cart. (I will need to make a
   handler which gets all the items in the cart and price so it can sent away to
   make html) (Somthing to clear cart and total and it will return html from
   htmx)

## Pages

- index (this is the shop home page)
- product/itemId (show the item)
- cart (showing the cart)

## Plan

- get all of this backend part working so like talking to the database right.
- And just write will return html or using htmx here just to help under that
  stuff return later on.
- Then go though a flow of the backend use postman.

## Notes

- I will need to clear their cart once their session runs out
- When you reload the stite after session time out it does not make a new
  session
- Will need to put in their cart items id in the delete button in the cart
