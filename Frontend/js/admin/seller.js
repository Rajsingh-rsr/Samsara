document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch and populate top selling products
    function populateTopSelling() {
        // Simulated data for demonstration
        const topSellingData = [
            { id: 1, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D", name: "Product 1", image: "../../images/product-1.png", seller: "Seller A", dateJoined: "2024-04-01" },
            { id: 2, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D", name: "Product 2", image: "../../images/product-1.png", seller: "Seller B", dateJoined: "2024-04-15" },
            { id: 3, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D", name: "Product 3", image: "../../images/product-1.png", seller: "Seller C", dateJoined: "2024-04-20" }
        ];
  
        const topSellingContainer = document.querySelector('.seller .total-sellers'); // Corrected the target selector
  
        const topSellersTable = document.createElement('table');
        topSellingContainer.appendChild(topSellersTable);
  
        const topSellersTableHead = document.createElement('thead');
        topSellersTable.appendChild(topSellersTableHead);
  
        const tableHeaderRow = document.createElement('tr');
        topSellersTableHead.appendChild(tableHeaderRow);
  
        const tableHeaders = ['Avatar', 'Seller Name', 'Top Selling', 'Remove Seller'];
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
            // avatarBox.style.backgroundImage = `url(${product.image})`;
            avatarBox.innerHTML = `<img style="width: 55px; height:55px; border-radius: 100%;" src="${product.avatar}"  alt="Image 3">`
            avatarCell.appendChild(avatarBox);
            row.appendChild(avatarCell);
  
            row.innerHTML += `
                <td>${product.seller}</td>
                <td><img style="width: 70px;" src="${product.image}"  alt="Image 3"></td>
                <td><button class="delete-btn" data-id="${product.id}"><i class="fas fa-trash-alt"></i></button></td>
            `;
            topSellersTableBody.appendChild(row);
        });
  
        // Add event listener to delete buttons
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                console.log("Delete button clicked");
                const productId = parseInt(button.dataset.id);
                console.log("Product ID:", productId);
                const rowToRemove = button.parentElement.parentElement; // Adjusted to target the parent row
                console.log("Row to remove:", rowToRemove);
                if (rowToRemove) {
                    rowToRemove.remove();
                }
            });
        });
  
    }
  
    // Call functions to populate data
    populateTopSelling();
  
    console.log('Dashboard populated with dynamic data.');
  });
  