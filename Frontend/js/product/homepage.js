// var swiper = new Swiper(".home-slider", {
//     spaceBetween: 30,
//     centeredSlides: true,
//     autoplay: {
//       delay: 7500,
//       disableOnInteraction: false,
//     },
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//     },
//     loop:true,
    
//     },
//   );
//   var swiper = new Swiper (".Review-slider", {
//    spaceBetween: 20,
//    centeredSlides: true,
//    autoplay: {
//      delay: 5500,
//      disableOnInteraction: false,
//    },
   
//    loop:true,
//    breakpoints: {
//       0:{
//          slidesperview:1,
//       },
//       640:{
//          slidesperview: 2,

//       },
//       768:{
//          slidesperview: 2,

//       },
//       1024:{
//          slidesperview: 3,

//       },

//    }
   
//    },
//  );
//  document.querySelector('#search-icon').onclick = () =>{
//    document.querySelector('#search-form').classList.toggle('active');

// }
// document.querySelector('#close').onclick = () =>{
//    document.querySelector('#search-form').classList.remove('active');}


//    document.addEventListener("DOMContentLoaded", function () {
//       const searchBox = document.getElementById("search-box");
//       const suggestionBox = document.getElementById("suggestion-box");
  
//       // Event listener for when the search box is clicked
//       searchBox.addEventListener("click", function () {
//           // Toggle the visibility of the suggestion box
//           suggestionBox.classList.toggle("active");
//       });
  
//       // Event listener for when the suggestion box is clicked
//       suggestionBox.addEventListener("click", function (event) {
//           // Prevent the click event from propagating to the document
//           event.stopPropagation();
//       });
  
//       // Event listener to close the suggestion box when clicking outside of it
//       document.addEventListener("click", function () {
//           suggestionBox.classList.remove("active");
//       });
//   });

// document.querySelector('#search-icon').onclick = () =>{
//     document.querySelector('#search-form').classList.toggle('active');

//  }
//  document.querySelector('#close').onclick = () =>{
//     document.querySelector('#search-form').classList.remove('active');
//  }
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
  //  for showing profile option when hovering profile user icon
  document.addEventListener("DOMContentLoaded", function() {
    // Sample data for products
    const newArrivals = [
      { id: 1, name: "New Arrival 1", image: "../../images/product-1.png", price: "$65" },
      { id: 2, name: "New Arrival 2", image: "../../images/product-1.png", price: "$70" },
      { id: 3, name: "New Arrival 3", image: "../../images/product-1.png", price: "$75" },
      { id: 5, name: "New Arrival 3", image: "../../images/product-1.png", price: "$75" },
      { id: 6, name: "New Arrival 3", image: "../../images/product-1.png", price: "$75" },
      { id: 7, name: "New Arrival 3", image: "../../images/product-1.png", price: "$75" },
      { id: 8, name: "New Arrival 3", image: "../../images/product-1.png", price: "$75" },
      { id: 9, name: "New Arrival 3", image: "../../images/product-1.png", price: "$75" },
      // Add more products for New Arrivals
    ];
  
    const jeans = [
      { id: 1, name: "Jeans 1", image: "../../images/product-2.png", price: "$65" },
      { id: 2, name: "Jeans 2", image: "../../images/product-2.png", price: "$70" },
      { id: 3, name: "Jeans 3", image: "../../images/product-2.png", price: "$75" },
      { id: 4, name: "Jeans 3", image: "../../images/product-2.png", price: "$75" },
      // Add more products for Jeans
    ];
  
    const jackets = [
      { id: 1, name: "Jacket 1", image: "../../images/product-3.png", price: "$65" },
      { id: 2, name: "Jacket 2", image: "../../images/product-3.png", price: "$70" },
      { id: 2, name: "Jacket 2", image: "../../images/product-3.png", price: "$70" },
      { id: 2, name: "Jacket 2", image: "../../images/product-3.png", price: "$70" }
      
      // Add more products for Jackets
    ];
  
    // Function to create a product element
    function createProductElement(product) {
      const element = document.createElement("div");
      element.classList.add("pro");
  
      element.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="des">
          <span>adidas</span>
          <h5>${product.name}</h5>
          <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h4>${product.price}</h4>
        </div>
        <a href="#"><i class="fas fa-shopping-cart" id="cart"></i></a>
      `;
  
      return element;
    }
  
    // Function to add products to a section
    function addProductsToSection(sectionId, products) {
      const section = document.getElementById(sectionId);
      const container = section.querySelector(".pro-container");
  
      products.forEach(product => {
        const productElement = createProductElement(product);
        container.appendChild(productElement);
      });
    }
  
    // Add products to sections
    addProductsToSection("new-arrivals", newArrivals); // New Arrivals section
    addProductsToSection("jeans", jeans); // Jeans section
    addProductsToSection("jackets", jackets); // Jackets section
  });
  


// Add event listener for hovering over the profile icon
// profileIcon.addEventListener('mouseover', () => {
//     // Calculate the position of the profile icon
//     const iconRect = profileIcon.getBoundingClientRect();
//     const iconTop = iconRect.top + window.scrollY;
//     const iconLeft = iconRect.left + window.scrollX;

//     // Set the position of the profile options container
//     profileOptions.style.top = `${iconTop}px`;
//     profileOptions.style.left = `${iconLeft}px`;
// });
//for add to cart products
// Add event listener to "Add to Cart" button/icon
// Retrieve the cart items from local storage or initialize an empty array if not present
// Add event listener to "Add to Cart" button/icon
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
  button.addEventListener('click', addToCart);
});

function addToCart(event) {
  // Extract product information from the clicked item
  const productInfo = {
      name: event.target.dataset.name,
      size: event.target.dataset.size,
      price: event.target.dataset.price
      // Add more properties as needed
  };

  // Store the product information in local storage or in an array
  let cartItems = localStorage.getItem('cartItems');
  if (!cartItems) {
      cartItems = [];
  } else {
      cartItems = JSON.parse(cartItems);
  }
  cartItems.push(productInfo);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  // Update the cart counter in the navigation bar
  updateCartCounter(cartItems.length);

  // Redirect to the add to cart page
  window.location.href = 'addtocart.html';
}

function updateCartCounter(count) {
  // Update the cart counter element with the total number of items in the cart
  document.getElementById('cart-counter').textContent = count;
}
