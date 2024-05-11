window.addEventListener('DOMContentLoaded', async () => {
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
          const userData = res.data

          console.log(userData)

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
              
              <button class="remove">Remove</button>
          </div>
      </div>
  `;
}

// Populate product display with cart items
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
      button.addEventListener('click', (event) => {
          const productId = event.target.closest('.product').id;
          removeProduct(productId);
      });
  });

  // Add CSS class to product display container to enable scrolling
  const productDisplayContainer = document.querySelector('.product-display');
  productDisplayContainer.classList.add('scrollable');
}


// Call the function to populate product display section
populateProductDisplay();

// Function to remove a product from the product display and local storage


// Populate product display with cart items
function populateProductDisplay() {
  const productDisplay = document.getElementById('product-display');

  // Generate HTML for each product in cart
  cartItems.forEach(product => {
      const productHTML = generateProductHTML(product);
      productDisplay.innerHTML += productHTML;
  });

  // Add CSS class to product display container to enable scrolling
  const productDisplayContainer = document.querySelector('.product-display');
  productDisplayContainer.classList.add('scrollable');

  // Add event listeners to remove buttons
  const removeButtons = document.querySelectorAll('.remove');
  removeButtons.forEach(button => {
      button.addEventListener('click', () => {
          const productId = button.parentElement.parentElement.id;
          removeProduct(productId);
      });
  });
}
// Function to remove a product from the product display and local storage
function removeProduct(productId) {
  // Remove product from product display
  const productElement = document.getElementById(productId);
  productElement.remove();

  // Remove product from local storage
  const updatedCartItems = cartItems.filter(item => item.id !== productId);
  localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

  // Update cart count display
  updateCartCount();
}
// for payment mwthod and placing order

document.addEventListener("DOMContentLoaded", () => {
  const cashOnDeliveryIcon = document.getElementById("cash-on-delivery");
  const onlinePaymentIcon = document.getElementById("online-payment");
  const placeOrderBtn = document.getElementById("place-order-btn");

  // Event listener for Cash on Delivery
  cashOnDeliveryIcon.addEventListener("click", () => {
      // Show simple order confirmation popup
      alert("Your order has been placed. Thank you!");
  });

  // Event listener for Online Payment
  onlinePaymentIcon.addEventListener("click", () => {
      // Show card fill-up form popup
      const cardFormPopup = document.getElementById("card-form-popup");
      cardFormPopup.style.display = "block";
  });

  // Event listener for Place Order button
  placeOrderBtn.addEventListener("click", () => {
      // Close card fill-up form popup if it's open
      const cardFormPopup = document.getElementById("card-form-popup");
      cardFormPopup.style.display = "none";

      // Perform any other necessary actions for placing the order
      // For example: submit form data, process payment, etc.
  });
});
// for closing the popup
document.addEventListener("DOMContentLoaded", () => {
  const cardFormPopup = document.getElementById("card-form-popup");
  const closeBtn = document.getElementById("close-card-form");
  const cardForm = document.getElementById("card-form");

  // Function to open card fill-up form popup
  function openCardFormPopup() {
      cardFormPopup.style.display = "block";
  }

  // Function to close card fill-up form popup
  function closeCardFormPopup() {
      cardFormPopup.style.display = "none";
  }

  // Event listener for close button
  closeBtn.addEventListener("click", () => {
      closeCardFormPopup();
  });

  // Event listener for form submission
  cardForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent form submission
      closeCardFormPopup();
      // Additional actions for form submission (e.g., form validation, data submission)
  });
});






