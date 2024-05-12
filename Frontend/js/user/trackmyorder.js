document.addEventListener("DOMContentLoaded", function () {
    const orderData = [
        { orderId: 123456, name: "Product 1", status: "Delivered", price: "$50", date: "2024-05-07" },
        { orderId: 123457, name: "Product 2", status: "Delivered", price: "$60", date: "2024-05-08" },
        // Add more order data here
    ];

    const tbody = document.getElementById("order-table-body");

    orderData.forEach(order => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${order.orderId}</td>
            <td>${order.name}</td>
            <td>${order.status}</td>
            <td>${order.price}</td>
            <td>${order.date}</td>
        `;
        tbody.appendChild(row);
    });
});
