const orders = [
  { orderId: 1, customer: "Customer A", status: "Pending", price: 100, date: "2024-05-07" },
  { orderId: 2, customer: "Customer B", status: "Delivered", price: 150, date: "2024-05-06" }
];

function renderOrder(orders) {
  const tableBody = document.getElementById('table-body');

  tableBody.innerHTML = '';

  orders.forEach(order => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td class="id">${order.custumerId}</td>
      <td class="id">${order.custumerName}</td>
      <td class="id">${order.status}</td>
      <td class="id">$${order.orderPrice}</td>
      <td class="id">${order.createdAt}</td>
    `;

    tableBody.appendChild(row);
  });
}  

async function fetchData() {
  try {
    const response = await fetch('http://localhost:4000/api/v1/order/status/ALL', {
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
