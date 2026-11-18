require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Database Connection Pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'chaitanya_foods_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test DB Connection
pool.getConnection()
    .then(connection => {
        console.log('Connected to MySQL Database successfully!');
        connection.release();
    })
    .catch(err => {
        console.error('Database connection failed:', err.message);
    });

// API Routes
app.get('/api/products', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const { customer_name, phone, address, items, total_amount, order_type } = req.body;
        const [result] = await pool.query(
            'INSERT INTO orders (customer_name, phone, address, items, total_amount, order_type) VALUES (?, ?, ?, ?, ?, ?)',
            [customer_name, phone, address, JSON.stringify(items), total_amount, order_type || 'instant']
        );
        res.status(201).json({ success: true, orderId: result.insertId, message: 'Order placed successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Chaitanya Foods server is running on http://localhost:${PORT}`);
});
