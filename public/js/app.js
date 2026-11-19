```javascript
const CLIENT_PRODUCTS = [
    {
        id: 1,
        name: 'CASHEW NUTS',
        category: 'dry_fruits',
        subtitle: 'Direct From Factory • Affordable Prices',
        description: 'Premium quality cashews, freshly packed, direct from factory. Full cashew, cashew pieces, and pot roasted cashews are available at affordable prices.',
        packs: ['250g', '500g', '1 kg', 'Bulk Order'],
        image_url: 'images/cashew-nuts.jpg',
        badge: 'Factory Direct',
        tags: 'Full Cashew,Cashew Pieces,Pot Roasted Cashews',
        is_featured: 1
    },
    {
        id: 2,
        name: 'ALMONDS',
        category: 'dry_fruits',
        subtitle: 'Multiple Sizes & Roasted Available',
        description: 'Best quality almonds of multiple sizes, freshly packed. Roasted almonds are also available.',
        packs: ['250g', '500g', '1 kg', 'Bulk Order'],
        image_url: 'images/almonds.jpg',
        badge: 'Best Quality',
        tags: 'Multiple Sizes,Roasted Almonds',
        is_featured: 1
    },
    {
        id: 3,
        name: 'POOTHA REKULU',
        category: 'sweets',
        subtitle: '4 Traditional Varieties Available',
        description: 'Sugar Pootharekulu, Jaggery Pootharekulu, Sugar Dry Fruit Pootharekulu, and Jaggery Dry Fruit Pootharekulu are available.',
        packs: ['Box of 10', 'Box of 20', 'Function Pack'],
        image_url: 'images/pootha-rekulu.jpg',
        badge: '4 Varieties',
        tags: 'Sugar Pootharekulu,Jaggery Pootharekulu,Sugar Dry Fruit Pootharekulu,Jaggery Dry Fruit Pootharekulu',
        is_featured: 1
    },
    {
        id: 4,
        name: 'BOBBATLU (బొబ్బట్లు)',
        category: 'sweets',
        subtitle: 'NETI BOBBATLU AVAILABLE',
        description: 'Each piece of Bobbatlu is made with the finest ingredients to ensure that every bite is a burst of flavor.',
        packs: ['5 pcs', '10 pcs', '25 pcs (Advance)'],
        image_url: 'images/bobbatlu.jpg',
        badge: 'Neti Bobbatlu',
        tags: 'Neti Bobbatlu Available,Pure Ghee',
        is_featured: 1
    },
    {
        id: 5,
        name: 'ARISELU',
        category: 'sweets',
        subtitle: 'Traditional Sweet',
        description: 'Crispy golden traditional rice flour and pure jaggery ariselu.',
        packs: ['250g', '500g', '1 kg'],
        image_url: 'images/ariselu.jpg',
        badge: 'Freshly Packed',
        tags: 'Traditional',
        is_featured: 0
    },
    {
        id: 6,
        name: 'RAAGI LADDU',
        category: 'sweets',
        subtitle: 'Healthy Millet Sweet',
        description: 'Wholesome raagi laddus prepared with pure ghee and jaggery.',
        packs: ['250g', '500g', '1 kg'],
        image_url: 'images/raagi-laddu.jpg',
        badge: 'Healthy',
        tags: 'Raagi & Ghee',
        is_featured: 0
    },
    {
        id: 7,
        name: 'DRY FRUIT LADDU',
        category: 'sweets',
        subtitle: 'Rich Nuts & Dates',
        description: 'Loaded with premium cashews, almonds, pistachios, and dates.',
        packs: ['250g', '500g', '1 kg'],
        image_url: 'images/dry-fruit-laddu.jpg',
        badge: 'Premium',
        tags: '100% Dry Fruits',
        is_featured: 0
    },
    {
        id: 8,
        name: 'NUVVUNDALU',
        category: 'sweets',
        subtitle: 'Sesame & Jaggery',
        description: 'Crunchy roasted sesame seed and organic jaggery laddus.',
        packs: ['250g', '500g', '1 kg'],
        image_url: 'images/nuvvundalu.jpg',
        badge: 'Classic',
        tags: 'Sesame',
        is_featured: 0
    },
    {
        id: 9,
        name: 'SUNNUNDALU',
        category: 'sweets',
        subtitle: 'Pure Ghee Special',
        description: 'Melt-in-the-mouth roasted urad dal and pure ghee laddus.',
        packs: ['250g', '500g', '1 kg'],
        image_url: 'images/sunnundalu.jpg',
        badge: 'Signature',
        tags: 'Urad Dal & Ghee',
        is_featured: 0
    }
];

const API_BASE_URL = '';

document.addEventListener('DOMContentLoaded', () => {
    let products = [];
    let cart = JSON.parse(localStorage.getItem('chaitanya_client_basket_v3')) || [];
    const selectedVariants = {};

    const dryFruitsGrid = document.getElementById('dryFruitsGrid');
    const sweetsGrid = document.getElementById('sweetsGrid');
    const moreSweetsGrid = document.getElementById('moreSweetsGrid');
    const cartCount = document.getElementById('cartCount');
    const cartModal = document.getElementById('cartModal');
    const checkoutModal = document.getElementById('checkoutModal');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartTotalItems = document.getElementById('cartTotalItems');

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
            products = Array.isArray(data) && data.length > 0
                ? data.map(item => ({
                    ...item,
                    packs: item.packs || ['250g', '500g', '1 kg']
                }))
                : CLIENT_PRODUCTS;
        } catch (err) {
            products = CLIENT_PRODUCTS;
        }

        products.forEach(p => {
            const firstTag = (p.tags || '').split(',').map(t => t.trim()).filter(Boolean)[0] || '';
            selectedVariants[p.id] = firstTag;
        });

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

    window.selectVariant = (productId, tag, btnEl) => {
        selectedVariants[productId] = tag;
        const parent = btnEl.parentElement;
        parent.querySelectorAll('.tag-pill').forEach(el => el.classList.remove('active'));
        btnEl.classList.add('active');
    };

    function buildFeaturedCard(p) {
        const tags = (p.tags || '').split(',').map(t => t.trim()).filter(Boolean);
        const tagsHtml = tags
            .map((t, idx) => `<button type="button" class="tag-pill ${idx === 0 ? 'active' : ''}" onclick="selectVariant(${p.id}, '${t.replace(/'/g, "\\'")}', this)">${t}</button>`)
            .join('');

        const packsOptions = (p.packs || ['250g', '500g', '1 kg'])
            .map(pk => `<option value="${pk}">${pk}</option>`)
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
                <div class="product-subtitle">${p.subtitle || ''}</div>
                <p>${p.description}</p>
                <div class="tag-list">${tagsHtml}</div>
                <div class="product-bottom">
                    <select class="pack-select" id="pack-${p.id}" aria-label="Select Pack Size">
                        ${packsOptions}
                    </select>
                    <button class="add-btn-3d" onclick="addToCart(${p.id})">
                        <i class="fa-solid fa-plus"></i> Add to Order
                    </button>
                </div>
            </div>
        `;
        return card;
    }

    function buildMiniCard(p) {
        const packsOptions = (p.packs || ['250g', '500g', '1 kg'])
            .map(pk => `<option value="${pk}">${pk}</option>`)
            .join('');

        const card = document.createElement('div');
        card.className = 'mini-card-3d';
        card.innerHTML = `
            <div class="mini-avatar-3d">
                <img src="${p.image_url}" alt="${p.name}">
            </div>
            <h4>${p.name}</h4>
            <div class="mini-unit">${p.subtitle || 'Traditional Sweet'}</div>
            <div class="mini-bottom">
                <select class="pack-select" id="pack-${p.id}" aria-label="Select Pack Size">
                    ${packsOptions}
                </select>
                <button class="add-btn-3d" onclick="addToCart(${p.id})">
                    <i class="fa-solid fa-plus"></i> Add
                </button>
            </div>
        `;
        return card;
    }

    window.addToCart = (id) => {
        const item = products.find(p => p.id === id);
        if (!item) return;

        const packEl = document.getElementById(`pack-${id}`);
        const chosenPack = packEl ? packEl.value : '500g';
        const chosenVariant = selectedVariants[id] || '';
        const basketKey = `${id}__${chosenVariant}__${chosenPack}`;

        const existing = cart.find(c => c.basketKey === basketKey);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({
                basketKey,
                id: item.id,
                name: item.name,
                variant: chosenVariant,
                pack: chosenPack,
                quantity: 1
            });
        }
        saveCart();
        updateCartUI();
        cartModal.classList.add('active');
    };

    window.changeQty = (basketKey, delta) => {
        const idx = cart.findIndex(c => c.basketKey === basketKey);
        if (idx === -1) return;
        cart[idx].quantity += delta;
        if (cart[idx].quantity <= 0) cart.splice(idx, 1);
        saveCart();
        updateCartUI();
    };

    function saveCart() {
        localStorage.setItem('chaitanya_client_basket_v3', JSON.stringify(cart));
    }

    function updateCartUI() {
        const count = cart.reduce((acc, i) => acc + i.quantity, 0);
        cartCount.textContent = count;
        cartTotalItems.textContent = `${count} ${count === 1 ? 'pack' : 'packs'}`;

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:2rem;">Your order list is empty. Select dry fruits or traditional sweets to order!</p>';
            return;
        }

        cartItemsList.innerHTML = cart.map(item => {
            const detailLabel = [item.variant, item.pack].filter(Boolean).join(' • ');
            return `
                <div class="cart-row">
                    <div>
                        <strong>${item.name}</strong>
                        <div style="font-size:0.82rem;color:var(--text-muted);">${detailLabel}</div>
                    </div>
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="changeQty('${item.basketKey.replace(/'/g, "\\'")}', -1)">-</button>
                        <strong>${item.quantity}</strong>
                        <button class="qty-btn" onclick="changeQty('${item.basketKey.replace(/'/g, "\\'")}', 1)">+</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    document.getElementById('cartToggleBtn').addEventListener('click', () => cartModal.classList.add('active'));
    document.getElementById('closeCartBtn').addEventListener('click', () => cartModal.classList.remove('active'));
    document.getElementById('closeCheckoutBtn').addEventListener('click', () => checkoutModal.classList.remove('active'));

    document.getElementById('checkoutBtn').addEventListener('click', () => {
        if (cart.length === 0) return alert('Please add items to your order list first.');
        document.getElementById('orderType').value = 'instant';
        document.getElementById('modalOrderTitle').textContent = 'Send Order to Chaitanya Foods';
        cartModal.classList.remove('active');
        checkoutModal.classList.add('active');
    });

    document.getElementById('openAdvanceModalBtn').addEventListener('click', () => {
        document.getElementById('orderType').value = 'advance';
        document.getElementById('modalOrderTitle').textContent = 'Advance Sweet Order (ముందస్తు ఆర్డర్)';
        checkoutModal.classList.add('active');
    });

    const openGiftingModalBtn = document.getElementById('openGiftingModalBtn');
    if (openGiftingModalBtn) {
        openGiftingModalBtn.addEventListener('click', () => {
            document.getElementById('orderType').value = 'advance';
            document.getElementById('modalOrderTitle').textContent = 'Bulk / Event Gifting Order';
            checkoutModal.classList.add('active');
        });
    }

    document.getElementById('checkoutForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const customer_name = document.getElementById('customerName').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();
        const address = document.getElementById('customerAddress').value.trim();
        const order_type = document.getElementById('orderType').value;

        try {
            await fetch(`${API_BASE_URL}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customer_name, phone, address, items: cart, order_type })
            });
        } catch (err) {
            // Continue smoothly to WhatsApp order dispatch
        }

        const itemLines = cart.length
            ? cart.map((i, idx) => `${idx + 1}. ${i.name} (${[i.variant, i.pack].filter(Boolean).join(', ')}) x ${i.quantity}`).join('\n')
            : 'Advance Sweet Order Enquiry';

        const waMessage = `Namaste Chaitanya Lakshmi (Chaitanya Foods)!\n\n*Order Type:* ${order_type === 'advance' ? 'ADVANCE ORDER' : 'FRESH HOME DELIVERY ORDER'}\n*Name:* ${customer_name}\n*Phone:* ${phone}\n\n*Items Requested:*\n${itemLines}\n\n*Address / Notes:* ${address}\n\nPlease confirm availability and today's price.`;

        window.open(`https://wa.me/919381331281?text=${encodeURIComponent(waMessage)}`, '_blank');
        cart = [];
        saveCart();
        updateCartUI();
        checkoutModal.classList.remove('active');
        e.target.reset();
    });

    loadProducts();
});
```[cite: 69]
