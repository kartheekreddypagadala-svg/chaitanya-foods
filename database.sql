CREATE DATABASE IF NOT EXISTS chaitanya_foods_db;
USE chaitanya_foods_db;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT,
    price_label VARCHAR(100) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    image_url VARCHAR(508),
    badge VARCHAR(50),
    tags VARCHAR(255),
    is_featured BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    items JSON NOT NULL,
    order_type ENUM('instant', 'advance') DEFAULT 'instant',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, category, subtitle, description, price_label, unit, image_url, badge, tags, is_featured) VALUES
('CASHEW NUTS', 'dry_fruits', 'Direct from Factory', 'Premium quality cashews, freshly packed, direct from factory. Full cashew, cashew pieces, and pot roasted cashews are available at affordable prices.', 'Ask for Today''s Price', '250g / 500g / 1kg', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80', 'Factory Direct', 'Full Cashew,Cashew Pieces,Pot Roasted Cashews', TRUE),
('ALMONDS', 'dry_fruits', 'Multiple Sizes Available', 'Best quality almonds of multiple sizes, freshly packed. Roasted almonds are also available.', 'Ask for Today''s Price', '250g / 500g / 1kg', 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=600&q=80', 'Best Quality', 'Multiple Sizes,Roasted Almonds', TRUE),
('POOTHA REKULU', 'sweets', '4 Authentic Varieties Available', 'Sugar Pootharekulu, Jaggery Pootharekulu, Sugar Dry Fruit Pootharekulu, and Jaggery Dry Fruit Pootharekulu are available.', 'Ask for Price', 'Box of 10 / 20', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80', 'Traditional', 'Sugar Pootharekulu,Jaggery Pootharekulu,Sugar Dry Fruit Pootharekulu,Jaggery Dry Fruit Pootharekulu', TRUE),
('BOBBATLU (బొబ్బట్లు)', 'sweets', 'NETI BOBBATLU AVAILABLE', 'Each piece of Bobbatlu is made with the finest ingredients and pure ghee (Neti Bobbatlu) to ensure that every bite is a burst of flavor.', 'Ask for Price', 'Pack of 5 / 10', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80', 'Neti Bobbatlu', 'Neti Bobbatlu Available,Pure Ghee', TRUE),
('ARISELU', 'sweets', 'Traditional Sweet', 'Crispy golden traditional rice flour and pure jaggery ariselu.', 'Ask for Price', '250g / 500g / 1kg', 'https://images.unsplash.com/photo-1599487484177-6c62445d568a?auto=format&fit=crop&w=600&q=80', 'Freshly Made', 'Jaggery & Rice', FALSE),
('RAAGI LADDU', 'sweets', 'Nutritious Millet Sweet', 'Healthy and delicious raagi laddus made with pure ghee and jaggery.', 'Ask for Price', '250g / 500g / 1kg', 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80', 'Healthy', 'Raagi & Pure Ghee', FALSE),
('DRY FRUIT LADDU', 'sweets', 'Rich Nuts & Dates', 'Power-packed laddus loaded with premium cashews, almonds, pistachios, and dates.', 'Ask for Price', '250g / 500g / 1kg', 'https://images.unsplash.com/photo-1599487484177-6c62445d568a?auto=format&fit=crop&w=600&q=80', 'Premium', '100% Dry Fruits', FALSE),
('NUVVUNDALU', 'sweets', 'Sesame & Jaggery', 'Traditional roasted sesame seeds (nuvvulu) and pure jaggery laddus.', 'Ask for Price', '250g / 500g / 1kg', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80', 'Classic', 'Sesame & Jaggery', FALSE),
('SUNNUNDALU', 'sweets', 'Pure Ghee Special', 'Authentic roasted urad dal and pure ghee sunnundalu.', 'Ask for Price', '250g / 500g / 1kg', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80', 'Signature', 'Urad Dal & Ghee', FALSE);
