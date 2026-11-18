# Chaitanya Foods - Modern E-Commerce Platform

A fully functional, modern e-commerce web application for **Chaitanya Foods** (Fresh Dry Fruits & Traditional Telugu Sweets), inspired by Figma 3D aesthetic designs and matching your brand identity.

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MySQL (using `mysql2`)
- **Frontend:** HTML5, CSS3 (3D shadows, glassmorphism, responsive grid), Vanilla JavaScript

## Prerequisites
- Node.js installed
- MySQL Server installed and running

## Setup & Installation Instructions

1. **Database Setup:**
   - Open your MySQL terminal or Workbench.
   - Run the SQL queries provided in `database.sql` to create the database, products table, orders table, and sample products.

2. **Configure Environment:**
   - Create a `.env` file in the root directory with the following variables:
     ```env
     PORT=3000
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=your_mysql_password
     DB_NAME=chaitanya_foods_db
     ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Start the Server:**
   ```bash
   npm start
   ```

5. **Open in Browser:**
   - Navigate to `http://localhost:3000`
