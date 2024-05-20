// Function to populate product details in the product display section
const populateProductDetails = (product) => {
    const productDisplay = document.getElementById('product-display');
    const itemTotalElement = document.getElementById('item-total');
    const totalPaymentElement = document.getElementById('total-payment');
    const deliveryFee = 100; // Assuming delivery fee is fixed at Rs 100

    // Display product details
    productDisplay.innerHTML = `
        <h2 class="product-review-heading">Product Review</h2>
        <div class="product" id="${product.id}">
            <img src="${product.productImage}" alt="Product Image" >
        </div>
    `;

    // Update order summary with product price
    itemTotalElement.textContent = `Rs ${product.price}`;
    const totalPayment = product.price + deliveryFee;
    totalPaymentElement.textContent = `Rs ${totalPayment}`;
};

// Function to fetch product data from the API
const getProduct = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');

    console.log('Product ID:', productId); // Log product ID for debugging

    try {
        if (!productId) {
            throw new Error('Invalid product ID');
        }

        const res = await fetch(`http://localhost:4000/api/v1/product/${productId}`);
        const responseData = await res.json();

        if (res.ok) {
            console.log('Product Data:', responseData.data);
            populateProductDetails(responseData.data);
        } else {
            console.error('Failed to fetch product:', responseData.message);
        }
    } catch (error) {
        console.error('Error fetching product:', error.message);
    }
};

// Function to fetch current user data and populate the form
const getCurrentUser = async () => {
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

            document.getElementById('address').value = userData.address;
            document.getElementById('email').value = userData.email;
            document.getElementById('phone').value = userData.phone;
        } else {
            console.error('Failed to fetch current user data');
        }
    } catch (error) {
        console.error('Error fetching current user data:', error);
    }
};

// Event listener for DOMContentLoaded to fetch and display data
window.addEventListener('DOMContentLoaded', () => {
    getCurrentUser();
    getProduct();
});

// Function to handle search form visibility
document.addEventListener("DOMContentLoaded", () => {
    const searchIcon = document.querySelector('#search-icon');
    const searchForm = document.querySelector('#search-form');
    const closeButton = document.querySelector('#close');

    searchIcon.addEventListener("click", () => {
        searchForm.classList.add('active');
    });

    closeButton.addEventListener("click", () => {
        searchForm.classList.remove('active');
    });

    updateCartCount();
});

// Update cart count display
function updateCartCount() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = document.querySelector('.cart-count');
    const totalCount = cartItems.length;
    cartCount.textContent = totalCount;
}

// Function to handle submission of card form
// Function to handle selection of payment method
const handlePaymentMethodSelection = () => {
    const onlinePaymentRadio = document.getElementById('online-payment');
    const cardFormPopup = document.getElementById('card-form-popup');

    onlinePaymentRadio.addEventListener('change', () => {
        if (onlinePaymentRadio.checked) {
            // If online payment is selected, show the card form popup
            cardFormPopup.style.display = 'block';
        } else {
            // If another payment method is selected, hide the card form popup
            cardFormPopup.style.display = 'none';
        }
    });
};

// Call the function to handle payment method selection
handlePaymentMethodSelection();


const handleCloseCardPopup = () => {
    const closeButton = document.getElementById('close-card-form');
    const cardFormPopup = document.getElementById('card-form-popup');

    closeButton.addEventListener('click', () => {
        // Hide the card form popup when the close button is clicked
        cardFormPopup.style.display = 'none';
    });
};

// Call the function to handle closing of card form popup
handleCloseCardPopup()

// Function to handle submission of card form
document.addEventListener("DOMContentLoaded", () => {
    // Function to handle submission of card form
    const handleCardFormSubmission = () => {
        const cardForm = document.getElementById('card-form');

        cardForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission behavior

            console.log('Form submitted'); // Check if the event listener is triggered

            // Check if all input fields are filled
            const name = document.getElementById('Name').value.trim();
            const cardNumber = document.getElementById('card-number').value.trim();
            const expiryDate = document.getElementById('expiry-date').value.trim();
            const cvv = document.getElementById('cvv').value.trim();

            console.log(name, cardNumber, expiryDate, cvv); // Log input field values

            if (name && cardNumber && expiryDate && cvv) {
                // If all fields are filled, show the success alert
                alert('Submitted successfully!');
            } else {
                // If any field is empty, show an error message
                alert('Please fill in all fields.');
            }
        });
    };

    // Call the function to handle submission of card form
    handleCardFormSubmission();
});

document.addEventListener("DOMContentLoaded", () => {
    const placeOrderBtn = document.getElementById("place-order-btn");
    placeOrderBtn.addEventListener("click", async () => {
        try {
            // Fetch the product data from the API
            const productResponse = await fetch('http://localhost:4000/api/v1/product/', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const productData = await productResponse.json();

            // Extract the order ID from the fetched product data
            const orderId = productData._id;

            // Gather necessary information for the order
            const phone = document.getElementById("phone").value.trim();
            const shippingAddress = document.getElementById("address").value.trim();
            const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

            // Prepare order items with product ID, quantity, and other details
            const orderItems = [{
                productId: orderId, // Extracted orderId from the product data
                quantity: 1 // For simplicity, assuming quantity as 1 for each product
            }];

            const orderData = {
                phone,
                shippingAddress,
                paymentMethod,
                orderItems: JSON.stringify(orderItems)
            };
            
            // Send order data to the backend using POST method
            const orderResponse = await fetch('http://localhost:4000/api/v1/order/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
                credentials: 'include',
            });

            // Log the status of the POST request
            console.log('Order Status:', orderResponse.status);

            if (orderResponse.status === 201) {
                // Redirect to home page upon successful order placement
                window.location.href = "../product/homepage.html";
            }
        } catch (error) {
            console.error('Error placing order:', error);
        }
    });
});
