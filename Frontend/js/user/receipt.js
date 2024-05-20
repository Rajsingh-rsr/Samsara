function fetchDeliveredOrders() {
    fetch('http://localhost:4000/api/v1/order/user/orderHistory/DELIVERED', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}
