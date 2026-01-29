# 📚 Inventory Management System - Technical Documentation

Complete technical documentation and architecture details.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Project Structure](#project-structure)
3. [Data Flow](#data-flow)
4. [Database Schema](#database-schema)
5. [Frontend Architecture](#frontend-architecture)
6. [Backend Architecture](#backend-architecture)
7. [Key Features Implementation](#key-features-implementation)
8. [Security & Performance](#security--performance)
9. [Deployment](#deployment)

---

## Architecture Overview

### System Design

```
┌─────────────────────────────────────────┐
│          Client (React + Vite)          │
│  - Components (Dashboard, Products)     │
│  - Service Layer (API calls)            │
└──────────────┬──────────────────────────┘
               │ HTTP/JSON
┌──────────────▼──────────────────────────┐
│       Server (Node.js + Express)        │
│  - Routes (API endpoints)               │
│  - Controllers (Business logic)         │
│  - Models (Data schemas)                │
└──────────────┬──────────────────────────┘
               │ Mongoose
┌──────────────▼──────────────────────────┐
│         Database (MongoDB)              │
│  - products collection                  │
│  - stockhistories collection            │
└─────────────────────────────────────────┘
```

### Tech Stack

**Frontend**
- React 19.2 with hooks
- Vite for fast builds
- Pure CSS3 (no frameworks)

**Backend**
- Node.js + Express 5.2
- Mongoose ODM
- RESTful API design

**Database**
- MongoDB Atlas (Cloud)
- Schema validation
- Indexes for performance

---

## Project Structure

```
INVENTORY-SYSTEM/
│
├── client/                    # Frontend
│   └── src/
│       ├── components/        # Reusable UI components
│       │   ├── ProductForm.jsx
│       │   ├── ProductTable.jsx
│       │   └── StatusBadge.jsx
│       ├── pages/             # Page components
│       │   ├── DashboardPage.jsx
│       │   ├── ProductsPage.jsx
│       │   └── StockHistoryPage.jsx
│       ├── services/          # API calls
│       │   └── productApi.js
│       ├── styles/            # CSS
│       │   └── app.css
│       └── App.jsx            # Root component
│
└── server/                    # Backend
    ├── config/
    │   └── database.js        # MongoDB connection
    ├── controllers/
    │   └── productController.js
    ├── models/
    │   ├── Product.js
    │   └── StockHistory.js
    ├── routes/
    │   └── products.js
    └── server.js              # Entry point
```

---

## Data Flow

### Request-Response Cycle

```
User Action
    ↓
React Component (ProductForm/ProductsPage)
    ↓
Service Layer (productApi.js)
    ↓
HTTP Request (POST/GET/PUT/DELETE)
    ↓
Express Middleware (CORS, JSON Parser)
    ↓
Routes (products.js)
    ↓
Controller (productController.js)
    ↓
Model (Product.js / StockHistory.js)
    ↓
MongoDB Database
    ↓
Response
    ↓
Update React State
    ↓
Re-render UI
```

### State Management

- **Local State**: useState for component data
- **Props**: Pass data down to children
- **No Redux**: App is small enough for local state

---

## Database Schema

### Product Model

```javascript
{
  name: String (required, max 100 chars),
  sku: String (required, unique, uppercase),
  price: Number (required, min 0),
  stock: Number (required, min 0),
  minStock: Number (required, min 0),
  stockStatus: Virtual (computed: in-stock/low-stock/out-of-stock),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Indexes:**
- `sku` - unique index for fast lookups

**Virtual Property:**
```javascript
stockStatus: 
  - 'out-of-stock' if stock === 0
  - 'low-stock' if stock <= minStock
  - 'in-stock' otherwise
```

### StockHistory Model

```javascript
{
  productId: ObjectId (ref: Product),
  productName: String,
  change: Number,
  oldStock: Number,
  newStock: Number,
  changeType: String (INITIAL/INCREASE/DECREASE/UPDATE),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Indexes:**
- `productId` - query by product
- `createdAt` - time-based sorting

---

## Frontend Architecture

### Component Hierarchy

```
App.jsx
├── DashboardPage.jsx
│   └── (displays analytics)
│
├── ProductsPage.jsx
│   ├── ProductForm.jsx (when adding/editing)
│   └── ProductTable.jsx
│       └── StatusBadge.jsx (for each product)
│
└── StockHistoryPage.jsx
    └── (displays history table)
```

### Key Hooks Used

```javascript
// State management
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [searchTerm, setSearchTerm] = useState('');

// Side effects
useEffect(() => {
  fetchProducts();
}, []);
```

### Client-Side Operations

**Search:** Filter by name or SKU
```javascript
products.filter(p => 
  p.name.toLowerCase().includes(searchTerm) ||
  p.sku.toLowerCase().includes(searchTerm)
)
```

**Filter:** By stock status
```javascript
products.filter(p => {
  if (status === 'out-of-stock') return p.stock === 0;
  if (status === 'low-stock') return p.stock <= p.minStock;
  if (status === 'in-stock') return p.stock > p.minStock;
})
```

**Sort:** By name, price, or stock
```javascript
products.sort((a, b) => {
  if (sortBy === 'name') return a.name.localeCompare(b.name);
  if (sortBy === 'price') return a.price - b.price;
  if (sortBy === 'stock') return a.stock - b.stock;
})
```

---

## Backend Architecture

### Express App Structure

```javascript
// server.js
app.use(cors());                    // Cross-origin
app.use(express.json());            // Parse JSON
app.use('/api/products', routes);   // Mount routes
app.use(errorHandler);              // Error handling
```

### Controller Functions

**Create Product**
1. Validate input
2. Check SKU uniqueness
3. Create product in DB
4. Log stock history
5. Return new product

**Update Product**
1. Find existing product
2. Validate changes
3. Update in DB
4. Log stock change (if any)
5. Return updated product

**Delete Product**
1. Find product
2. Delete from DB
3. Return success message

**Get Analytics**
1. Fetch all products
2. Calculate totals
3. Find low stock items
4. Return statistics

---

## Key Features Implementation

### 1. CRUD Operations

**Create:** POST /api/products
- Validates all fields
- Ensures SKU uniqueness
- Creates product and logs history

**Read:** GET /api/products
- Returns all products
- Sorted by creation date

**Update:** PUT /api/products/:id
- Validates changes
- Logs stock changes
- Returns updated product

**Delete:** DELETE /api/products/:id
- Removes product
- Returns success message

### 2. Search & Filter

**Real-time Search:**
- Implemented client-side
- Filters as user types
- Searches name and SKU

**Stock Status Filter:**
- All Products
- In Stock (stock > minStock)
- Low Stock (stock <= minStock)
- Out of Stock (stock === 0)

### 3. Dashboard Analytics

**Calculations:**
- Total Products Count
- Total Inventory Value (price × stock)
- Low Stock Count
- Out of Stock Count

**Low Stock Alerts:**
- Lists products needing restock
- Shows current stock levels

### 4. Stock History

**Tracking:**
- Logs every product creation
- Logs every stock change
- Records old and new values
- Timestamps each change

---

## Security & Performance

### Security Measures

**Input Validation:**
- Client-side (UX feedback)
- Server-side (actual security)
- Schema-level (database integrity)

**Data Protection:**
- Environment variables for secrets
- No sensitive data in responses
- CORS configured properly

**Error Handling:**
- Proper HTTP status codes
- User-friendly messages
- No stack traces in production

### Performance Optimizations

**Frontend:**
- Vite for fast builds
- CSS animations (no JS overhead)
- Efficient re-renders

**Backend:**
- Database indexes
- Connection pooling
- Efficient queries

**Database:**
- Indexes on frequently queried fields
- Virtual properties for computed data
- Proper schema design

---

## Deployment

### Frontend (Vercel)

```bash
cd client
npm run build
vercel --prod
```

**Environment Variables:**
```
VITE_API_BASE_URL=https://your-backend.com/api
```

### Backend (Render/Railway)

**Environment Variables:**
```
MONGO_URI=mongodb+srv://...
PORT=5000
NODE_ENV=production
```

**Deploy:** Connect Git repo and push

### Database (MongoDB Atlas)

1. Create free cluster
2. Whitelist IP addresses
3. Create database user
4. Get connection string
5. Add to .env file

---

## API Reference

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
| GET | `/api/products/analytics` | Get statistics |
| GET | `/api/products/stock-history` | Get history |
| GET | `/api/health` | Health check |

### Request Examples

**Create Product:**
```json
POST /api/products
{
  "name": "Laptop",
  "sku": "LAP-001",
  "price": 999.99,
  "stock": 50,
  "minStock": 10
}
```

**Update Product:**
```json
PUT /api/products/507f1f77bcf86cd799439011
{
  "price": 899.99,
  "stock": 45
}
```

### Response Format

**Success:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Laptop",
  "sku": "LAP-001",
  "price": 999.99,
  "stock": 50,
  "minStock": 10,
  "createdAt": "2026-01-29T10:00:00.000Z",
  "updatedAt": "2026-01-29T10:00:00.000Z"
}
```

**Error:**
```json
{
  "message": "SKU must be unique"
}
```

---

## Technologies Deep Dive

### Why These Choices?

**React 19.2**
- Latest stable version
- Modern hooks API
- Efficient virtual DOM

**Vite**
- 10x faster than CRA
- Instant HMR
- Optimized builds

**Custom CSS**
- Full control
- Smaller bundle
- No dependencies

**MongoDB**
- Flexible schema
- JSON-like documents
- Easy scaling

**Express**
- Lightweight
- Large ecosystem
- Industry standard

---

**Last Updated:** January 2026  
**License:** Open Source - Educational Use
