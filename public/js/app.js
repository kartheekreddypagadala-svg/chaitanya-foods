const FALLBACK_PRODUCTS = [
    {
        id: 1,
        name: 'Cashew Nuts (W320)',
        category: 'dry_fruits',
        description: 'Premium quality whole cashews, freshly packed and direct from the factory at affordable prices.',
        price: 750,
        unit: '500g',
        image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
        badge: 'Factory Direct',
        tags: 'Full cashews,Cashew pieces,Pacha jeedipappu',
        is_featured: 1
    },
    {
        id: 2,
        name: 'Premium Almonds',
        category: 'dry_fruits',
        description: 'Fresh, quality almonds available in multiple sizes. Roasted almonds also available on request.',
        price: 850,
        unit: '500g',
        image_url: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=600&q=80',
        badge: 'Fresh Harvest',
        tags: 'Multiple sizes,Roasted',
        is_featured: 1
    },
    {
        id: 3,
        name: 'Pootha Rekulu',
        category: 'sweets',
        description: 'Thin sheets of rice batter rolled around pure ghee and sweet filling. Choose your favourite kind.',
        price: 400,
        unit: 'Box of 10',
        image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
        badge: 'Atreyapuram Special',
        tags: 'Sugar,Jaggery,Sugar dry fruit,Jaggery dry fruit',
        is_featured: 1
    },
    {
        id: 4,
        name: 'Bobbatlu (బొబ్బట్లు)',
        category: 'sweets',
        description: 'Each piece is made with the finest ingredients and pure ghee, so every bite is full of flavour.',
        price: 350,
        unit: '5 pcs',
        image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
        badge: 'Festival Favorite',
        tags: 'Medium taste available',
        is_featured: 1
    },
    {
        id: 5,
        name: 'Ariselu (అరిసెలు)',
        category: 'sweets',
        description: 'Traditional crispy-edged rice flour and pure jaggery discs.',
        price: 300,
        unit: '500g',
        image_url: 'https://images.unsplash.com/photo-1599487484177-6c62445d568a?auto=format&fit=crop&w=600&q=80',
        badge: 'Traditional',
        tags: 'Jaggery',
        is_featured: 0
    },
    {
        id: 6,
        name: 'Raagi Laddu (రాగి లడ్డు)',
        category: 'sweets',
        description: 'Healthy finger millet laddus prepared with pure ghee and jaggery.',
        price: 280,
        unit: '500g',
        image_url: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80',
        badge: 'Healthy',
        tags: 'Millet & Ghee',
        is_featured: 0
    },
    {
        id: 7,
        name: 'Dry Fruit Laddu',
        category: 'sweets',
        description: 'Rich almonds, cashews, pistachios, and dates with zero added sugar.',
        price: 600,
        unit: '500g',
        image_url: 'https://images.unsplash.com/photo-1599487484177-6c62445d568a?auto=format&fit=crop&w=600&q=80',
        badge: 'No Added Sugar',
        tags: '100% Nuts',
        is_featured: 0
    },
    {
        id: 8,
        name: 'Nuvvundalu (నువ్వుండలు)',
        category: 'sweets',
        description: 'Traditional sesame seed and organic jaggery laddus.',
        price: 250,
        unit: '500g',
        image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
        badge: 'Classic',
        tags: 'Sesame',
        is_featured: 0
    },
    {
        id: 9,
        name: 'Sunnundalu (సున్నుండలు)',
        category: 'sweets',
        description: 'Classic roasted urad dal and pure ghee laddus.',
        price: 320,
        unit: '500g',
        image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
        badge: 'Signature',
        tags: 'Pure Ghee',
        is_featured: 0
    }
];

// Set your EC2/Backend API URL here once deployed (e.g., 'https://api.yourdomain.com'), or leave empty '' for same-origin
const API_BASE_URL = '';

document.addEventListener('DOMContentLoaded', () => {
    let products = [];
    let cart = JSON.parse(localStorage.getItem('chaitanya_cart_v2')) || [];

    const dryFruitsGrid = document.getElementById('dryFruitsGrid');
    const sweetsGrid = document.getElementById('sweetsGrid');
    const moreSweetsGrid = document.getElementById('moreSweetsGrid');
    const cartCount = document.getElementById('cartCount');
    const cartModal = document.getElementById('cartModal');
    const checkoutModal = document.getElementById('checkoutModal');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartTotalPrice = document.getElementById('cartTotalPrice');

    // 3D Interactive Tilt on Hero Pedestal
    const heroStage = document.getElementById('heroStage');
    const pedestal = document.querySelector('.stage-pedestal');
    if (heroStage && pedestal) {
        heroStage.addEventListener('mousemove', (e) => {
            const rect = heroStage.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            pedestal.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 16}deg)`;
        });
        heroStage.addEventListener('mouseleave', () => {
            pedestal.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    }

    async function loadProducts() {
        try {
            const res = await fetch(`${API_BASE_URL}/api/products`);
            if (!res.ok) throw new Error('API unavailable');
            const data = await res.json();
            products = Array.isArray(data) && data.length > 0 ? data : FALLBACK_PRODUCTS;
        } catch (err) {
            products = FALLBACK_PRODUCTS;
        }
        renderAll();
    }

    function renderAll() {
        dryFruitsGrid.innerHTML = '';
        sweetsGrid.innerHTML = '';
        moreSweetsGrid.innerHTML = '';

        products.forEach(p => {
            if (p.category === 'dry_fruits') {
                dryFruitsGrid.appendChild(buildFeaturedCard(p));
            } else if (p.category === 'sweets' && p.is_featured) {
                sweetsGrid.appendChild(buildFeaturedCard(p));
            } else {
                moreSweetsGrid.appendChild(buildMiniCard(p));
            }
        });
        updateCartUI();
    }

    function buildFeaturedCard(p) {
        const tagsHtml = (p.tags || '')
            .split(',')
            .filter(Boolean)
            .map(t => `<span class="tag-pill">${t.trim()}</span>`)
            .join('');

        const card = document.createElement('div');
        card.className = 'product-card-3d';
        card.innerHTML = `
            <div class="product-thumb-3d">
                ${p.badge ? `<span class="badge-3d">${p.badge}</span>` : ''}
                <img src="${p.image_url}" alt="${p.name}">
            </div>
            <div class="product-details">
                <h3>${p.name}</h3>
                <p>${p.description}</p>
                <div class="tag-list">${tagsHtml}</div>
                <div class="product-bottom">
                    <div class="price-tag">₹${p.price} <span>/ ${p.unit}</span></div>
                    <button class="add-btn-3d" onclick="addToCart(${p.id})">
                        <i class="fa-solid fa-plus"></i> Add
                    </button>
                </div>
            </div>
        `;
        return card;
    }

    function buildMiniCard(p) {
        const card = document.createElement('div');
        card.className = 'mini-card-3d';
        card.innerHTML = `
            <div class="mini-avatar-3d">
                <img src="${p.image_url}" alt="${p.name}">
            </div>
            <h4>${p.name}</h4>
            <div class="mini-unit">${p.unit}</div>
            <div class="mini-bottom">
                <div class="price-tag">₹${p.price}</div>
                <button class="add-btn-3d" onclick="addToCart(${p.id})">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        `;
        return card;
    }

    window.addToCart = (id) => {
        const item = products.find(p => p.id === id);
        if (!item) return;
        const existing = cart.find(c => c.id === id);
        if (existing) existing.quantity += 1;
        else cart.push({ ...item, quantity: 1 });
        saveCart();
        updateCartUI();
        cartModal.classList.add('active');
    };

    window.changeQty = (id, delta) => {
        const idx = cart.findIndex(c => c.id === id);
        if (idx === -1) return;
        cart[idx].quantity += delta;
        if (cart[idx].quantity <= 0) cart.splice(idx, 1);
        saveCart();
        updateCartUI();
    };

    function saveCart() {
        localStorage.setItem('chaitanya_cart_v2', JSON.stringify(cart));
    }

    function updateCartUI() {
        const count = cart.reduce((acc, i) => acc + i.quantity, 0);
        cartCount.textContent = count;

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:2rem;">Your basket is empty. Add fresh sweets or dry fruits!</p>';
            cartTotalPrice.textContent = '₹0';
            return;
        }

        let total = 0;
        cartItemsList.innerHTML = cart.map(item => {
            total += item.price * item.quantity;
            return `
                <div class="cart-row">
                    <div>
                        <strong>${item.name}</strong>
                        <div style="font-size:0.85rem;color:var(--text-muted);">₹${item.price} × ${item.quantity}</div>
                    </div>
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                        <strong>${item.quantity}</strong>
                        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                    </div>
                </div>
            `;
        }).join('');
        cartTotalPrice.textContent = `₹${total}`;
    }

    document.getElementById('cartToggleBtn').addEventListener('click', () => cartModal.classList.add('active'));
    document.getElementById('closeCartBtn').addEventListener('click', () => cartModal.classList.remove('active'));
    document.getElementById('closeCheckoutBtn').addEventListener('click', () => checkoutModal.classList.remove('active'));

    document.getElementById('checkoutBtn').addEventListener('click', () => {
        if (cart.length === 0) return alert('Please add items to your basket first.');
        document.getElementById('orderType').value = 'instant';
        document.getElementById('modalOrderTitle').textContent = 'Complete Your Order';
        cartModal.classList.remove('active');
        checkoutModal.classList.add('active');
    });

    document.getElementById('openAdvanceModalBtn').addEventListener('click', () => {
        document.getElementById('orderType').value = 'advance';
        document.getElementById('modalOrderTitle').textContent = 'Book Advance Sweet Order';
        checkoutModal.classList.add('active');
    });

    document.getElementById('checkoutForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const customer_name = document.getElementById('customerName').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();
        const address = document.getElementById('customerAddress').value.trim();
        const order_type = document.getElementById('orderType').value;
        const total_amount = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

        try {
            const res = await fetch(`${API_BASE_URL}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customer_name, phone, address, items: cart, total_amount, order_type })
            });
            if (!res.ok) throw new Error('Backend offline');
            alert('Order confirmed! Chaitanya Lakshmi will contact you shortly.');
            cart = [];
            saveCart();
            updateCartUI();
            checkoutModal.classList.remove('active');
            e.target.reset();
        } catch (err) {
            // WhatsApp fallback if static Amplify site isn't connected to EC2 backend yet
            const summary = cart.length
                ? cart.map(i => `${i.name} (${i.quantity})`).join(', ')
                : 'Advance Sweet Enquiry';
            const waText = encodeURIComponent(`Namaste Chaitanya Foods!
Name: ${customer_name}
Phone: ${phone}
Type: ${order_type.toUpperCase()}
Items: ${summary}
Address/Notes: ${address}`);
            window.open(`https://wa.me/919381331281?text=${waText}`, '_blank');
            checkoutModal.classList.remove('active');
        }
    });

    loadProducts();
});
