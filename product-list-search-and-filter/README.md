Build a Product List with Search & Filter

Requirements:

Show a list of products

Each product has:

{ id, name, category, price }

Features:

🔍 Search by product name

🏷 Filter by category

💰 Sort by price (low → high)

Constraints:

React only (no Redux)

No UI library (plain CSS ok)

Clean, readable code

Sample Data (We’ll use this)
const products = [
  { id: 1, name: "iPhone", category: "Mobile", price: 800 },
  { id: 2, name: "Samsung Galaxy", category: "Mobile", price: 700 },
  { id: 3, name: "MacBook", category: "Laptop", price: 1500 },
  { id: 4, name: "HP Laptop", category: "Laptop", price: 1200 },
];
Folder Structure (Interview Friendly)
src/
 ├── components/
 │    ├── ProductList.jsx
 │    ├── Filters.jsx
 │    └── ProductCard.jsx
 ├── data.js
 └── App.jsx