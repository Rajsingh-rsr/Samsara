const API_ENDPOINT = 'http://localhost:4000/api/v1' // could be refactored to be app-wide later

// Function to delete row
async function deleteRow(productId) {
    console.log("in deleteRow function");
    console.log(productId);
    var to_delete = document.getElementById(productId);
    to_delete.remove();
    const response = await fetch(API_ENDPOINT + '/product/' + productId, {
      method: 'DELETE',
      credentials: 'include' // Include credentials in the request
    });
    console.log("My response is", response);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    } 
}

// Function to correct row
async function correctRow(productId) {
  // You can implement correction logic here
  // For example, updating stock based on user input
  console.log("in correctRow function");
  console.log(productId);
  var to_correct = document.getElementById(productId);
  var stockCell = to_correct.cells[2];
  var newStock = parseInt(stockCell.textContent.trim()); // Get the new stock value
  const response = await fetch(API_ENDPOINT + '/product/update-stock/' + productId, {
    method: 'PATCH',
    body: JSON.stringify({ newStock: newStock }),
    headers: {
      'Content-Type': 'application/json', // Necessary to set content type
      'Accept': 'application/json' // Ensures server knows what client expects
    },
    credentials: 'include' // Include credentials in the request
  });
  console.log("My response is", response);
  if (!response.ok) {
      throw new Error('Network response was not ok');
  } 
  // You can perform any further actions with the new stock value
  alert("Stock corrected to: " + newStock);
}

// Function to update product price
async function updatePrice(productId, element) {
  try {
    const newPrice = parseFloat(element.innerText.replace('$', '')); // Extract the new price value
    const response = await fetch(`${API_ENDPOINT}/product/update-price/${productId}`, {
      method: 'PATCH',
      body: JSON.stringify({ newPrice: newPrice }),
      headers: {
        'Content-Type': 'application/json', // Necessary to set content type
        'Accept': 'application/json' // Ensures server knows what client expects
      },
      credentials: 'include' // Include credentials in the request
    });
    if (!response.ok) {
      throw new Error('Failed to update product price');
    }
    const data = await response.json();
    console.log('Product price updated successfully:', data);
    alert("Price updated to: $" + newPrice);
  } catch (error) {
    console.error('Error updating price:', error);
  }
}


function renderProductCards(products) { // pass in products
  tb =  document.querySelector("#product-container table tbody");
  products.forEach(product => { // iterate over products
    const row = document.createElement('tr'); // create a new row object
    row.id = product._id;
    row.innerHTML = ` 
      <td>${product.name}</td>
      <td contenteditable="true">$${product.price}</td>
      <td contenteditable="true">${product.stock}</td>
      <td><button onclick="deleteRow('${product._id}')"><i class="fas fa-trash-alt"></i></button></td>
      <td><button onclick="correctRow('${product._id}')"><i class="fas fa-check"></i></button></td>
      <td></td>
      <td></td>
    `; // set the row's various columns

    tb.appendChild(row);
  });
}

async function fetchData() {
  try {
      const response = await fetch(API_ENDPOINT + '/product/seller/allproduct', {
        method: 'GET',
        credentials: 'include' // Include credentials in the request
      });

      console.log("My response is", response);
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
