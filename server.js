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

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'chaitanya_foods_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection()
    .then(conn => {
        console.log('Connected to MySQL Database successfully!');
        conn.release();
    })
    .catch(err => {
        console.warn('MySQL connection warning (client catalog fallback active):', err.message);
    });

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
        const { customer_name, phone, address, items, order_type } = req.body;
        const [result] = await pool.query(
            'INSERT INTO orders (customer_name, phone, address, items, order_type) VALUES (?, ?, ?, ?, ?)',
            [customer_name, phone, address, JSON.stringify(items), order_type || 'instant']
        );
        res.status(201).json({ success: true, orderId: result.insertId, message: 'Order request received!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Chaitanya Foods server running on http://localhost:${PORT}`);
});
