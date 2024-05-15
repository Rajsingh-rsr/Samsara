document.addEventListener("DOMContentLoaded", function () {
  const pendingOrdersData = [
      { orderId: 1, productName: "Product A", status: "Pending", price: "$20.00" },
      { orderId: 2, productName: "Product B", status: "Pending", price: "$30.00" }
      // Add more pending orders data here
  ];

  const deliveredOrdersData = [
      { orderId: 1, productName: "Product A", status: "Delivered", price: "$20.00", date: "17 May" },
      { orderId: 2, productName: "Product B", status: "Delivered", price: "$30.00", date: "18 May" }
      // Add more delivered orders data here
  ];

  const cancelledOrdersData = [
      { orderId: 1, productName: "Product A", status: "Cancelled", price: "$20.00", date: "17 May" },
      { orderId: 2, productName: "Product B", status: "Cancelled", price: "$30.00", date: "18 May" }
      // Add more cancelled orders data here
  ];

  const createTable = (containerId, ordersData) => {
      const container = document.getElementById(containerId);
      container.innerHTML = `<h2>${containerId.charAt(0).toUpperCase() + containerId.slice(1).replace("-", " ")}</h2>`;
      const table = document.createElement("table");
      const tableHead = document.createElement("thead");
      const tableBody = document.createElement("tbody");

      const headers = ["Order ID", "Product Name", "Status", "Price"];
      if (containerId === "delivered-orders" || containerId === "cancelled-orders") {
          headers.push("Date");
      }
      if (containerId === "delivered-orders") {
          headers.push("Receipt");
      } else if (containerId === "pending-orders") {
          headers.push("Remove");
      }

      const headerRow = document.createElement("tr");
      headers.forEach(headerText => {
          const th = document.createElement("th");
          th.textContent = headerText;
          headerRow.appendChild(th);
      });
      tableHead.appendChild(headerRow);

      ordersData.forEach(order => {
          const row = document.createElement("tr");
          Object.entries(order).forEach(([key, value]) => {
              const cell = document.createElement("td");
              cell.textContent = value;
              row.appendChild(cell);
          });

          if (containerId === "delivered-orders") {
              const receiptCell = document.createElement("td");
              if (order.status === "Delivered") {
                  const downloadLink = document.createElement("a");
                  downloadLink.textContent = "Download";
                  downloadLink.href = "#";
                  downloadLink.classList.add("download-link");
                  downloadLink.addEventListener("click", function () {
                      generatePDF(order);
                  });
                  receiptCell.appendChild(downloadLink);
              }
              row.appendChild(receiptCell);
          } else if (containerId === "pending-orders") {
              const actionCell = document.createElement("td");
              const cancelButton = document.createElement("button");
              cancelButton.textContent = "Cancel";
              cancelButton.classList.add("cancel-btn");
              cancelButton.addEventListener("click", function () {
                  row.remove(); // Remove the row when cancel button is clicked
              });
              actionCell.appendChild(cancelButton);
              row.appendChild(actionCell);
          }

          tableBody.appendChild(row);
      });

      table.appendChild(tableHead);
      table.appendChild(tableBody);
      container.appendChild(table);
  };

  // Function to generate PDF
  function generatePDF(order) {
      const doc = new jsPDF();
      const text = `
          Order ID: ${order.orderId}
          Product Name: ${order.productName}
          Status: ${order.status}
          Price: ${order.price}
      `;
      doc.text(text, 10, 10);
      doc.save("order_receipt.pdf");
  }

  createTable("pending-orders", pendingOrdersData);
  createTable("delivered-orders", deliveredOrdersData);
  createTable("cancelled-orders", cancelledOrdersData);
});