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

    // Add event listener to the "Buy Now" button
    document.getElementById('buy-now').addEventListener('click', () => {
        window.location.href = `../../html/product/placeorder2.html?product=${product._id}`;
    });

    // Add event listener to the "Add to Cart" button
    document.getElementById('add-to-cart').addEventListener('click', () => addToCart(product));
};

// Function to add product to local storage cart
const addToCart = (product) => {
    // Retrieve existing cart items from local storage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if product is already in the cart
    const existingItem = cartItems.find(item => item.id === product._id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        // Add new product to the cart
        cartItems.push({
            id: product._id,
            name: product.name,
            image: product.productImage,
            price: product.price,
            quantity: 1
        });
    }

    // Save updated cart items to local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert('Product added to cart!');
    console.log(cartItems);
    
    // Update cart count
    updateCartCount();
};

// Function to update cart count display
const updateCartCount = () => {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = document.querySelector('.cart-count');
    const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = totalCount;
};

// Fetch and display product data on page load
getProduct();

// Customer review section

// Function to get customer reviews
// Function to get customer reviews
const getReview = async () => {
    try {
        const res = await fetch(`http://localhost:4000/api/v1/review/660863931a095fead189edfd`, {
            method: 'GET',
            credentials: 'include', // Include credentials in the request
        });
        const data = await res.json();
        console.log('Fetched data:', data); // Log the fetched data to the console
        if (res.ok) {
            displayReviews(data.reviews);
        } else {
            console.error('Failed to fetch reviews:', data.message);
            showAlert('Failed to fetch reviews. Please try again later.');
        }
    } catch (error) {
        console.error('Error fetching reviews:', error);
        showAlert('Error fetching reviews. Please check your network connection.');
    }
};

// Fetch and display reviews on page load
getReview();

// Function to generate star icons based on rating
const generateStars = (rating) => {
    const starContainer = document.createElement('div');
    starContainer.classList.add('rating');

    for (let i = 0; i < rating; i++) {
        const starIcon = document.createElement('i');
        starIcon.classList.add('fas', 'fa-star');
        starContainer.appendChild(starIcon);
    }

    return starContainer;
};

// Function to display reviews on the page
const displayReviews = (reviews) => {
    const commentsContainer = document.querySelector('.comments');
    commentsContainer.innerHTML = ''; // Clear any existing comments

    reviews.forEach(review => {
        // Extract necessary data from the review object
        const { feedback, rating, user } = review;

        // Create elements to represent each comment
        const comment = document.createElement('div');
        comment.classList.add('comment');

        const commentContent = document.createElement('div');
        commentContent.classList.add('comment-content');

        const username = document.createElement('h3');
        username.innerText = user.fullName; // Display full name

        const feedbackPara = document.createElement('p');
        feedbackPara.innerText = feedback; // Display feedback

        const ratingStars = generateStars(rating); // Generate star icons based on rating

        // Append elements to the comment container
        commentContent.appendChild(username);
        commentContent.appendChild(feedbackPara);
        commentContent.appendChild(ratingStars); // Append star icons
       
        comment.appendChild(commentContent);
        commentsContainer.appendChild(comment); // Append each comment to the comments container
    });
};


// Function to display reviews on the page



updateCartCount();



