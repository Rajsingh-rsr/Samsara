Add event listener to "Add to Cart" icons/buttons
//   let addToCartButtons = document.querySelectorAll('#cart a');
//   addToCartButtons.forEach(addButtons => {
//       addButtons.addEventListener('click', (e)=>addToCart(e));
//   });
// });
// const viewAllJeansButton = document.querySelector('#view-all-jeans');
//     if (viewAllJeansButton) {
//         viewAllJeansButton.addEventListener('click', () => {
//             window.location.href = '../../html/product/jeanssection.html'; // Navigate to jeanssection.html
//         });
//     }
//     const viewAllJacketsButton = document.querySelector('#view-all-jackets');
//     if (viewAllJacketsButton) {
//         viewAllJacketsButton.addEventListener('click', () => {
//             window.location.href = '../../html/product/jacketsection.html'; 
//         });
//     }

function addToCart(event) {
    // Extract product information from the closest product element
    e.preventDefault();
    let product = event.target.closest('.pro');
    let productName = event.target.product.name;
    let productPrice = event.target.product.price;
    let productImage = event.target.product.image;
    let productValue = { productName , productPrice, productImage };
    
    console.log(product)
    // Store the product information in local storage
    let cartItems = localStorage.getItem('cartItems');
    if (!cartItems) {
        cartItems = [];
    } else {
      cartItems.push(productValue);
      cartItems = JSON.parse(cartItems);
  
    }
    
    console.log(cartItems)
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
  