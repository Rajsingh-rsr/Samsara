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
            downloadLink.href = "path_to_receipt.pdf"; // Replace with the actual path to the receipt
            downloadLink.download = "Receipt.pdf"; // Specify the filename for download
            const downloadIcon = document.createElement("i");
            downloadIcon.classList.add("fas", "fa-download"); // Assuming you're using Font Awesome for icons
            downloadLink.appendChild(downloadIcon);
            receiptCell.appendChild(downloadLink);
          }
          row.appendChild(receiptCell);
        } else if (containerId === "pending-orders") {
          const actionCell = document.createElement("td");
          const cancelButton = document.createElement("button");
          cancelButton.textContent = "Cancel";
          cancelButton.classList.add("cancel-btn");
          cancelButton.addEventListener("click", function() {
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
  
    createTable("pending-orders", pendingOrdersData);
    createTable("delivered-orders", deliveredOrdersData);
    createTable("cancelled-orders", cancelledOrdersData);
  });
  