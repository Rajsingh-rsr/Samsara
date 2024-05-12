
const orders = [
    { orderId: 1, customer: "Customer A", status: "Pending", price: 100, date: "2024-05-07" },
    { orderId: 2, customer: "Customer B", status: "Delivered", price: 150, date: "2024-05-06" }
  ];
  

  const tableBody = document.getElementById('table-body');

  tableBody.innerHTML = '';
  

  orders.forEach(order => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td class="id">${order.orderId}</td>
      <td class="id">${order.customer}</td>
      <td class="id">${order.status}</td>
      <td class="id">${order.price}</td>
      <td>${order.date}</td>
    `;

    tableBody.appendChild(row);
  });
  