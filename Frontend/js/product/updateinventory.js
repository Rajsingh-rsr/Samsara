// Function to delete row
function deleteRow(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
  }

  // Function to correct row
  function correctRow(button) {
    // You can implement correction logic here
    // For example, updating stock based on user input
    var row = button.parentNode.parentNode;
    var stockCell = row.cells[2];
    var newStock = parseInt(stockCell.textContent.trim()); // Get the new stock value
    // You can perform any further actions with the new stock value
    alert("Stock corrected to: " + newStock);
  }

  
// async function fetchData() {
//   try {
//       const response = await fetch('http://localhost:4000/api/v1/product/seller/allproduct', {
//         method: 'GET',
//         credentials: 'include' // Include credentials in the request
//       });

//       // console.log(response);
//       if (!response.ok) {
//           throw new Error('Network response was not ok');
//       } 
//       const data2 = await response.json();
     
//       console.log(data2);

//       renderProductCards(data2.data.docs)
     
   
//       // renderProductCards(data2.data.docs); 
//   } catch (error) {
//       console.error('Error fetching data:', error);
//   }
// }

// // Call the fetchData function to fetch and render product cards
// fetchData();
