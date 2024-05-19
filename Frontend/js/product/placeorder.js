document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('http://localhost:4000/api/v1/users/current-user', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
  
        if (response.ok) {
            const res = await response.json();
            const userData = res.data;
  
            console.log(userData);
  
            document.getElementById('address').value = userData.address;
            document.getElementById('email').value = userData.email;
            document.getElementById('phone').value = userData.phone;
        } else {
            console.error('Failed to fetch current user data');
        }
    } catch (error) {
        console.error('Error fetching current user data:', error);
    }
});

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

    // Update cart count
    updateCartCount();
});

// Update cart count display
function updateCartCount() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = document.querySelector('.cart-count');
    const totalCount = cartItems.length;
    cartCount.textContent = totalCount;
}

// Show the total price in the items total
document.addEventListener("DOMContentLoaded", () => {
    const totalAmount = parseInt(localStorage.getItem('totalAmount'));

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (cartItems.length === 0) {
        const orderSummary = document.querySelector('.order-summary');
        const message = document.createElement('p');
        message.textContent = 'Sorry, there are no items to be placed';
        message.style.color = 'red';
        message.style.padding = '40px';
        message.style.textAlign = 'center';
        orderSummary.appendChild(message);
        return;
    }

    const deliveryFee = 100; // Delivery fee is Rs 100

    document.querySelector('.right-details .totalitems span').textContent = `Rs. ${totalAmount}`;
    document.querySelector('.right-details .deliveryfee span').textContent = `Rs. ${deliveryFee}`;

    const totalPayment = totalAmount + deliveryFee;
    document.querySelector('.right-details .Totalpayment span').textContent = `Rs. ${totalPayment}`;
});

// Enable editing input fields when change button is clicked
document.addEventListener("DOMContentLoaded", () => {
    const changeButtons = document.querySelectorAll('.change-btn');
    changeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const inputField = document.getElementById(targetId);
            inputField.disabled = false;
            inputField.focus();
        });
    });
});

// Display order confirmation
document.addEventListener("DOMContentLoaded", () => {
    const placeOrderBtn = document.getElementById("place-order-btn");
    placeOrderBtn.addEventListener("click", () => {
        alert("Your order has been confirmed. Thank you!");
    });
});

// Populate product display
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Generate HTML for each product
function generateProductHTML(product) {
    return `
        <div class="product" id="${product.id}">
            <img src="${product.image}" alt="Product Image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>Quantity: ${product.quantity}</p>
                <button class="remove">Remove</button>
            </div>
        </div>
    `;
}

// Populate product display with cart items
function populateProductDisplay() {
    const productDisplay = document.getElementById('product-display');

    // Clear existing content
    productDisplay.innerHTML = '';

    // Generate HTML for each product in cart
    cartItems.forEach(product => {
        const productHTML = generateProductHTML(product);
        productDisplay.innerHTML += productHTML;
    });

    // Add event listeners to remove buttons
    const removeButtons = document.querySelectorAll('.remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.parentElement.parentElement.id;
            removeProduct(productId);
            // Update total price after product removal
            updateTotalPrice();
        });
    });

    // Add CSS class to product display container to enable scrolling
    const productDisplayContainer = document.querySelector('.product-display');
    productDisplayContainer.classList.add('scrollable');
}

// Call the function to populate product display section
populateProductDisplay();

// Function to remove a product from the product display and local storage
function removeProduct(productId) {
    // Find the index of the product with the specified productId in the cartItems array
    const index = cartItems.findIndex(item => item.id === productId);

    // If the product is found, remove it from the cartItems array
    if (index !== -1) {
        cartItems.splice(index, 1);

        // Update the cartItems in local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Update the cart count display
        updateCartCount();

        // Repopulate the product display section to reflect the changes
        populateProductDisplay();
    }
}

// Function to update total price
function updateTotalPrice() {
    const totalAmount = calculateTotalAmount();
    const deliveryFee = 100; // Delivery fee is Rs 100
    const totalPayment = totalAmount + deliveryFee;

    // Update total amount display
    document.querySelector('.right-details .totalitems span').textContent = `Rs. ${totalAmount}`;
    // Update total payment display
    document.querySelector('.right-details .Totalpayment span').textContent = `Rs. ${totalPayment}`;
}

// Function to calculate total amount
function calculateTotalAmount() {
    let totalAmount = 0;
    cartItems.forEach(product => {
        totalAmount += product.price;
    });
    return totalAmount;
}
