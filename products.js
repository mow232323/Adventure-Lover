// --- DOM Element Selections ---
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let checkoutButton = document.querySelector('.checkoutButton');

let cartIcon = document.querySelector('.shopping');
let cartDiv = document.querySelector('.card');
let closeCartBtn = document.querySelector('.closeShopping');

// --- Product Data ---
let products = [
    
    { id: 1, name: 'Portable Stove ', image: 'cook1.JPG', price: 12000 },
    { id: 2, name: '50W Solar Lamp ', image: 'lamp.webp', price: 12000, discount: 10000},
    { id: 3, name: 'Outdoors Camping tent', image: 'tent4.webp', price: 22000 },
    { id: 4, name: 'Multi Piller tool', image: 'tool.jpg', price: 12300, discount: 10000 },
    { id: 5, name: 'Survival Whistle ', image: 'whisel.jpg', price: 300},
    { id: 6, name: 'Fire Starting Kit', image: 'Fire-Kit.jpg', price: 1200, discount: 1100 },
    { id: 7, name: 'LED Flashlight', image: 'Flash.avif', price: 12000},
    { id: 8, name: 'Portable Stove', image: 'Portable Stove.webp', price: 12000, discount: 11000 },
    { id: 9, name: 'Camping Backpack', image: 'bag4.jpg', price: 12000 },
    { id: 10, name: 'Mini Stove', image: 'cook2.webp', price: 12000, discount: 10000},
    { id: 11, name: 'Emergency Kit', image: 'emer.jpg', price: 1200},
    { id: 12, name: 'Hiking Backpack', image: 'bag1.webp', price: 85000, discount: 80000 },
    { id: 13, name: 'Waterproof Camping Tent', image: 'tent5.jpg', price: 300000 },
    { id: 14, name: 'Portable Solar Charger', image: 'Charger.webp', price: 45000, discount: 30000 },
    { id: 15, name: 'Compact Camping Stove', image: 'sove.avif', price: 30000 },
    { id: 16, name: 'Thermal Sleeping Bag', image: 'sleeping bag.jpg', price: 700, discount: 650 },
    { id: 17, name: 'Multi-tool Pocket Knife', image: 'nife.jpg', price: 2500 },
    { id: 18, name: 'LED Headlamp', image: 'headlamp.webp', price: 20000, discount: 15000 }
];

let listCards = [];

// --- Initialize Product List ---
function initApp() {
    products.forEach((product, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        let imagePath = `img/${product.image}`;
        let priceHTML = '';
        if (product.discount) {
            priceHTML = `
                <span class="original-price" style="text-decoration: line-through; color: gray; margin-right: 8px;">$${(product.price / 100).toFixed(2)}</span>
                <span class="discounted-price">$${((product.price - product.discount) / 100).toFixed(2)}</span>
            `;
        } else {
            priceHTML = `$${(product.price / 100).toFixed(2)}`;
        }
        newDiv.innerHTML = `
            <img id="pd_img" src="${imagePath}" onerror="this.onerror=null;this.src='https://placehold.co/300x430/cccccc/333333?text=No+Image';">
            <div class="product-info" style="align-items: center; justify-content: space-between; margin-top: 10px;">
              <div>
                <div class="title">${product.name}</div>
                <div class="price">${priceHTML}</div>
              </div>
              <button class="add-to-cart-btn" onclick="addToCart(${key})">Add To Cart</button>
            </div>
        `;
        list.appendChild(newDiv);
    });

    // Calculate total price of all products
    const totalPriceAll = products.reduce((sum, product) => sum + product.price, 0);
    // Format as dollar price string
    const formattedTotal = '$' + (totalPriceAll / 100).toFixed(2);
    // Update the new total price element
    const totalPriceAllElement = document.getElementById('totalPriceAll');
    if (totalPriceAllElement) {
        totalPriceAllElement.textContent = 'Total Price of All Products: ' + formattedTotal;
    }
}

// --- Add to Cart ---
function addToCart(key) {
    if (listCards[key] == null) {
        listCards[key] = { ...products[key], quantity: 1 };
    } else {
        listCards[key].quantity++;
        listCards[key].price = listCards[key].quantity * products[key].price;
    }
    reloadCart();
    cartDiv.classList.add('active'); // Show cart when item added
}

// --- Reload Cart Display ---
function reloadCart() {
    listCard.innerHTML = '';
    let totalPrice = 0;
    let itemCount = 0;
    listCards.forEach((item, key) => {
        if (item) {
            totalPrice += item.price;
            itemCount += item.quantity;
            const imagePath = `img/${item.image}`;
            let cartItem = document.createElement('li');
            cartItem.innerHTML = `
                <div><img src="${imagePath}" onerror="this.onerror=null;this.src='https://placehold.co/80x80/cccccc/333333?text=No+Image';" /></div>
                <div class="name">${item.name}</div>
                <div class="price">${item.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${item.quantity - 1})">-</button>
                    <div class="count">${item.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${item.quantity + 1})">+</button>
                </div>
            `;
            listCard.appendChild(cartItem);
        }
    });
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = itemCount;
}

// --- Change Quantity ---
function changeQuantity(key, newQty) {
    if (newQty <= 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = newQty;
        listCards[key].price = newQty * products[key].price;
    }
    reloadCart();
}

// --- Checkout ---
checkoutButton.addEventListener('click', () => {
    const itemsToBuy = listCards.filter(item => item != null);
    if (itemsToBuy.length === 0) {
        alert("Your cart is empty. Please add items before checking out.");
        return;
    }
    console.log("Checking out...", itemsToBuy);
    listCards = [];
    reloadCart();
    alert("Thank you for your purchase! Your order has been placed.");
});

// --- Toggle Cart ---
cartIcon.addEventListener('click', () => {
    cartDiv.classList.toggle('active');
});
closeCartBtn.addEventListener('click', () => {
    cartDiv.classList.remove('active');
});

 // --- Init ---
initApp();
