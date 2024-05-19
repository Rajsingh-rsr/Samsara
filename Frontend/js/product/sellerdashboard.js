


// bar chart
const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Pant', 'T-shirt', 'Hoddie', 'Shirt', 'Jacket'],
    datasets: [{
      label: 'Total sales',
      data: [12, 19, 3, 5, 3],
      borderWidth: 1,
      backgroundColor: 'rgba(0,0,0)',
      borderRadius: 50,
      barThickness: 150
    }]
  },
  responsive: true,
  
});

// data in the table
const orders = [
    { orderId: 1, customer: "Customer A", status: "nice",  date: "2024-05-07" },
    { orderId: 2, customer: "Customer B", status: "good",  date: "2024-05-06" }
  ];
  

  const tableBody = document.getElementById('table-body');

  tableBody.innerHTML = '';
  

  orders.forEach(order => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td class="id">${order.orderId}</td>
      <td class="id">${order.customer}</td>
      <td class="id">${order.status}</td>
      <td>${order.date}</td>
    `;

    tableBody.appendChild(row);
  });

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:4000/api/v1/review/', {
        method: 'GET',
        credentials: 'include' // Include credentials in the request
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      } 
  
      const data = await response.json();
      console.log(data);
  
      renderOrder(data.data); // Pass the fetched data to renderOrder function
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  // Call the fetchData function to fetch and render orders
  fetchData();
  