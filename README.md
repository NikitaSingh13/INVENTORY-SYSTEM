# 📦 Inventory Management System

A modern, full-stack inventory management application built with React and Node.js. Features real-time analytics, product management, and a responsive UI with smooth animations.

🔗 **Live Demo:** [https://inventory-system-gamma-khaki.vercel.app/](https://inventory-system-gamma-khaki.vercel.app/)

📚 **Detailed Documentation:** [View DOCUMENTATION.md](./DOCUMENTATION.md)

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)

---

## ✨ Features

- 📊 **Dashboard Analytics** - Real-time inventory value, stock monitoring, and alerts
- 🛍️ **Product Management** - Full CRUD operations with search, filter, and sort
- 📝 **Stock History** - Complete audit trail of all product changes
- 📱 **Responsive Design** - Works seamlessly on mobile, tablet, and desktop

---

## 🛠️ Tech Stack

**Frontend:** React 19.2, Vite 7.2, Custom CSS  
**Backend:** Node.js, Express 5.2, MongoDB, Mongoose 9.1  
**Architecture:** MVC Pattern, RESTful API, Component-Based UI

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account (free tier)

### Installation

**1. Clone and Navigate**
```bash
git clone <repository-url>
cd INVENTORY-SYSTEM
```

**2. Backend Setup**
```bash
cd server
npm install
```

Create `.env` file in `server` directory:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/inventory
PORT=5000
NODE_ENV=development
```

Start server:
```bash
npm start
# Runs at http://localhost:5000
```

**3. Frontend Setup** (new terminal)
```bash
cd client
npm install
npm run dev
# Runs at http://localhost:5173
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Get all products |
| `POST` | `/api/products` | Create product |
| `PUT` | `/api/products/:id` | Update product |
| `DELETE` | `/api/products/:id` | Delete product |
| `GET` | `/api/products/analytics` | Get dashboard stats |
| `GET` | `/api/products/stock-history` | Get activity log |
| `GET` | `/api/health` | Health check |

**Request Body Example:**
```json
{
  "name": "Laptop",
  "sku": "LAP-001",
  "price": 999.99,
  "stock": 50,
  "minStock": 10
}
```

---

## 📁 Project Structure

```
INVENTORY-SYSTEM/
├── client/              # React frontend
│   └── src/
│       ├── components/  # Reusable components
│       ├── pages/       # Page components
│       ├── services/    # API integration
│       └── styles/      # CSS files
└── server/              # Node.js backend
    ├── config/          # Database config
    ├── controllers/     # Business logic
    ├── models/          # Data schemas
    └── routes/          # API routes
```

---

## 🚢 Deployment

**Frontend:** Deployed on [Vercel](https://vercel.com)  
**Backend:** Deployed on Render 
**Database:** MongoDB Atlas (Cloud)

See [DOCUMENTATION.md](./DOCUMENTATION.md) for detailed deployment instructions.

---

## 🎓 What This Project Demonstrates

✅ Full-stack JavaScript development  
✅ RESTful API design  
✅ MongoDB database modeling  
✅ React hooks and state management  
✅ Responsive web design  
✅ Error handling and validation  

---

## 📚 Learn More

For in-depth technical details, architecture explanations, and interview preparation notes, see:
- [Full Documentation](./DOCUMENTATION.md)
- Architecture & Data Flow
- Database Schema Details
- Design Patterns Used
- Performance Optimizations
- Testing Strategies

---

## 📝 License

Open source - Available for educational purposes

---

**Built with ❤️ | January 2026**
