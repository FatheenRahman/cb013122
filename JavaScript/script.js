let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price, qtyId) {
    const qty = parseInt(document.getElementById(qtyId).value);
    if (qty > 0) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {

            existingItem.qty += qty;
        } else {
            
            cart.push({ name, price, qty });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartTable();
        alert(`${name} Added To The Cart!`);
    } else {
        alert('Please Enter A Valid Quantity (Input Positive Integers Only)!');
    }
}

function updateCartTable() {
    const cartTableBody = document.querySelector('#cart-table tbody');
    const totalPriceElement = document.getElementById('total-price');
    cartTableBody.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        const row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>LKR ${item.price}</td>
                <td>LKR ${itemTotal}</td>
            </tr>
        `;
        cartTableBody.insertAdjacentHTML('beforeend', row);
    });

    totalPriceElement.textContent = total;
}

function saveFavourite() {
    localStorage.setItem('favourites', JSON.stringify(cart));
}

function applyFavourite() {
    const favourites = JSON.parse(localStorage.getItem('favourites'));
    if (favourites) {
        cart = favourites;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartTable();
    }
}

function clearcart() {
    localStorage.removeItem('cart');
    cart = [];

    const cartTableBody = document.querySelector('#cart-table tbody');
    const totalPriceElement = document.getElementById('total-price');
    
    cartTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Your Cart Is Empty.</td></tr>';
    totalPriceElement.textContent = 'LKR 0.00';
}

function goToCheckout() {
    window.location.href = 'checkout.html';
}

updateCartTable();
