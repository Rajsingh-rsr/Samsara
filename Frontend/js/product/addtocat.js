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

    // Retrieve cart items from local storage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    console.log(cartItems)
    

    // Function to update total price
    function updateTotalPrice() {
        let subtotal = 0;
        cartItems.map((item) => {
            subtotal += parseInt(item.price);
            console.log(item.price)
            console.log(subtotal)
        });
        const tax = subtotal * 0.1; // Assuming 10% tax
        const total = subtotal + tax;

        // Update subtotal, tax, and total in the HTML
        document.querySelector('#subtotal').textContent = `Rs. ${subtotal}`;
        document.querySelector('#tax').textContent = `Rs. ${tax}`;
        document.querySelector('#total').textContent = `Rs. ${total}`;
        // store the total in local storage
        localStorage.setItem('totalAmount', total);
    }

    // Display cart items in the table
    const tbody = document.querySelector('tbody');
    cartItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="item-info">
                    <img src="${item.image}" alt="${item.name}" class="item-image">
                    ${item.name}
                </div>
            </td>
            <td>
                <div class="size-dropdown">
                    <select>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                </div>
            </td>
            <td>
                <div class="delete-box">
                    <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
                </div>
            </td>
            <td>Rs. ${item.price}</td>
        `;
        tbody.appendChild(row);
    });

    // Delete button event listener
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Get the index of the item to be deleted
            const rowIndex = this.closest('tr').rowIndex - 1;
            // Remove the item from the cart items array
            cartItems.splice(rowIndex, 1);
            // Update the local storage with the modified cart items
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            // Remove the row from the table
            const row = this.closest('tr');
            row.remove();
            // Recalculate and update the total price
            updateTotalPrice();
        });
    });

    // Initial update of total price
    updateTotalPrice();
});
const checkoutButton = document.querySelector('.btn button');
    checkoutButton.addEventListener('click', () => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cartItems.length === 0) {
            // If there are no items in the cart, display a pop-up message
            alert('Sorry, there are no items to proceed to checkout.');
        } else {
            // If there are items in the cart, navigate to the place order page
            window.location.href = '../../html/product/placeorder.html';
        }
    });
updateCartCount()
  // Update cart count display
  // Update cart count display
function updateCartCount() {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartCount = document.querySelector('.cart-count');
  // Calculate the total number of products in the cart
  const totalCount = cartItems.length;
  // Update the cart counter text
  cartCount.textContent = totalCount;
}
