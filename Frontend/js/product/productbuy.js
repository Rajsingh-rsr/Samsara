// Extract product ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('product');

// Function to fetch product data from the API
const getProduct = async () => {
    try {
        const res = await fetch(`http://localhost:4000/api/v1/product/${productId}`);
        const product = await res.json();

        // Check if product data was retrieved successfully
        if (res.ok) {
            populateProductDetails(product.data);
        } else {
            console.error('Failed to fetch product:', product.message);
        }
    } catch (error) {
        console.error('Error fetching product:', error);
    }
};

// Function to populate product details on the page
const populateProductDetails = (product) => {
    // Populate main product image
    document.getElementById('main-img').src = product.productImage;

    // Dynamically generate support images
    const imageContainer = document.querySelector('.product-image-des');
    imageContainer.innerHTML = ''; // Clear any existing images
    product.supportImage.forEach((imageUrl, index) => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Product Image ${index + 1}`;
        img.addEventListener('click', () => {
            document.getElementById('main-img').src = imageUrl;
        });
        imageContainer.appendChild(img);
    });

    // Populate product name and price
    document.getElementById('product-name').innerText = product.name;
    document.getElementById('product-price').innerText = `$${product.price}`;

    // Populate product description
    const descriptionElement = document.getElementById('product-description');
    descriptionElement.innerHTML = ''; // Clear any existing description
    const span = document.createElement('span');
    span.innerText = `Description: ${product.description}`;
    descriptionElement.appendChild(span);
};

// Fetch and display product data on page load
getProduct();
