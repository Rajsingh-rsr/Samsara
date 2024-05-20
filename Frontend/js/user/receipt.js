// Replace these with your actual data
const transactionCode = "123456";
const paymentMethod = "Credit Card";
const shippingAddress = "123 Main Street, Anytown, CA 12345";
const orderItems = [
    { item: "Product 1", quantity: 1, price: 10.00 },
    { item: "Product 2", quantity: 2, price: 5.00 },
    { item: "Product 3", quantity: 1, price: 15.00 },
];
const date = new Date().toLocaleDateString();

// Populate the transaction code and payment method
document.getElementById("transaction-code").textContent = transactionCode;
document.getElementById("payment-method").textContent = paymentMethod;

// Generate a unique order number and store it in the cart element
const cart = document.getElementById("cart");
let cartItems = [];
let totalAmount = 0;
for (const item of orderItems) {
    const cartItem = document.createElement("div");
    cartItem.innerHTML = `
        <div class="item-image">
            <img src="<span class="math-inline">\{item\.imageUrl\}" alt\="</span>{item.name}">