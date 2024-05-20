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

  // Function for sliding images
  let counter = 1;
  let intervalId;

  const startSlideShow = () => {
    intervalId = setInterval(() => {
      document.getElementById('radio' + counter).checked = true;
      counter++;
      if (counter > 4) {
        counter = 1;
      }
    }, 5000);
  };

  startSlideShow(); // Start automatic sliding initially

  const manualBtns = document.querySelectorAll('.manual-btn');

  // Add event listener to each manual button
  manualBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      counter = Number(btn.getAttribute('for').slice(-1)); // Extract slide number from the 'for' attribute
      clearInterval(intervalId); // Clear interval when a manual button is clicked
      setTimeout(startSlideShow, 5000); // Restart automatic sliding after a delay
    });
  });

  // Function to add a product to the cart
  function addToCart(productId, productName, productPrice, productImage) {
    // Get existing cart items from local storage or initialize an empty array
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Find if the product already exists in the cart
    const existingProduct = cartItems.find(item => item.id === productId);

    if (existingProduct) {
      // If product exists, increase the quantity
      existingProduct.quantity += 1;
    } else {
      // If product does not exist, add it to the cart with quantity 1
      cartItems.push({ id: productId, name: productName, price: productPrice, image: productImage, quantity: 1 });
    }

    // Save the updated cart items back to local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Update the cart count display
    updateCartCount();
  }

  // Function to create a product element
  function createProductElement(product) {
    const element = document.createElement("div");
    element.classList.add("pro");
    console.log(product);
    element.innerHTML = `
      <a href="../../html/product/productbuy.html?product=${product._id}">
        <img src="${product.productImage}" alt="${product.name}">
      </a>
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

  // Function to add products to sections
  function addProductsToSection(sectionId, products) {
    const section = document.getElementById(sectionId);
    const container = section.querySelector(".pro-container");

    products.forEach(product => {
      const productElement = createProductElement(product);
      container.appendChild(productElement);

      // Add click event listener to each add-to-cart button
      productElement.querySelector('.add-to-cart').addEventListener('click', () => {
        // Get product information
        const productId = product._id;
        const productName = product.name;
        const productPrice = product.price;
        const productImage = product.productImage;

        // Add product to the cart
        addToCart(productId, productName, productPrice, productImage);
      });
    });
  }

  // Function to update cart count display
  function updateCartCount() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = document.querySelector('.cart-count');
    // Calculate the number of unique products in the cart
    const uniqueProductCount = cartItems.length;
    // Update the cart counter text
    cartCount.textContent = uniqueProductCount;
  }

  // Fetch products from the backend
  fetch("http://localhost:4000/api/v1/product/?page=1&limit=8", {
    method: 'GET',
    credentials: 'include' // Include credentials in the request
  })
    .then(response => response.json())
    .then(data => {
      // console.log("Fetched data:", data);
      // Check if request was successful
      if (data.statusCode == 200) {
        // Extract product data from the 'data' field
        const products = data.data.docs;

        // Add products to respective sections
        addProductsToSection("new-arrivals", products); // New Arrivals section

        // console.log(products);

        // Add products to Jeans section
        addProductsToSection("jeans", products.filter(product => product.category === "jeans"));

        // Add products to Jacket section
        addProductsToSection("jackets", products.filter(product => product.category === "jacket"));
      } else {
        console.error("Failed to fetch products:", data.message);
      }
    })
    .catch(error => {
      console.error("Error fetching products:", error.message);
    });



  const jeans = async () => {
    const res = await fetch("http://localhost:4000/api/v1/product/?page=1&limit=8&query=jeans", {
      method: 'GET',
      credentials: 'include'
    })

    const data = await res.json();
    console.log("jeans:", data);

    if (data.statusCode == 200) {
      // Extract product data from the 'data' field
      const products = data.data.docs;

      // Add products to respective sections
      addProductsToSection("jeans", products); // New Arrivals section

      // console.log(products);

    } else {
      console.error("Failed to fetch products:", data.message);
    }

  }

  const Jacket = async () => {
    const res = await fetch("http://localhost:4000/api/v1/product/?page=1&limit=8&query=jacket", {
      method: 'GET',
      credentials: 'include'
    })

    const data = await res.json();
    console.log("jeans:", data);

    if (data.statusCode == 200) {
      // Extract product data from the 'data' field
      const products = data.data.docs;

      // Add products to respective sections
      addProductsToSection("jackets", products); // New Arrivals section

      // console.log(products);

    } else {
      console.error("Failed to fetch products:", data.message);
    }

  }


  jeans()
  Jacket()
  updateCartCount(); // Initial cart count update
});

const init = () => {
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

  // Function for sliding images
  let counter = 1;
  let intervalId;

  const startSlideShow = () => {
    intervalId = setInterval(() => {
      document.getElementById('radio' + counter).checked = true;
      counter++;
      if (counter > 4) {
        counter = 1;
      }
    }, 5000);
  };

  startSlideShow(); // Start automatic sliding initially

  const manualBtns = document.querySelectorAll('.manual-btn');

  // Add event listener to each manual button
  manualBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      counter = Number(btn.getAttribute('for').slice(-1)); // Extract slide number from the 'for' attribute
      clearInterval(intervalId); // Clear interval when a manual button is clicked
      setTimeout(startSlideShow, 5000); // Restart automatic sliding after a delay
    });
  });

  // Function to add a product to the cart
  function addToCart(productId, productName, productPrice, productImage) {
    // Get existing cart items from local storage or initialize an empty array
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Find if the product already exists in the cart
    const existingProduct = cartItems.find(item => item.id === productId);

    if (existingProduct) {
      // If product exists, increase the quantity
      existingProduct.quantity += 1;
    } else {
      // If product does not exist, add it to the cart with quantity 1
      cartItems.push({ id: productId, name: productName, price: productPrice, image: productImage, quantity: 1 });
    }

    // Save the updated cart items back to local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Update the cart count display
    updateCartCount();
  }
}


init()
// Function to create a product element
function createProductElement(product) {
  const element = document.createElement("div");
  element.classList.add("pro");
  console.log(product);
  element.innerHTML = `
      <a href="../../html/product/productbuy.html?product=${product._id}">
        <img src="${product.productImage}" alt="${product.name}">
      </a>
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

// Function to add products to sections
function addProductsToSection(sectionId, products) {
  const section = document.getElementById(sectionId);
  const container = section.querySelector(".pro-container");

  products.forEach(product => {
    const productElement = createProductElement(product);
    container.appendChild(productElement);

    // Add click event listener to each add-to-cart button
    productElement.querySelector('.add-to-cart').addEventListener('click', () => {
      // Get product information
      const productId = product._id;
      const productName = product.name;
      const productPrice = product.price;
      const productImage = product.productImage;

      // Add product to the cart
      addToCart(productId, productName, productPrice, productImage);
    });
  });
}

const searchProduct = async () => {

  const productName = document.querySelector('#search-box').value;

  console.log(productName);

  const res = await fetch(`http://localhost:4000/api/v1/product/?query=${productName}`, {
    method: 'GET',
    credentials: 'include'
  })

  const data = await res.json();

  if (data.statusCode == 200) {
    const products = data.data.docs;

    console.log(products);

    addProductsToSection("searchres", products)

  } else {
    console.error("Failed to fetch products:", data.message);
  }


}

document.querySelector("#searchProduct").addEventListener("click", searchProduct);
