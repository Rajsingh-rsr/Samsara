// Select the table element
const sellerTable = document.getElementById('sellerTable');

// Function to create table headings
function createTableHeadings() {
  // Clear existing table content
  sellerTable.innerHTML = '';

  // Create table headings
  const headings = ['Avatar', 'Seller Name', 'Top Selling', 'Remove Seller'];
  const headingRow = document.createElement('tr');
  headings.forEach(heading => {
    const th = document.createElement('th');
    th.textContent = heading;
    headingRow.appendChild(th);
  });
  sellerTable.appendChild(headingRow);
}

// Function to populate the table with seller data
function populateTable(data) {
  // Loop through the data and populate the table
  data.forEach(seller => {
    const row = document.createElement('tr');

    // Avatar column (dummy image for now)
    const avatarCell = document.createElement('td');
    avatarCell.classList.add('avatar'); // Add class for styling (optional)
    const dummyAvatar = document.createElement('img');
    dummyAvatar.src = 'path/to/your/dummy/avatar.png'; // Replace with your actual image path
    dummyAvatar.alt = 'Dummy Avatar';
    avatarCell.appendChild(dummyAvatar);
    row.appendChild(avatarCell);

    // Seller Name column
    const nameCell = document.createElement('td');
    nameCell.classList.add('seller-name'); // Add class for styling
    nameCell.textContent = seller.fullName;
    row.appendChild(nameCell);

    // Top Selling column (assuming the seller has at least one product)
    const topSellingCell = document.createElement('td');
    topSellingCell.classList.add('top-selling'); // Add class for styling
    if (seller.products && seller.products.length > 0) {
      const topSellingProduct = seller.products[0];
      if (topSellingProduct.productImage) { // Check if product image is available
        const productImage = document.createElement('img');
        productImage.src = topSellingProduct.productImage; // Correctly accessing the product image URL
        productImage.alt = 'Top Selling Product';
        topSellingCell.appendChild(productImage);
      } else {
        topSellingCell.textContent = 'No image available';
      }
    } else {
      topSellingCell.textContent = 'No products available';
    }
    row.appendChild(topSellingCell);

    // Remove Seller column (using Font Awesome icon)
    const removeCell = document.createElement('td');
    const removeIcon = document.createElement('i');
    removeIcon.classList.add('fas', 'fa-trash'); // Assuming you're using Font Awesome
    removeCell.appendChild(removeIcon);
    row.appendChild(removeCell);

    // Add click event listener for remove button
    removeCell.addEventListener('click', () => {
      console.log('Remove Seller clicked for seller:', seller);

      const sellerId = seller._id;

      // Fetch API call with DELETE method to remove seller
      fetch(`http://localhost:4000/api/v1/admin/remove/user/${sellerId}`, {
        method: 'DELETE',
        credentials: 'include' // Include credentials if necessary for authentication
      })
        .then(response => {
          // Check if the response is successful
          if (!response.ok) {
            throw new Error('Failed to remove seller');
          }
          // Seller removed successfully, update the table
          console.log('Seller removed successfully');

          // Refetch all seller data after successful removal
          return fetch('http://localhost:4000/api/v1/admin/allseller', {
            credentials: 'include'
          });
        })
        .then(response => response.json())
        .then(data => {
          // Clear the table and populate it with the fetched data
          clearTable();
          populateTable(data.data);
        })
        .catch(error => {
          console.error('Error fetching seller data:', error);
          // Handle errors appropriately, e.g., display an error message to the user
        });
    });

    // Append the row to the table
    sellerTable.appendChild(row);
  });
}

// Function to clear table content except for headings
function clearTable() {
  // Clear the table content except for the first row (headings)
  while (sellerTable.rows.length > 1) {
    sellerTable.deleteRow(1);
  }
}

// Fetch data from the API endpoint with credentials included
fetch('http://localhost:4000/api/v1/admin/allseller', {
  credentials: 'include'
})
.then(response => {
  // Check if the response is successful
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  // Parse the JSON response
  return response.json();
})
.then(data => {
  // Log the fetched data to the console
  console.log(data);
  // Populate the table with seller data
  createTableHeadings();
  populateTable(data.data);
})
.catch(error => {
  // Log any errors to the console
  console.error('There was a problem with the fetch operation:', error);
});

// Call the function to create table headings when the page loads
document.addEventListener('DOMContentLoaded', createTableHeadings);

// Fetch data from the API endpoint with credentials included


// Remove Seller column (using Font Awesome icon)
const removeCell = document.createElement('td');
const removeIcon = document.createElement('i');
removeIcon.classList.add('fas', 'fa-trash'); // Assuming you're using Font Awesome
removeCell.appendChild(removeIcon);

// Add click event listener for remove button
removeCell.addEventListener('click', () => {
  const sellerId = seller._id;

  removeCell.addEventListener('click', () => {
    const sellerId = seller._id;
  
    // Fetch API call with DELETE method to remove seller
  })});
