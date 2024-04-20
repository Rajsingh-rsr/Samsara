

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
  
    // Function to add a product to the cart
    function addToCart(productId, productName, productPrice, productImage) {
      // Get existing cart items from local storage or initialize an empty array
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
      // Add the new product to the cart items array
      cartItems.push({ id: productId, name: productName, price: productPrice, image: productImage });
  
      // Save the updated cart items back to local storage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  
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
          <button class="add-to-cart"><i class="fas fa-shopping-cart"></i></button>
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
  
        // Add click event listener to each add-to-cart button
        productElement.querySelector('.add-to-cart').addEventListener('click', () => {
          // Get product information
          const productId = product.id;
          const productName = product.name;
          const productPrice = product.price;
          const productImage = product.image;
  
          // Add product to the cart
          addToCart(productId, productName, productPrice, productImage);
  
          // Update the cart count display
          updateCartCount();
        });
      });
    }
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
  
  
    // Sample data for products
   
   
    const jackets = [
      { id: 1, name: "Jacket 1", image: "../../images/product-3.png", price: "1350" },
      { id: 2, name: "Jacket 2", image: "../../images/product-3.png", price: "1200" },
      { id: 3, name: "Jacket 2", image: "../../images/product-3.png", price: "1270" },
      { id: 4, name: "Jacket 2", image: "../../images/product-3.png", price: "1290" },
      // Add more products for Jackets
    ];
  
    // Add products to sections
   
    addProductsToSection("jackets", jackets);
  });
  
  