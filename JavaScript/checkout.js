let cart = JSON.parse(localStorage.getItem('cart')) || [];

function loadCart() {
    const tableBody = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    if (cart.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4">Your Cart Is Empty.</td></tr>';
        totalPriceElement.innerText = 'LKR 0.00';
        return;
    }

    tableBody.innerHTML = cart.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>LKR ${item.price.toFixed(2)}</td>
            <td>${item.qty}</td>
            <td>LKR ${(item.price * item.qty).toFixed(2)}</td>
        </tr>
    `).join('');

    totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    totalPriceElement.innerText = `LKR ${totalPrice.toFixed(2)}`;
}

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const contactNumber = document.getElementById('contactNumber').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const payment = document.getElementById('payment').value;
    const report = document.getElementById('report').files.length;

    if (!name || !contactNumber || !email || !address || !payment || (payment === 'onlinepayment' && report === 0)) {
        alert('Please Fill In All The Required Fields Before Placing Your Order.');
        return false;
    }
    return true;
}

function confirmOrder() {
    if (cart.length === 0) {
        alert('Your Cart Is Empty.');
        return;
    }

    if (validateForm()) {
        alert('Your Order Is Confirmed! Thank You For Shopping With Us! You Will Receive Your Order Within 2 Days!');
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    loadCart();
    document.getElementById('confirm-order-btn').addEventListener('click', confirmOrder);
});
