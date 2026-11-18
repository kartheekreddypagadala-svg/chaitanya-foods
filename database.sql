CREATE DATABASE IF NOT EXISTS chaitanya_foods_db;
USE chaitanya_foods_db;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    image_url VARCHAR(508),
    badge VARCHAR(50),
    is_featured BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    items JSON NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    order_type ENUM('instant', 'advance') DEFAULT 'instant',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, category, description, price, unit, image_url, badge, is_featured) VALUES
('Cashew Nuts (W320)', 'dry_fruits', 'Premium quality cashews, freshly packed and direct from the factory at affordable prices.', 750.00, '500g', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80', 'Best Seller', TRUE),
('Mamra Almonds', 'dry_fruits', 'Fresh, quality almonds, available in multiple sizes. Roasted almonds also available.', 850.00, '500g', 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=600&q=80', 'Fresh', TRUE),
('Pootha Rekulu', 'sweets', 'Thin sheets of rice batter rolled around a sweet filling. Choose your favourite kind.', 400.00, 'Box of 10', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80', 'Traditional', TRUE),
('Bobbatlu (Bhakshalu)', 'sweets', 'Each piece is made with the finest ingredients, so every bite is full of flavour.', 350.00, '5 pcs', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80', 'Special', TRUE),
('Ariselu', 'sweets', 'Crispy and delicious traditional jaggery rice sweets.', 300.00, '500g', 'https://images.unsplash.com/photo-1599487484177-6c62445d568a?auto=format&fit=crop&w=600&q=80', 'Festive', FALSE),
('Ragi Laddu', 'sweets', 'Healthy and nutritious ragi laddus prepared with pure ghee and jaggery.', 280.00, '500g', 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80', 'Healthy', FALSE),
('Dry Fruit Laddu', 'sweets', 'Loaded with rich almonds, cashews, pistachios, and dates without added sugar.', 600.00, '500g', 'https://images.unsplash.com/photo-1599487484177-6c62445d568a?auto=format&fit=crop&w=600&q=80', 'Premium', FALSE),
('Nuvvundalu', 'sweets', 'Traditional sesame seed and jaggery nutritious balls.', 250.00, '500g', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80', 'Crunchy', FALSE),
('Sunnundalu', 'sweets', 'Classic urad dal and jaggery ghee laddus melting in the mouth.', 320.00, '500g', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80', 'Classic', FALSE);
