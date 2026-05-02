// Product data - 15 products with names, prices, logos (cycle 4 client logos)
const products = [
    {id: 1, name: 'Carlio', price: 15, logo: 'Assets/clients/Umbrela.avif', img: 'Assets/My Product/p1.webp'},
    {id: 2, name: 'Laptop Pro', price: 999, logo: 'Assets/clients/Redbox.webp', img: 'Assets/My Product/p2.webp'},
    {id: 3, name: 'Perfume Lux', price: 89, logo: 'Assets/clients/Eastlook.avif', img: 'Assets/My Product/p3.webp'},
    {id: 4, name: 'Watch Elite', price: 299, logo: 'Assets/clients/maimi cafe.avif', img: 'Assets/My Product/p4.webp'},
    {id: 5, name: 'Phone X', price: 799, logo: 'Assets/clients/Umbrela.avif', img: 'Assets/My Product/p5.webp'},
    {id: 6, name: 'Bag Designer', price: 199, logo: 'Assets/clients/Redbox.webp', img: 'Assets/My Product/p6.webp'},
    {id: 7, name: 'Shoes Sport', price: 149, logo: 'Assets/clients/Eastlook.avif', img: 'Assets/My Product/p7.webp'},
    {id: 8, name: 'Jewelry Set', price: 249, logo: 'Assets/clients/maimi cafe.avif', img: 'Assets/My Product/p8.webp'},
    {id: 9, name: 'Camera Pro', price: 599, logo: 'Assets/clients/Umbrela.avif', img: 'Assets/My Product/p9.webp'},
    {id: 10, name: 'Headphones', price: 129, logo: 'Assets/clients/Redbox.webp', img: 'Assets/My Product/p10.webp'},
    {id: 11, name: 'Tablet Air', price: 499, logo: 'Assets/clients/Eastlook.avif', img: 'Assets/My Product/p11.webp'},
    {id: 12, name: 'Sunglasses', price: 79, logo: 'Assets/clients/maimi cafe.avif', img: 'Assets/My Product/p12.webp'},
    {id: 13, name: 'Backpack', price: 89, logo: 'Assets/clients/Umbrela.avif', img: 'Assets/My Product/p13.webp'},
    {id: 14, name: 'Fragrance', price: 45, logo: 'Assets/clients/Redbox.webp', img: 'Assets/My Product/p14.webp'},
    {id: 15, name: 'Necklace', price: 179, logo: 'Assets/clients/Eastlook.avif', img: 'Assets/My Product/p15.webp'}
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Existing video function
function playVideo() {
    document.getElementById("thumb").style.display = "none";
    document.querySelector(".play-btn").style.display = "none";

    let video = document.getElementById("video");
    video.style.display = "block";
    video.play();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    updateCartBadge();
    renderProducts();
    initAutoSlider();
});

// Login modal functions
function checkLogin() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.loggedIn) {
        alert('Already logged in as ' + user.email);
    } else {
        window.location.href = 'login.html';
    }
}




// Buy modal
let currentProduct = null;
function openBuyModal(productId) {
    currentProduct = products.find(p => p.id === productId);
    document.getElementById('buyProductName').textContent = currentProduct.name;
    document.getElementById('buyProductPrice').textContent = `$${currentProduct.price}`;
    document.getElementById('buyModal').style.display = 'flex';
}

function closeBuyModal() {
    document.getElementById('buyModal').style.display = 'none';
    document.getElementById('buyForm').reset();
}

function handleBuy(e) {
    e.preventDefault();
    const customer = {
        name: document.getElementById('customerName').value,
        email: document.getElementById('customerEmail').value,
        phone: document.getElementById('customerPhone').value,
        address: document.getElementById('customerAddress').value,
        quantity: parseInt(document.getElementById('quantity').value),
        product: currentProduct,
        total: currentProduct.price * parseInt(document.getElementById('quantity').value),
        date: new Date().toLocaleString()
    };

    // Add to cart
    cart.push(customer);
    localStorage.setItem('cart', JSON.stringify(cart));

    // Generate receipt
    generateReceipt(customer);

    closeBuyModal();
    updateCartBadge();
}

function generateReceipt(customer) {
    const receipt = `
<h2>Receipt - Thank you ${customer.name}!</h2>
<p><strong>Product:</strong> ${customer.product.name}</p>
<p><strong>Price:</strong> $${customer.product.price}</p>
<p><strong>Quantity:</strong> ${customer.quantity}</p>
<p><strong>Total:</strong> $${customer.total}</p>
<p><strong>Date:</strong> ${customer.date}</p>
<p><strong>Ship to:</strong> ${customer.address}</p>
<p>Email: ${customer.email} | Phone: ${customer.phone}</p>
    `;
    document.getElementById('receiptContent').innerHTML = receipt;
    document.getElementById('receiptModal').style.display = 'flex';
    setTimeout(() => window.print(), 500);  // Auto print
}

function closeReceipt() {
    document.getElementById('receiptModal').style.display = 'none';
}

// Cart badge
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
        badge.textContent = cart.length;
        badge.style.display = cart.length > 0 ? 'block' : 'none';
    }
}

// Dynamic product render (to be called after HTML update)
function renderProducts() {
    // Will populate .product-card divs with img src from data-id
    products.forEach(product => {
        const card = document.querySelector(`[data-product-id="${product.id}"]`);
        if (card) {
            card.querySelector('img').src = product.img;
            card.querySelector('.product-logo').src = product.logo;
            card.querySelector('.product-price').textContent = `$${product.price}`;
            card.querySelector('.product-name').textContent = product.name;
        }
    });
}

// Auto slider for existing image slider (s1/s2/s3)
function initAutoSlider() {
    const slides = ['s1', 's2', 's3'];
    let current = 0;

    setInterval(() => {
        document.getElementById(slides[current]).checked = false;
        current = (current + 1) % slides.length;
        document.getElementById(slides[current]).checked = true;
    }, 4000); // Auto 4s cycle
}





