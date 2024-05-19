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

    // Function to update cart count display
    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        const totalCount = cartItems.length; // Count only unique items
        cartCount.textContent = totalCount;
    }

    // Function to update total price
    function updateTotalPrice() {
        let subtotal = 0;
        cartItems.forEach((item) => {
            subtotal += parseInt(item.price) * item.quantity;
        });
        const tax = subtotal * 0.1; // Assuming 10% tax
        const total = subtotal + tax;

        // Update subtotal, tax, and total in the HTML
        document.querySelector('#subtotal').textContent = `Rs. ${subtotal}`;
        document.querySelector('#tax').textContent = `Rs. ${tax}`;
        document.querySelector('#total').textContent = `Rs. ${total}`;
        // Store the total in local storage
        localStorage.setItem('totalAmount', total);
    }

    // Function to update cart item in local storage
    function updateCartItemInLocalStorage(index, newQuantity) {
        cartItems[index].quantity = newQuantity;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateTotalPrice();
    }

    // Display cart items in the table
    const tbody = document.querySelector('tbody');
    cartItems.forEach((item, index) => {
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
                <div class="quantity-control">
                    <button class="decrease-btn"><i class="fas fa-minus"></i></button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase-btn"><i class="fas fa-plus"></i></button>
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

        // Event listener for decrease button
        const decreaseButton = row.querySelector('.decrease-btn');
        decreaseButton.addEventListener('click', () => {
            let quantity = parseInt(row.querySelector('.quantity').textContent);
            if (quantity > 1) {
                quantity--;
                row.querySelector('.quantity').textContent = quantity;
                updateCartItemInLocalStorage(index, quantity);
            }
        });

        // Event listener for increase button
        const increaseButton = row.querySelector('.increase-btn');
        increaseButton.addEventListener('click', () => {
            let quantity = parseInt(row.querySelector('.quantity').textContent);
            quantity++;
            row.querySelector('.quantity').textContent = quantity;
            updateCartItemInLocalStorage(index, quantity);
        });

        // Event listener for delete button
        const deleteButton = row.querySelector('.delete-btn');
        deleteButton.addEventListener('click', () => {
            cartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            row.remove();
            updateTotalPrice();
            updateCartCount();
        });
    });

    // Initial update of total price and cart count
    updateTotalPrice();
    updateCartCount();

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
});
