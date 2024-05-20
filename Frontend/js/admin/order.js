document.addEventListener("DOMContentLoaded", () => {
    // Function to update order status
    const updateOrderStatus = (orderId, newStatus) => {
        fetch(`http://localhost:4000/api/v1/order/update/${orderId}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update order status');
            }
            return response.json();
        })
        .then(data => {
            console.log('Order status updated successfully:', data);
            // Log response status
            console.log('Response status:', response.status);
            // Optionally, you can perform additional actions after successful update
        })
        .catch(error => {
            console.error('Error updating order status:', error);
        });
    };

    fetch('http://localhost:4000/api/v1/order/status/ALL', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(responseData => {
        console.log(responseData);  // Log the entire response object

        const orders = responseData.data;  // Access the 'data' field

        if (!Array.isArray(orders)) {
            console.error('Expected an array but got:', orders);
            return;
        }

        let pendingCount = 0;
        let deliveredCount = 0;
        let cancelledCount = 0;

        const tableBody = document.querySelector('#orderTable tbody');
        orders.forEach(order => {
            switch(order.status) {
                case 'PENDING':
                    pendingCount++;
                    break;
                case 'DELIVERED':
                    deliveredCount++;
                    break;
                case 'CANCELLED':
                    cancelledCount++;
                    break;
            }

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.custumerId}</td>
                <td>${order.custumerName}</td>
                <td>
                    <select class="status-dropdown" data-order-id="${order._id}">
                        <option value="PENDING" ${order.status === 'PENDING' ? 'selected' : ''}>Pending</option>
                        <option value="DELIVERED" ${order.status === 'DELIVERED' ? 'selected' : ''}>Delivered</option>
                        <option value="CANCELLED" ${order.status === 'CANCELLED' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
                <td>${order.orderPrice}</td>
                <td>${new Date(order.createdAt).toLocaleDateString()}</td>
            `;
            tableBody.appendChild(row);
        });

        // Update counts in respective boxes
        document.getElementById('active').textContent = `Active orders ${pendingCount}`;
        document.getElementById('complete').textContent = `Completed ${deliveredCount}`;
        document.getElementById('total').textContent = `Total orders ${orders.length}`;

        // Add event listener for dropdown change
        document.querySelectorAll('.status-dropdown').forEach(dropdown => {
            dropdown.addEventListener('change', (event) => {
                const orderId = event.target.dataset.orderId;
                const newStatus = event.target.value;
                // Update order status
                updateOrderStatus(orderId, newStatus);
            });
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
});
