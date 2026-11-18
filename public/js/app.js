document.addEventListener('DOMContentLoaded', () => {
    let products = [];
    let cart = JSON.parse(localStorage.getItem('chaitanya_cart')) || [];

    const dryFruitsGrid = document.getElementById('dryFruitsGrid');
    const sweetsGrid = document.getElementById('sweetsGrid');
    const moreSweetsGrid = document.getElementById('moreSweetsGrid');
    const cartCount = document.getElementById('cartCount');
    const cartToggleBtn = document.getElementById('cartToggleBtn');
    const cartModal = document.getElementById('cartModal');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const checkoutModal = document.getElementById('checkoutModal');
    const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
    const checkoutForm = document.getElementById('checkoutForm');

    // Fetch Products from API
    async function fetchProducts() {
        try {
            const response = await fetch('/api/products');
            products = await response.json();
            renderProducts();
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    }

    function renderProducts() {
        dryFruitsGrid.innerHTML = '';
        sweetsGrid.innerHTML = '';
        moreSweetsGrid.innerHTML = '';

        products.forEach(product => {
            if (product.category === 'dry_fruits') {
                dryFruitsGrid.appendChild(createProductCard(product));
            } else if (product.category === 'sweets' && product.is_featured) {
                sweetsGrid.appendChild(createProductCard(product));
            } else if (product.category === 'sweets' && !product.is_featured) {
                moreSweetsGrid.appendChild(createMiniProductCard(product));
            }
        });
        updateCartUI();
    }

    function createProductCard(product) {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
            <div class="product-img-wrapper">
                <img src="${product.image_url}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
            </div>
            <div class="product-footer">
                <div class="product-price">₹${product.price} <span>/ ${product.unit}</span></div>
                <button class="btn-add" onclick="addToCart(${product.id})">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        `;
        return div;
    }

    function createMiniProductCard(product) {
        const div = document.createElement('div');
        div.className = 'mini-product-card';
        div.innerHTML = `
            <div class="mini-img">
                <img src="${product.image_url}" alt="${product.name}">
            </div>
            <h4>${product.name}</h4>
            <p>${product.unit}</p>
            <div class="mini-footer">
                <span>₹${product.price}</span>
                <button class="btn-add" onclick="addToCart(${product.id})">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        `;
        return div;
    }

    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        saveCart();
        updateCartUI();
        openCart();
    };

    function saveCart() {
        localStorage.setItem('chaitanya_cart', JSON.stringify(cart));
    }

    function updateCartUI() {
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalCount;

        cartItemsList.innerHTML = '';
        let totalSum = 0;

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 2rem;">Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                totalSum += item.price * item.quantity;
                const div = document.createElement('div');
                div.className = 'cart-item';
                div.innerHTML = `
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>₹${item.price} x ${item.quantity}</p>
                    </div>
                    <div class="cart-item-actions">
                        <button class="btn-add" onclick="changeQty(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="btn-add" onclick="changeQty(${item.id}, 1)">+</button>
                    </div>
                `;
                cartItemsList.appendChild(div);
            });
        }
        cartTotalPrice.textContent = `₹${totalSum}`;
    }

    window.changeQty = function(productId, delta) {
        const item = cart.find(i => i.id === productId);
        if (!item) return;
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
        saveCart();
        updateCartUI();
    };

    function openCart() {
        cartModal.classList.add('active');
    }

    function closeCart() {
        cartModal.classList.remove('active');
    }

    cartToggleBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        closeCart();
        checkoutModal.classList.add('active');
    });

    closeCheckoutBtn.addEventListener('click', () => {
        checkoutModal.classList.remove('active');
    });

    checkoutForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const customer_name = document.getElementById('customerName').value;
        const phone = document.getElementById('customerPhone').value;
        const address = document.getElementById('customerAddress').value;
        const total_amount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customer_name, phone, address, items: cart, total_amount })
            });
            const data = await response.json();
            if (data.success) {
                alert('Order placed successfully! Thank you for choosing Chaitanya Foods.');
                cart = [];
                saveCart();
                updateCartUI();
                checkoutModal.classList.remove('active');
                checkoutForm.reset();
            } else {
                alert('Error placing order: ' + data.error);
            }
        } catch (err) {
            console.error('Checkout error:', err);
            alert('Something went wrong. Please try again.');
        }
    });

    fetchProducts();
});
