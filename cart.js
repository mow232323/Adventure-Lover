// --- Cart Data Management and UI Updates ---

// Retrieve cart from localStorage or initialize empty array
let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

// Function to update cart count in navbar
function updateCartCount() {
    const cartCountSpan = document.getElementById('cart-count');
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountSpan) {
        cartCountSpan.innerText = totalItems;
    }
    const quantitySpans = document.querySelectorAll('.quantity');
    quantitySpans.forEach(span => {
        span.innerText = totalItems;
    });
}

// Function to remove item from cart by product id
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

// Function to render cart items in cart page
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">&times;</button>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });
    const cartTotalSpan = document.getElementById('cart-total');
    if (cartTotalSpan) {
        cartTotalSpan.innerText = totalPrice.toFixed(2);
    }
}

// Initialize cart UI on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCartItems();

    // Clear cart button
    const clearCartBtn = document.getElementById('clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            cart = [];
            localStorage.setItem('shoppingCart', JSON.stringify(cart));
            updateCartCount();
            renderCartItems();
        });
    }

    // Buy now button
    const buyBtn = document.getElementById('buy-btn');
    if (buyBtn) {
        buyBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty. Please add items before purchasing.');
                return;
            }
            alert('Thank you for your purchase!');
            cart = [];
            localStorage.setItem('shoppingCart', JSON.stringify(cart));
            updateCartCount();
            renderCartItems();
        });
    }
});
