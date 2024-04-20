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
    updateCartCount();

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


// to show the total price in the items total
document.addEventListener("DOMContentLoaded", () => {
  // Retrieve total amount from local storage
  const totalAmount = parseInt(localStorage.getItem('totalAmount'));

  // Check if there are any items in the cart
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  if (cartItems.length === 0) {
      // If there are no items in the cart, display the message
      const orderSummary = document.querySelector('.order-summary');
      const message = document.createElement('p');
      message.textContent = 'Sorry, there are no items to be placed';
      message.style.color = 'red';
      message.style.padding = '40px';
      
      message.style.textAlign = 'center';
      orderSummary.appendChild(message);
      return;
  }

  // If there are items in the cart, proceed with updating the order summary
  const deliveryFee = 100; // Delivery fee is Rs 100

  // Update the "Items Total" section in the order summary
  document.querySelector('.right-details .totalitems span').textContent = `Rs. ${totalAmount}`;

  // Update the "Delivery Fee" section in the order summary
  document.querySelector('.right-details .deliveryfee span').textContent = `Rs. ${deliveryFee}`;

  // Calculate total payment by adding items total and delivery fee
  const totalPayment = totalAmount + deliveryFee;
  // Update the "Total Payment" section in the order summary
  document.querySelector('.right-details .Totalpayment span').textContent = `Rs. ${totalPayment}`;
});


// enable to edit input fields whenever change button is clicked
document.addEventListener("DOMContentLoaded", () => {
  // Add event listeners to change buttons
  const changeButtons = document.querySelectorAll('.change-btn');
  changeButtons.forEach(button => {
      button.addEventListener('click', () => {
          const targetId = button.getAttribute('data-target');
          const inputField = document.getElementById(targetId);
          // Enable the input field for editing
          inputField.disabled = false;
          // Focus on the input field
          inputField.focus();
      });
  });
});

// to display order confiramtion
document.addEventListener("DOMContentLoaded", () => {
  // Add event listener to the "Place Order" button
  const placeOrderBtn = document.getElementById("place-order-btn");
  placeOrderBtn.addEventListener("click", () => {
      // Display the pop-up message
      alert("Your order has been confirmed. Thank you!");
  });
});


