document.addEventListener('DOMContentLoaded', function() {
  // Function to fetch and populate top selling products
  function populateTopSelling() {
      // Simulated data for demonstration
      const topSellingData = [
          { avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D", name: "Product 1", image: "/Frontend/images/product-1.png", seller: "Seller A", dateJoined: "2024-04-01" },
          { avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D", name: "Product 2", image: "/Frontend/images/product-2.png", seller: "Seller B", dateJoined: "2024-04-15" },
          { avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D", name: "Product 3", image: "/Frontend/images/product-3.png", seller: "Seller C", dateJoined: "2024-04-20" }
      ];

      const topSellingContainer = document.querySelector('.top-sellers');
      const topSellersHeading = document.createElement('h2');
      topSellersHeading.textContent = 'Top Sellers';
      topSellingContainer.appendChild(topSellersHeading);

      const topSellersTable = document.createElement('table');
      topSellingContainer.appendChild(topSellersTable);

      const topSellersTableHead = document.createElement('thead');
      topSellersTable.appendChild(topSellersTableHead);

      const tableHeaderRow = document.createElement('tr');
      topSellersTableHead.appendChild(tableHeaderRow);

      const tableHeaders = ['Avatar', 'Seller Name', 'Top Selling', 'Joined On'];
      tableHeaders.forEach(headerText => {
          const th = document.createElement('th');
          th.textContent = headerText;
          tableHeaderRow.appendChild(th);
      });

      const topSellersTableBody = document.createElement('tbody');
      topSellersTable.appendChild(topSellersTableBody);

      topSellingData.forEach(product => {
          const row = document.createElement('tr');
          const avatarCell = document.createElement('td');
          const avatarBox = document.createElement('div');
          avatarBox.classList.add('avatar-box');
          avatarBox.innerHTML = `<img style="width: 55px; height:55px; border-radius: 100%;" src="${product.avatar}" alt="Image 3">`;
          avatarCell.appendChild(avatarBox);
          row.appendChild(avatarCell);

          row.innerHTML += `
              <td>${product.seller}</td>
              <td><img style="width: 70px;" src="${product.image}" alt="Image 3"></td>
              <td>${product.dateJoined}</td>
          `;
          topSellersTableBody.appendChild(row);
      });
  }

  // Function to fetch and populate recent customers
  function populateRecentCustomers() {
      // Simulated data for demonstration
      const recentCustomersData = [
          { name: "John Doe", email: "john@example.com", address: "123 Main St, City, Country", date: "2024-05-01" },
          { name: "Jane Smith", email: "jane@example.com", address: "456 Elm St, Town, Country", date: "2024-04-28" },
          { name: "Alice Johnson", email: "alice@example.com", address: "789 Oak St, Village, Country", date: "2024-04-25" },
          { name: "John Doe", email: "john@example.com", address: "123 Main St, City, Country", date: "2024-05-01" },
          { name: "Jane Smith", email: "jane@example.com", address: "456 Elm St, Town, Country", date: "2024-04-28" },
          { name: "Alice Johnson", email: "alice@example.com", address: "789 Oak St, Village, Country", date: "2024-04-25" }
      ];

      const recentCustomersContainer = document.querySelector('.recent-customers');
      const recentCustomersHeading = document.createElement('h2');
      recentCustomersHeading.textContent = 'Recent Customers';
      recentCustomersContainer.appendChild(recentCustomersHeading);

      recentCustomersData.forEach(customer => {
          const customerDiv = document.createElement('div');
          customerDiv.classList.add('recent-customer-item');
          customerDiv.innerHTML = `
              <div>Name: ${customer.name}</div>
              <div>Email: ${customer.email}</div>
              <div>Address: ${customer.address}</div>
              <div>Date: ${customer.date}</div>
          `;
          recentCustomersContainer.appendChild(customerDiv);
      });
  }

  // Fetch data from the API endpoint with GET method and populate the user visited count
  function fetchUserVisited() {
      fetch('http://localhost:4000/api/v1/admin/uservisited', {
          method: 'GET',
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
          // Get the total number of user visits
          const totalUserVisits = data.data.totalVisitd;          ;
          // Populate the user-visited box
          const userVisitedBox = document.getElementById('user-visited');
          userVisitedBox.textContent = `User Visited:${totalUserVisits}`;
      })
      .catch(error => {
          // Log any errors to the console
          console.error('There was a problem with the fetch operation:', error);
      });
  }

  // Fetch user visit logs
  
  

  // Call functions to populate data
  populateTopSelling();
  populateRecentCustomers();
  fetchUserVisited();
  fetchUserVisitedLog();

  console.log('Dashboard populated with dynamic data.');
});

function fetchRevenue() {
  fetch('http://localhost:4000/api/v1/order/status/DELIVERED', {
      method: 'GET',
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
      console.log('Fetched data:', data);

      // Check if data is an array
      if (!Array.isArray(data)) {
          throw new Error('Fetched data is not an array');
      }

      // Calculate total revenue from the fetched data
      const totalPricePerOrder = data.map(order => {
          return order.orderItem.reduce((acc, item) => {
              // Check if productId exists and has a price property
              if (item.productId && item.productId.price) {
                  return acc + (item.quantity * item.productId.price);
              } else {
                  console.log('Invalid product price:', item);
                  return acc;
              }
          }, 0);
      });

      console.log('Total Price Per Order:', totalPricePerOrder);

      const totalRevenue = totalPricePerOrder.reduce((acc, price) => acc + price, 0);

      // Populate the revenue box on the admin dashboard
      const revenueBox = document.getElementById('revenue');
      revenueBox.textContent = `Total Revenue: $${totalRevenue}`;
  })
  .catch(error => {
      // Log any errors to the console
      console.error('There was a problem with the fetch operation:', error);
  });
}

fetchRevenue();
