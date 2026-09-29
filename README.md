## Reflection Questions
1. How did you dynamically create and append new elements to the DOM? 
  I used document.createElement() to build each part of a cart item, assembled them with appendChild(), and    appended the finished < li > to the #cart list.
2. What steps did you take to ensure accurate updates to the total price?
  Instead of incremental math, I wrote a single recalcTotalFromCart() function that loops through all .cart-   item elements and sums price × quantity every time the cart changes.
3. How did you handle invalid input for product name or price?
  I added guard clauses at the top of handleAddProduct() that check for empty names, empty prices, and non-    numeric or negative prices, then alert the user and refocus the field that needs to be changed.
4. What challenges did you face when implementing the remove functionality?
  The main challenge was ensuring the total stayed accurate when quantities were involved, which I solved by   removing the item and calling recalcTotalFromCart() instead of subtracting a fixed price.
