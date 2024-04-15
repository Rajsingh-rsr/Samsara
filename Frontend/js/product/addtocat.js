document.addEventListener("DOMContentLoaded", () => {
    const searchIcon = document.querySelector('#search-icon');
    const searchForm = document.querySelector('#search-form');
    const closeButton = document.querySelector('#close');
  
    // Show search form when search icon is clicked
    searchIcon.addEventListener("click", () => {
      searchForm.classList.add('active');
    });
  
    // Hide search form when close button is clicked
    closeButton.addEventListener("click", () => {
      searchForm.classList.remove('active');
    });
  });
  // for deleting the table row when clicked
  const deleteButtons = document.querySelectorAll('.delete-btn');

// Loop through each delete button
deleteButtons.forEach(button => {
    // Add click event listener
    button.addEventListener('click', function() {
        // Get the parent row of the clicked button
        const row = this.closest('tr');
        // Remove the row from the table
        row.remove();
    });
});
// updating the cart
// JavaScript code

// Retrieve the cart items from local storage or initialize an empty array if not present
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to display the cart items in the table
function displayCartItems() {
    const cartTableBody = document.querySelector('#cart-table tbody');
    // Clear the table body before populating it with new items
    cartTableBody.innerHTML = '';

    // Iterate over the cart items and add them to the table
    cartItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price}</td>
        `;
        cartTableBody.appendChild(row);
    });
}

// Function to add an item to the cart
function addToCart(name, price) {
    // Add the item to the cartItems array
    cartItems.push({ name, price });
    // Update the cart in local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function to handle click events on the "Add to Cart" buttons
function handleAddToCartButtonClick(event) {
    if (event.target.classList.contains('add-to-cart-btn')) {
        // Retrieve the name and price of the product from the data attributes
        const name = event.target.dataset.name;
        const price = event.target.dataset.price;
        // Add the item to the cart
        addToCart(name, price);
        // Display the updated cart items
        displayCartItems();
    }
}

// Add event listener to the document to handle click events on "Add to Cart" buttons
document.addEventListener('click', handleAddToCartButtonClick);

// Display the cart items when the page loads
displayCartItems();
