# 📦 Inventory Management System

A full-stack inventory management system built with React and Node.js, featuring real-time analytics, search/filter capabilities, and a modern responsive UI.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)

## ✨ Features

- **Dashboard Analytics** - Real-time inventory value, stock level monitoring, and visual statistics
- **Product Management** - Full CRUD operations with search, filter, and sort functionality
- **Stock History** - Complete audit trail of all stock changes with timestamps
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop devices

## 🛠️ Tech Stack

**Frontend:** React 19.2, Vite 7.2, Custom CSS with animations  
**Backend:** Node.js, Express 5.2, CORS  
**Architecture:** MVC pattern, RESTful API, Component-based UI

## ⚖️ Key Technical Decisions

### In-Memory Storage
Uses array-based storage for zero configuration and fast operations. Perfect for demos but data resets on server restart. Production would use PostgreSQL/MongoDB.

### Custom CSS
Built with vanilla CSS instead of UI frameworks for complete design control, smaller bundle size (~50KB vs 200KB+), and to demonstrate CSS expertise with animations and responsive design.

### Client-Side Filtering
Implements search/filter/sort on the client for instant response and better UX. Suitable for small-medium datasets. Large datasets would need server-side pagination.

### Vite Build Tool
Chosen over Create React App for 10x faster build times, lightning-fast HMR, and smaller production bundles.

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation & Running

```bash
# Clone repository
git clone <repository-url>
cd INVENTORY-SYSTEM

# Install and start backend
cd server
npm install
npm start          # Runs on http://localhost:5000

# Install and start frontend (new terminal)
cd client
npm install
npm run dev        # Runs on http://localhost:5173
```

## 📡 API Endpoints

```
GET    /api/products              - Get all products
POST   /api/products              - Create product
PUT    /api/products/:id          - Update product
DELETE /api/products/:id          - Delete product
GET    /api/products/analytics    - Get statistics
GET    /api/products/stock-history - Get audit log
```

## 🎯 For Recruiters

**Demonstrates:**
- Modern React with hooks (useState, useEffect)
- RESTful API design and Express middleware
- Responsive CSS with animations and gradients
- MVC architecture and separation of concerns
- Error handling and form validation
- Clean, maintainable code structure

**Time Investment:** ~20 hours  
**Lines of Code:** ~1,500

---

Built as a full-stack development showcase project | January 2026
