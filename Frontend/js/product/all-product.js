// Sample user data with multiple products
  
// Function to create a product card
function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = product.productImage;
    img.alt = "Product Image";
    card.appendChild(img);

    const productInfo = document.createElement("div");
    productInfo.className = "product-info";
    card.appendChild(productInfo);
    

    const productName = document.createElement("h2");
    productName.textContent = product.name;
    productInfo.appendChild(productName);

    const productPrice = document.createElement("p");
    productPrice.textContent = `Price: ${product.price}`;
    productInfo.appendChild(productPrice);

    const productDetails = document.createElement("div"); 
    productDetails.className = "product-details";
    productInfo.appendChild(productDetails);

    const productStock = document.createElement("p");
    productStock.textContent = `Total Stock: ${product.stock}`;
    productDetails.appendChild(productStock);

    const productSold = document.createElement("p");
    const sold = Math.floor(Math.random() * 600) 
    productSold.textContent = `Total Sold: ${sold}`;

    productDetails.appendChild(productSold);

    const icon = document.createElement("i");
    icon.className = "far fa-pen-to-square icon";
    productInfo.appendChild(icon);

    return card;
}

// Function to render product cards
function renderProductCards(productData) {
    const productContainer = document.getElementById("product-container");
    productData.forEach(product => {
      const productCard = createProductCard(product);
      productContainer.appendChild(productCard);
    });
}

// Call the function to render product cards based on the user data
// renderProductCards(userData);


// console.log(userData);

// const formData = {
// name: document.getElementById('product-name').value,
// sold: document.getElementById('sold').value,
// brand: document.getElementById('stock').value,
// price: document.getElementById('price').value,
// }

async function fetchData() {
  try {
      const response = await fetch('http://localhost:4000/api/v1/product/seller/allproduct', {
        method: 'GET',
        credentials: 'include' // Include credentials in the request
      });

      // console.log(response);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      } 
      const data2 = await response.json();
     
      console.log(data2);

      renderProductCards(data2.data.docs)
     
   
      // renderProductCards(data2.data.docs); 
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

// Call the fetchData function to fetch and render product cards
fetchData();

