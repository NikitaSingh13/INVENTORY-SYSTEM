# 📦 Inventory Management System

A modern, full-stack inventory management application built with React and Node.js. Features real-time analytics, product management, and a responsive UI with smooth animations.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)

---

## ✨ Features

### 📊 Dashboard Analytics
- Real-time inventory value calculation
- Product count and stock monitoring
- Low stock alerts
- Visual statistics with status indicators

### 🛍️ Product Management
- **Create** - Add new products with validation
- **Read** - View all products in organized table
- **Update** - Edit existing product details
- **Delete** - Remove products with confirmation
- **Search** - Real-time product search
- **Filter** - Filter by stock status (All, In Stock, Low Stock, Out of Stock)
- **Sort** - Sort by name, price, or stock quantity

### 📝 Stock History
- Complete audit trail of all product operations
- Timestamps for every action
- Track product changes over time

### 📱 Responsive Design
- Mobile-first approach
- Hamburger menu for mobile devices
- Smooth animations and transitions
- Works seamlessly on all screen sizes

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2** - Latest version with modern hooks
- **Vite 7.2** - Lightning-fast build tool
- **Custom CSS** - No UI frameworks, pure CSS3
- **ES Modules** - Modern JavaScript module system

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.2** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 9.1** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing

### Architecture
- **MVC Pattern** - Model-View-Controller architecture
- **RESTful API** - Standard HTTP methods
- **Component-Based UI** - Reusable React components
- **Service Layer** - Separated API logic

---

## 📁 Project Structure

```
INVENTORY-SYSTEM/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ProductForm.jsx      - Form for add/edit products
│   │   │   ├── ProductTable.jsx     - Table display with actions
│   │   │   └── StatusBadge.jsx      - Stock status indicator
│   │   ├── pages/            # Page-level components
│   │   │   ├── DashboardPage.jsx    - Analytics overview
│   │   │   ├── ProductsPage.jsx     - Product management
│   │   │   └── StockHistoryPage.jsx - Activity log
│   │   ├── services/         # API integration
│   │   │   └── productApi.js        - API calls
│   │   ├── styles/           # CSS files
│   │   │   └── app.css              - Global styles
│   │   ├── App.jsx           # Root component with routing
│   │   └── main.jsx          # Entry point
│   ├── package.json
│   └── vite.config.js
│
└── server/                    # Backend Node.js application
    ├── config/
    │   └── database.js       # MongoDB connection
    ├── controllers/
    │   └── productController.js  - Business logic
    ├── models/
    │   ├── Product.js        # Product schema
    │   └── StockHistory.js   # History schema
    ├── routes/
    │   └── products.js       # API routes
    ├── server.js             # Entry point
    ├── package.json
    └── .env                  # Environment variables
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB Atlas account** (free tier works)

### Installation

**1. Clone the repository**
```bash
git clone <repository-url>
cd INVENTORY-SYSTEM
```

**2. Set up Backend**
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/inventory?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

Start the backend server:
```bash
npm start
```
Server runs at: `http://localhost:5000`

**3. Set up Frontend** (in a new terminal)
```bash
cd client
npm install
npm run dev
```
App runs at: `http://localhost:5173`

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/products` | Get all products | - |
| `POST` | `/products` | Create new product | `{ name, sku, price, stock, minStock }` |
| `PUT` | `/products/:id` | Update product | `{ name?, price?, stock?, minStock? }` |
| `DELETE` | `/products/:id` | Delete product | - |
| `GET` | `/products/analytics` | Get dashboard stats | - |
| `GET` | `/products/stock-history` | Get activity log | - |
| `GET` | `/health` | Health check | - |

### Example Requests

**Create Product**
```javascript
POST /api/products
Content-Type: application/json

{
  "name": "Laptop",
  "sku": "LAP-001",
  "price": 999.99,
  "stock": 50,
  "minStock": 10
}
```

**Update Product**
```javascript
PUT /api/products/507f1f77bcf86cd799439011
Content-Type: application/json

{
  "price": 899.99,
  "stock": 45
}
```

---

## 🎯 Key Technical Highlights

### 1. Modern React Practices
- **Hooks-based** - useState, useEffect for state management
- **Component composition** - Reusable, maintainable components
- **Props drilling avoided** - Clean data flow
- **Conditional rendering** - Dynamic UI updates

### 2. MongoDB Integration
- **Mongoose ODM** - Schema validation and virtuals
- **Timestamps** - Automatic createdAt/updatedAt
- **Virtuals** - Computed stockStatus property
- **Indexes** - Optimized queries
- **Error handling** - Comprehensive validation

### 3. RESTful API Design
- **HTTP verbs** - GET, POST, PUT, DELETE
- **Status codes** - Proper 200, 201, 400, 404, 500
- **Error responses** - Consistent JSON format
- **Middleware** - CORS, body parsing, error handling
- **Route organization** - Modular structure

### 4. User Experience
- **Real-time search** - Instant filtering
- **Optimistic updates** - UI updates before server response
- **Loading states** - Better UX feedback
- **Error messages** - User-friendly alerts
- **Form validation** - Client and server-side

### 5. Performance Optimizations
- **Vite** - Fast HMR and optimized builds
- **CSS-only animations** - No JavaScript overhead
- **Efficient re-renders** - Proper state management
- **MongoDB indexes** - Fast queries

---

## 🏗️ Architecture & Data Flow

### Client-Side Flow
```
User Action
    ↓
React Component (onClick/onSubmit)
    ↓
Service Layer (productApi.js)
    ↓
Fetch API Request
    ↓
Backend API
    ↓
Response
    ↓
State Update (useState)
    ↓
Component Re-render
    ↓
Updated UI
```

### Server-Side Flow
```
HTTP Request
    ↓
Express Middleware (CORS, JSON parser)
    ↓
Route Handler (routes/products.js)
    ↓
Controller (productController.js)
    ↓
Model (Product.js, StockHistory.js)
    ↓
MongoDB Database
    ↓
Response
    ↓
Client
```

### Database Schema

**Product Model**
```javascript
{
  name: String (required, max 100 chars),
  sku: String (required, unique, uppercase),
  price: Number (required, min 0),
  stock: Number (required, min 0),
  minStock: Number (required, min 0),
  stockStatus: Virtual (computed),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**StockHistory Model**
```javascript
{
  productId: ObjectId (ref: Product),
  productName: String,
  action: String (CREATED/UPDATED/DELETED),
  changes: Object,
  timestamp: Date (auto)
}
```

---

## 🎨 Design Features

### CSS Highlights
- **Gradient backgrounds** - Modern visual appeal
- **Smooth transitions** - 0.3s ease for all interactions
- **Hover effects** - Interactive buttons and cards
- **Responsive grid** - Adapts to screen size
- **Glass morphism** - Card effects with backdrop blur
- **Mobile menu** - Pure CSS hamburger animation

### Color Palette
- Primary: `#667eea` (Purple gradient)
- Secondary: `#764ba2` (Deep purple)
- Success: `#10b981` (Green)
- Warning: `#f59e0b` (Orange)
- Danger: `#ef4444` (Red)
- Neutral: `#f9fafb` (Light gray)

---

## 🧪 Testing the Application

### Manual Testing Checklist

**Dashboard**
- [ ] View total products count
- [ ] View total inventory value
- [ ] View low stock count
- [ ] Verify calculations are accurate

**Products Page**
- [ ] Add new product
- [ ] Edit existing product
- [ ] Delete product
- [ ] Search products
- [ ] Filter by stock status
- [ ] Sort by name/price/stock

**Stock History**
- [ ] View all activities
- [ ] Check timestamps
- [ ] Verify action types

---

## 🚢 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Upload dist/ folder
```

### Backend (Heroku/Railway)
```bash
cd server
# Set environment variables in hosting platform
# Deploy via Git or CLI
```

### Environment Variables
```env
# Production
MONGO_URI=<production-mongodb-url>
PORT=5000
NODE_ENV=production
```

---

## 🔐 Security Considerations

- **Input validation** - Mongoose schema validation
- **SKU uniqueness** - Duplicate prevention
- **Error handling** - No sensitive data in responses
- **CORS configured** - Controlled cross-origin requests
- **Environment variables** - Secrets not in code

---

## 📈 Future Enhancements

- [ ] User authentication (JWT)
- [ ] Role-based access control
- [ ] Export data to CSV/Excel
- [ ] Email notifications for low stock
- [ ] Barcode scanner integration
- [ ] Multi-warehouse support
- [ ] Advanced analytics dashboard
- [ ] Purchase order management
- [ ] Supplier management
- [ ] Image upload for products

---

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ Full-stack JavaScript development
- ✅ RESTful API design and implementation
- ✅ MongoDB database modeling
- ✅ React state management and hooks
- ✅ Responsive web design
- ✅ Error handling and validation
- ✅ Code organization and architecture
- ✅ Version control with Git

---

## 👨‍💻 Author

Built as a portfolio project to showcase full-stack development skills.

**Technologies Mastered:**
- Modern React development
- Node.js backend architecture
- MongoDB database design
- RESTful API patterns
- Responsive UI/UX design

---

## 📝 License

This project is open source and available for educational purposes.

---

**Last Updated:** January 2026
