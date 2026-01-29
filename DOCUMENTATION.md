# 📚 Inventory Management System - Technical Documentation

Complete technical documentation, architecture details, and interview preparation guide.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Detailed Project Structure](#detailed-project-structure)
3. [Data Flow & System Design](#data-flow--system-design)
4. [Database Schema Deep Dive](#database-schema-deep-dive)
5. [Frontend Architecture](#frontend-architecture)
6. [Backend Architecture](#backend-architecture)
7. [Design Patterns & Best Practices](#design-patterns--best-practices)
8. [Performance Optimizations](#performance-optimizations)
9. [Security Implementation](#security-implementation)
10. [Testing Strategies](#testing-strategies)
11. [Deployment Guide](#deployment-guide)
12. [Interview Preparation](#interview-preparation)

---

## Architecture Overview

### System Architecture

This is a **full-stack JavaScript application** following the **MVC (Model-View-Controller)** pattern with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                      │
│  ┌────────────────────────────────────────────────┐    │
│  │  React Components (View)                        │    │
│  │  - Dashboard, Products, Stock History          │    │
│  └────────────────┬───────────────────────────────┘    │
│                   │                                      │
│  ┌────────────────▼───────────────────────────────┐    │
│  │  Service Layer (productApi.js)                 │    │
│  │  - API calls, HTTP requests                    │    │
│  └────────────────┬───────────────────────────────┘    │
└───────────────────┼──────────────────────────────────────┘
                    │ HTTP/JSON
                    │
┌───────────────────▼──────────────────────────────────────┐
│                    SERVER (Node.js)                      │
│  ┌────────────────────────────────────────────────┐    │
│  │  Express Middleware                             │    │
│  │  - CORS, Body Parser, Error Handler            │    │
│  └────────────────┬───────────────────────────────┘    │
│                   │                                      │
│  ┌────────────────▼───────────────────────────────┐    │
│  │  Routes (routes/products.js)                   │    │
│  │  - Endpoint definitions                         │    │
│  └────────────────┬───────────────────────────────┘    │
│                   │                                      │
│  ┌────────────────▼───────────────────────────────┐    │
│  │  Controllers (productController.js)            │    │
│  │  - Business logic, validation                  │    │
│  └────────────────┬───────────────────────────────┘    │
│                   │                                      │
│  ┌────────────────▼───────────────────────────────┐    │
│  │  Models (Product.js, StockHistory.js)         │    │
│  │  - Mongoose schemas, virtuals                  │    │
│  └────────────────┬───────────────────────────────┘    │
└───────────────────┼──────────────────────────────────────┘
                    │ MongoDB Driver
                    │
┌───────────────────▼──────────────────────────────────────┐
│              DATABASE (MongoDB Atlas)                    │
│  - Products Collection                                   │
│  - StockHistories Collection                            │
└──────────────────────────────────────────────────────────┘
```

### Technology Decisions & Rationale

#### **Why React 19.2?**
- Latest stable version with improved performance
- Modern hooks API (useState, useEffect, custom hooks)
- Virtual DOM for efficient updates
- Component reusability and maintainability
- Large ecosystem and community support

#### **Why Vite over Create React App?**
- **10x faster dev server** - Native ESM, no bundling in dev
- **Instant HMR** - Hot Module Replacement in milliseconds
- **Optimized builds** - Rollup for production, better tree-shaking
- **Smaller bundle size** - Only includes what's needed
- **Better DX** - Faster feedback loop during development

#### **Why Custom CSS?**
- **Complete control** - No framework limitations
- **Smaller bundle** - ~50KB vs 200KB+ for frameworks
- **Learning demonstration** - Shows CSS3 expertise
- **No dependencies** - Reduces security vulnerabilities
- **Performance** - No runtime JavaScript for styles

#### **Why MongoDB?**
- **Schema flexibility** - Easy to evolve data models
- **JSON-like documents** - Natural fit for JavaScript
- **Horizontal scaling** - Sharding for growth
- **Rich query language** - Complex aggregations
- **Atlas free tier** - Easy cloud deployment

#### **Why Express 5.x?**
- **Lightweight** - Minimal overhead
- **Flexible** - Unopinionated framework
- **Middleware ecosystem** - Vast plugin selection
- **Industry standard** - Well-documented, mature
- **Performance** - Fast request handling

---

## Detailed Project Structure

```
INVENTORY-SYSTEM/
│
├── client/                           # Frontend React Application
│   ├── public/                       # Static assets
│   │   └── vite.svg                 # Vite logo
│   │
│   ├── src/
│   │   ├── assets/                  # Images, fonts, static files
│   │   │
│   │   ├── components/              # Reusable UI Components
│   │   │   ├── ProductForm.jsx      # Add/Edit product form
│   │   │   │   - Handles create & update operations
│   │   │   │   - Client-side validation
│   │   │   │   - Controlled form inputs
│   │   │   │
│   │   │   ├── ProductTable.jsx     # Product list table
│   │   │   │   - Display all products
│   │   │   │   - Edit/Delete actions
│   │   │   │   - Responsive design
│   │   │   │
│   │   │   └── StatusBadge.jsx      # Stock status indicator
│   │   │       - Visual stock level display
│   │   │       - Color-coded badges
│   │   │       - Dynamic status calculation
│   │   │
│   │   ├── pages/                   # Page-Level Components
│   │   │   ├── DashboardPage.jsx    # Analytics overview
│   │   │   │   - Total products count
│   │   │   │   - Inventory value calculation
│   │   │   │   - Low stock alerts
│   │   │   │   - Statistics cards
│   │   │   │
│   │   │   ├── ProductsPage.jsx     # Product management
│   │   │   │   - CRUD operations
│   │   │   │   - Search functionality
│   │   │   │   - Filter by status
│   │   │   │   - Sort options
│   │   │   │
│   │   │   └── StockHistoryPage.jsx # Activity log
│   │   │       - Audit trail
│   │   │       - Timestamp display
│   │   │       - Change tracking
│   │   │
│   │   ├── services/                # API Integration Layer
│   │   │   └── productApi.js        # HTTP requests to backend
│   │   │       - getProducts()
│   │   │       - createProduct()
│   │   │       - updateProduct()
│   │   │       - deleteProduct()
│   │   │       - getAnalytics()
│   │   │       - getStockHistory()
│   │   │
│   │   ├── styles/                  # CSS Stylesheets
│   │   │   └── app.css              # Global styles
│   │   │       - CSS variables
│   │   │       - Component styles
│   │   │       - Responsive breakpoints
│   │   │       - Animations
│   │   │
│   │   ├── App.jsx                  # Root component
│   │   │   - Navigation logic
│   │   │   - Page routing
│   │   │   - Hamburger menu
│   │   │
│   │   ├── main.jsx                 # Entry point
│   │   │   - React root rendering
│   │   │   - StrictMode wrapper
│   │   │
│   │   └── index.css                # Base CSS reset
│   │
│   ├── .gitignore                   # Git ignore rules
│   ├── eslint.config.js             # ESLint configuration
│   ├── index.html                   # HTML template
│   ├── package.json                 # Dependencies & scripts
│   └── vite.config.js               # Vite configuration
│
├── server/                           # Backend Node.js Application
│   ├── config/
│   │   └── database.js              # MongoDB connection
│   │       - Connection error handling
│   │       - Retry logic
│   │       - Event listeners
│   │
│   ├── controllers/
│   │   └── productController.js     # Business logic
│   │       - getAllProducts()
│   │       - createProduct()
│   │       - updateProduct()
│   │       - deleteProduct()
│   │       - getAnalytics()
│   │       - getStockHistory()
│   │
│   ├── models/
│   │   ├── Product.js               # Product schema
│   │   │   - Schema definition
│   │   │   - Validators
│   │   │   - Virtual properties
│   │   │   - Indexes
│   │   │
│   │   └── StockHistory.js          # Stock history schema
│   │       - Change tracking
│   │       - Static methods
│   │       - Timestamps
│   │
│   ├── routes/
│   │   └── products.js              # API route definitions
│   │       - Route handlers
│   │       - HTTP method mapping
│   │       - URL structure
│   │
│   ├── .env                         # Environment variables (gitignored)
│   ├── .gitignore                   # Git ignore rules
│   ├── package.json                 # Dependencies & scripts
│   └── server.js                    # Express app entry point
│       - Middleware setup
│       - Route mounting
│       - Error handlers
│       - Server startup
│
└── README.md                         # Quick start guide
```

---

## Data Flow & System Design

### Complete Request-Response Cycle

#### **1. CREATE Product Flow**

```
┌──────────────────────────────────────────────────────────┐
│ USER INTERACTION                                         │
└──────────────────────────────────────────────────────────┘
  │
  │ 1. User fills form and clicks "Add Product"
  │
  ▼
┌──────────────────────────────────────────────────────────┐
│ ProductForm.jsx                                          │
├──────────────────────────────────────────────────────────┤
│ - Validate form inputs (client-side)                    │
│ - Build product object: { name, sku, price, stock, ... }│
│ - Call onSubmit prop → handleAddProduct()               │
└──────────────────────────────────────────────────────────┘
  │
  ▼
┌──────────────────────────────────────────────────────────┐
│ ProductsPage.jsx (handleAddProduct)                     │
├──────────────────────────────────────────────────────────┤
│ - Call createProduct(productData) from service layer    │
└──────────────────────────────────────────────────────────┘
  │
  ▼
┌──────────────────────────────────────────────────────────┐
│ productApi.js (createProduct)                           │
├──────────────────────────────────────────────────────────┤
│ - Build HTTP request                                     │
│ - POST to http://localhost:5000/api/products            │
│ - Headers: Content-Type: application/json               │
│ - Body: JSON.stringify(productData)                     │
└──────────────────────────────────────────────────────────┘
  │
  │ HTTP POST Request over network
  │
  ▼
┌──────────────────────────────────────────────────────────┐
│ Express Middleware Stack                                 │
├──────────────────────────────────────────────────────────┤
│ 1. CORS middleware → Allow cross-origin                 │
│ 2. express.json() → Parse JSON body                     │
│ 3. express.urlencoded() → Parse URL-encoded data        │
└──────────────────────────────────────────────────────────┘
  │
  ▼
┌──────────────────────────────────────────────────────────┐
│ routes/products.js                                       │
├──────────────────────────────────────────────────────────┤
│ - Match route: POST /api/products                       │
│ - Call: productController.createProduct                 │
└──────────────────────────────────────────────────────────┘
  │
  ▼
┌──────────────────────────────────────────────────────────┐
│ productController.js (createProduct)                    │
├──────────────────────────────────────────────────────────┤
│ 1. Extract data from req.body                           │
│ 2. Validate required fields                             │
│ 3. Check for negative values                            │
│ 4. Check SKU uniqueness                                 │
│ 5. Create product: Product.create({...})                │
│ 6. Log stock history                                    │
│ 7. Return product: res.status(201).json(newProduct)    │
└──────────────────────────────────────────────────────────┘
  │
  ▼
┌──────────────────────────────────────────────────────────┐
│ models/Product.js (Mongoose)                            │
├──────────────────────────────────────────────────────────┤
│ - Apply schema validation                               │
│ - Convert SKU to uppercase                              │
│ - Set timestamps (createdAt, updatedAt)                 │
│ - Save to MongoDB                                       │
└──────────────────────────────────────────────────────────┘
  │
  ▼
┌──────────────────────────────────────────────────────────┐
│ MongoDB Database                                         │
├──────────────────────────────────────────────────────────┤
│ - Insert document into "products" collection            │
│ - Generate _id                                          │
│ - Return saved document                                 │
└──────────────────────────────────────────────────────────┘
  │
  ▼
┌──────────────────────────────────────────────────────────┐
│ models/StockHistory.js                                  │
├──────────────────────────────────────────────────────────┤
│ - Log initial stock: StockHistory.logChange()          │
│ - Record: productId, name, change: +stock, newStock    │
└──────────────────────────────────────────────────────────┘
  │
  │ Response flows back through the stack
  │
  ▼
┌──────────────────────────────────────────────────────────┐
│ HTTP Response: 201 Created                               │
├──────────────────────────────────────────────────────────┤
│ Body: { _id, name, sku, price, stock, minStock, ... }  │
└──────────────────────────────────────────────────────────┘
  │
  ▼
┌──────────────────────────────────────────────────────────┐
│ productApi.js (response handling)                       │
├──────────────────────────────────────────────────────────┤
│ - Parse JSON response                                    │
│ - Return data to caller                                 │
└──────────────────────────────────────────────────────────┘
  │
  ▼
┌──────────────────────────────────────────────────────────┐
│ ProductsPage.jsx                                        │
├──────────────────────────────────────────────────────────┤
│ - Close form: setShowForm(false)                       │
│ - Refresh list: fetchProducts()                         │
└──────────────────────────────────────────────────────────┘
  │
  ▼
┌──────────────────────────────────────────────────────────┐
│ React Re-render                                          │
├──────────────────────────────────────────────────────────┤
│ - State updated with new product                        │
│ - Virtual DOM diff                                      │
│ - Update real DOM                                       │
│ - Display new product in table                          │
└──────────────────────────────────────────────────────────┘
```

### State Management Strategy

**Local Component State (useState)**
- Form inputs
- Loading states
- Error messages
- UI toggles (show/hide)

**Prop Drilling Pattern**
```jsx
App.jsx (Navigation state)
  └── ProductsPage.jsx (Products state, CRUD operations)
       ├── ProductForm.jsx (Form state, validation)
       └── ProductTable.jsx (Table display, actions)
```

**Why No Redux/Context?**
- Small app scope
- No deep prop drilling issues
- Simple data flow
- Easier to understand and maintain

---

## Database Schema Deep Dive

### Product Schema

```javascript
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,                           // Remove whitespace
      maxlength: [100, 'Name too long'],
    },
    sku: {
      type: String,
      required: [true, 'SKU is required'],
      unique: true,                          // Database index
      trim: true,
      uppercase: true,                       // Auto-uppercase
      maxlength: [50, 'SKU too long'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    stock: {
      type: Number,
      required: [true, 'Stock is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    minStock: {
      type: Number,
      required: [true, 'Min stock is required'],
      min: [0, 'Min stock cannot be negative'],
      default: 0,
    },
  },
  {
    timestamps: true,                        // Auto createdAt, updatedAt
    toJSON: { virtuals: true },             // Include virtuals in JSON
    toObject: { virtuals: true },
  }
);
```

**Virtual Property - Stock Status**
```javascript
productSchema.virtual('stockStatus').get(function () {
  if (this.stock === 0) return 'out-of-stock';
  if (this.stock <= this.minStock) return 'low-stock';
  return 'in-stock';
});
```

**Why Virtuals?**
- Computed on-the-fly
- Not stored in database
- Always accurate
- Reduces data redundancy

### StockHistory Schema

```javascript
const stockHistorySchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',                       // Reference to Product
      required: true,
      index: true,                          // Query optimization
    },
    productName: String,                    // Denormalized for performance
    change: Number,                         // Stock delta (+/-)
    oldStock: Number,
    newStock: Number,
    changeType: {
      type: String,
      enum: ['INITIAL', 'INCREASE', 'DECREASE', 'UPDATE'],
    },
  },
  { timestamps: true }
);

// Compound index for efficient queries
stockHistorySchema.index({ productId: 1, createdAt: -1 });
stockHistorySchema.index({ createdAt: -1 });
```

**Static Method - Log Changes**
```javascript
stockHistorySchema.statics.logChange = async function (
  productId,
  productName,
  oldStock,
  newStock
) {
  const change = newStock - oldStock;
  
  let changeType = 'UPDATE';
  if (oldStock === 0 && newStock > 0) changeType = 'INITIAL';
  else if (change > 0) changeType = 'INCREASE';
  else if (change < 0) changeType = 'DECREASE';

  return await this.create({
    productId,
    productName,
    change,
    oldStock,
    newStock,
    changeType,
  });
};
```

### Database Indexes

**Why Indexes Matter:**
- **Faster queries** - O(log n) vs O(n) without index
- **Unique constraints** - Enforce data integrity
- **Sort optimization** - Pre-sorted data structure

**Indexes Used:**
1. `sku: unique` - Fast SKU lookups, prevent duplicates
2. `productId: 1` - Fast history queries by product
3. `createdAt: -1` - Efficient time-based sorting

---

## Frontend Architecture

### Component Hierarchy

```
App.jsx (Root)
├── Navigation State
├── Page Router
│
├── DashboardPage.jsx
│   ├── Fetch analytics data
│   ├── Display stat cards
│   │   ├── Total Products
│   │   ├── Inventory Value
│   │   ├── Low Stock Count
│   │   └── Out of Stock Count
│   └── Low Stock Alert List
│
├── ProductsPage.jsx
│   ├── Products State
│   ├── Search/Filter/Sort State
│   ├── Form Toggle State
│   │
│   ├── ProductForm.jsx (Conditional)
│   │   ├── Form Input State
│   │   ├── Validation
│   │   ├── Submit Handler
│   │   └── Cancel Handler
│   │
│   └── Product Catalog
│       ├── Search Input
│       ├── Filter Dropdown
│       ├── Sort Dropdown
│       └── ProductTable.jsx
│           ├── Map through products
│           └── For each product:
│               ├── Display row
│               ├── StatusBadge.jsx
│               ├── Edit Button
│               └── Delete Button
│
└── StockHistoryPage.jsx
    ├── Fetch history data
    └── Display table
        └── Map through history records
```

### React Hooks Usage

**useState - Component State**
```javascript
// Example from ProductsPage.jsx
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [searchTerm, setSearchTerm] = useState('');
const [filterStatus, setFilterStatus] = useState('all');
const [sortOption, setSortOption] = useState('name-asc');
```

**useEffect - Side Effects**
```javascript
// Fetch data on component mount
useEffect(() => {
  fetchProducts();
}, []); // Empty dependency array = run once

// Example with dependencies
useEffect(() => {
  // Re-run when searchTerm changes
  filterProducts();
}, [searchTerm]);
```

### Client-Side Filtering & Sorting

**Search Implementation**
```javascript
const filtered = products.filter((product) => {
  const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
  const skuMatch = product.sku.toLowerCase().includes(searchTerm.toLowerCase());
  return nameMatch || skuMatch;
});
```

**Filter by Status**
```javascript
const byStatus = filtered.filter((product) => {
  if (filterStatus === 'all') return true;
  if (filterStatus === 'out-of-stock') return product.stock === 0;
  if (filterStatus === 'low-stock') {
    return product.stock > 0 && product.stock <= product.minStock;
  }
  if (filterStatus === 'in-stock') return product.stock > product.minStock;
  return true;
});
```

**Sort Products**
```javascript
const sorted = [...byStatus].sort((a, b) => {
  switch (sortOption) {
    case 'name-asc': return a.name.localeCompare(b.name);
    case 'name-desc': return b.name.localeCompare(a.name);
    case 'price-asc': return a.price - b.price;
    case 'price-desc': return b.price - a.price;
    case 'stock-asc': return a.stock - b.stock;
    case 'stock-desc': return b.stock - a.stock;
    default: return 0;
  }
});
```

**Why Client-Side?**
- Instant response (no network delay)
- Better UX for small datasets
- Reduces server load
- Works offline after initial fetch

**When to Move Server-Side?**
- Dataset > 1000 items
- Mobile performance issues
- Need pagination
- Advanced search requirements

---

## Backend Architecture

### Express Middleware Stack

```javascript
// server.js
app.use(cors({ origin: "*" }));           // 1. CORS
app.use(express.json());                   // 2. JSON parser
app.use(express.urlencoded({ extended: true })); // 3. URL-encoded

app.use("/api/products", productRoutes);   // 4. Route mounting

app.use((req, res) => {                    // 5. 404 handler
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {         // 6. Error handler
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});
```

### Controller Pattern

**Separation of Concerns**
- **Routes** - Define endpoints, HTTP methods
- **Controllers** - Business logic, validation
- **Models** - Data structure, database operations

**Example: Create Product**
```javascript
const createProduct = async (req, res) => {
  try {
    // 1. Extract data
    const { name, sku, price, stock, minStock } = req.body;

    // 2. Validate
    if (!name || !sku || price == null || stock == null || minStock == null) {
      return res.status(400).json({ message: 'All fields required' });
    }

    // 3. Business rules
    if (price < 0 || stock < 0 || minStock < 0) {
      return res.status(400).json({ message: 'No negative values' });
    }

    // 4. Check uniqueness
    const exists = await Product.findOne({ sku: sku.toUpperCase() });
    if (exists) {
      return res.status(400).json({ message: 'SKU must be unique' });
    }

    // 5. Create in database
    const product = await Product.create({ name, sku, price, stock, minStock });

    // 6. Side effect - log history
    await StockHistory.logChange(product._id, product.name, 0, stock);

    // 7. Response
    res.status(201).json(product);
    
  } catch (error) {
    // 8. Error handling
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to create product' });
  }
};
```

### Error Handling Strategy

**Types of Errors:**
1. **Validation Errors** - 400 Bad Request
2. **Not Found** - 404 Not Found
3. **Conflict** - 400 (duplicate SKU)
4. **Server Errors** - 500 Internal Server Error

**Error Response Format:**
```json
{
  "message": "Human-readable error message",
  "error": "Technical details (dev mode only)"
}
```

---

## Design Patterns & Best Practices

### 1. MVC Pattern

**Model** - Data structure and business rules
```javascript
// Product.js
const productSchema = new mongoose.Schema({ ... });
```

**View** - React components (UI)
```jsx
// ProductsPage.jsx
return <div>...</div>;
```

**Controller** - Business logic
```javascript
// productController.js
const createProduct = async (req, res) => { ... };
```

### 2. Repository Pattern

**Service Layer** - Abstracts API calls
```javascript
// productApi.js
export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  return response.json();
};
```

**Benefits:**
- Easier to test
- Can swap backends
- Centralized error handling
- Consistent API interface

### 3. Component Composition

**Container/Presentational Pattern**
```jsx
// ProductsPage.jsx (Container - Smart)
- Manages state
- Handles logic
- Fetches data

// ProductForm.jsx (Presentational - Dumb)
- Receives props
- Displays UI
- Emits events
```

### 4. Prop Drilling vs Context

**Current Approach: Prop Drilling**
```jsx
<ProductForm 
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  productToEdit={editingProduct}
/>
```

**When to Use Context:**
- Deeply nested components (5+ levels)
- Widely shared data (theme, auth)
- Frequent updates needed globally

### 5. Error Boundaries (Future)

```jsx
class ErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    // Log error
    console.error(error, info);
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

---

## Performance Optimizations

### Frontend Optimizations

**1. Vite Build Optimizations**
- Tree-shaking unused code
- Code splitting (lazy loading)
- Minification
- Asset optimization

**2. React Optimizations**
```javascript
// Memoization (if needed in future)
const MemoizedComponent = React.memo(ProductTable);

// Expensive calculations
const totalValue = useMemo(() => {
  return products.reduce((sum, p) => sum + p.price * p.stock, 0);
}, [products]);

// Callback stability
const handleDelete = useCallback((id) => {
  deleteProduct(id);
}, []);
```

**3. CSS Optimizations**
- Pure CSS animations (no JavaScript)
- Hardware-accelerated transforms
- Efficient selectors
- No inline styles (better caching)

### Backend Optimizations

**1. Database Indexes**
```javascript
// Fast lookups
productSchema.index({ sku: 1 });
stockHistorySchema.index({ productId: 1, createdAt: -1 });
```

**2. Query Optimization**
```javascript
// Only select needed fields
Product.find().select('name sku price');

// Limit results
StockHistory.find().limit(50);

// Sort efficiently (uses index)
Product.find().sort({ createdAt: -1 });
```

**3. Connection Pooling**
- Mongoose handles automatically
- Reuses connections
- Reduces overhead

---

## Security Implementation

### Input Validation

**Client-Side (First Line)**
```javascript
// ProductForm.jsx
if (!name.trim()) {
  alert('Name is required');
  return;
}
if (price < 0) {
  alert('Price cannot be negative');
  return;
}
```

**Server-Side (Always Required)**
```javascript
// productController.js
if (!name || !sku || price == null) {
  return res.status(400).json({ message: 'Required fields missing' });
}
```

**Mongoose Schema (Database Level)**
```javascript
price: {
  type: Number,
  required: [true, 'Price is required'],
  min: [0, 'Price cannot be negative'],
}
```

### XSS Prevention

**React Auto-Escapes**
```jsx
<div>{product.name}</div>  // Safe - React escapes HTML
```

**Dangerous (Avoid)**
```jsx
<div dangerouslySetInnerHTML={{__html: userInput}} />  // Unsafe!
```

### CORS Configuration

```javascript
app.use(cors({
  origin: "*",  // Development
  // origin: "https://yourapp.com",  // Production
}));
```

### Environment Variables

```env
# .env (NEVER commit to Git)
MONGO_URI=mongodb+srv://...
PORT=5000
NODE_ENV=development
```

**Why?**
- Secrets not in code
- Different configs per environment
- Easy to change without redeployment

---

## Testing Strategies

### Manual Testing Checklist

**Product CRUD**
- [ ] Create product with valid data
- [ ] Create product with invalid data (negative price)
- [ ] Create product with duplicate SKU
- [ ] Update product successfully
- [ ] Update with invalid data
- [ ] Delete product
- [ ] Verify stock history logging

**Search & Filter**
- [ ] Search by product name
- [ ] Search by SKU
- [ ] Filter by In Stock
- [ ] Filter by Low Stock
- [ ] Filter by Out of Stock
- [ ] Sort by name (A-Z, Z-A)
- [ ] Sort by price (low-high, high-low)
- [ ] Sort by stock quantity

**Dashboard**
- [ ] Verify product count
- [ ] Verify inventory value calculation
- [ ] Verify low stock alerts
- [ ] Check data accuracy

### Automated Testing (Future)

**Unit Tests (Jest)**
```javascript
// productApi.test.js
describe('productApi', () => {
  test('getProducts returns array', async () => {
    const products = await getProducts();
    expect(Array.isArray(products)).toBe(true);
  });
});
```

**Integration Tests**
```javascript
// product.test.js
describe('POST /api/products', () => {
  test('creates product successfully', async () => {
    const response = await request(app)
      .post('/api/products')
      .send({ name: 'Test', sku: 'TST-001', ... });
    expect(response.status).toBe(201);
  });
});
```

**E2E Tests (Cypress/Playwright)**
```javascript
test('User can add product', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.click('text=Add New Product');
  await page.fill('input[name="name"]', 'Test Product');
  // ... fill form
  await page.click('button:has-text("Add Product")');
  await expect(page.locator('text=Test Product')).toBeVisible();
});
```

---

## Deployment Guide

### Frontend Deployment (Vercel)

**1. Build Locally**
```bash
cd client
npm run build
# Creates dist/ folder
```

**2. Deploy to Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd client
vercel

# Production
vercel --prod
```

**Environment Variables in Vercel**
```
VITE_API_BASE_URL=https://your-backend.com/api
```

### Backend Deployment (Render/Railway)

**1. Prepare for Production**
```javascript
// server.js
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || "*",
}));
```

**2. Set Environment Variables**
```
MONGO_URI=mongodb+srv://...
PORT=5000
NODE_ENV=production
CLIENT_URL=https://your-frontend.vercel.app
```

**3. Deploy**
- Connect Git repository
- Set environment variables
- Deploy automatically on push

### Database (MongoDB Atlas)

**Setup:**
1. Create free cluster
2. Whitelist IP (0.0.0.0/0 for cloud)
3. Create database user
4. Get connection string
5. Add to .env file

---

## Interview Preparation

### Common Questions & Answers

#### **1. "Explain your project architecture"**

**Answer:**
> "This is a full-stack JavaScript application following the MVC pattern. The frontend uses React 19 with Vite for the UI, communicating with an Express.js backend via a RESTful API. The backend follows a layered architecture with routes, controllers, and Mongoose models interacting with MongoDB. The service layer in the frontend abstracts API calls, promoting separation of concerns. State is managed locally using React hooks, appropriate for this app's scale."

#### **2. "How do you handle state management?"**

**Answer:**
> "I use local component state with React hooks (useState, useEffect) since the app doesn't require global state management. Product data flows from ProductsPage down to child components via props. For a larger app, I'd consider Context API for theme/auth, or Redux for complex state interactions across many components."

#### **3. "Explain your data flow from user action to database"**

**Answer:**
> "When a user submits a form, the ProductForm component validates input and calls an onSubmit callback. ProductsPage receives this and calls the createProduct function from the service layer. This makes a POST request to the Express backend, where middleware parses the JSON, the router matches the endpoint, and the controller validates and processes the request. The controller uses Mongoose to save to MongoDB, logs the change in StockHistory, and returns the new product. The frontend updates state, triggering a re-render."

#### **4. "How did you optimize performance?"**

**Answer:**
> "Several optimizations: Vite provides fast HMR and optimized production builds with tree-shaking. I use CSS-only animations to avoid JavaScript overhead. MongoDB indexes on frequently queried fields like SKU and timestamps speed up lookups. Client-side filtering provides instant search results. In future iterations, I'd add React.memo for expensive components and pagination for large datasets."

#### **5. "What security measures did you implement?"**

**Answer:**
> "Three layers of validation: client-side for UX feedback, server-side in controllers for actual enforcement, and schema-level in Mongoose for database integrity. React auto-escapes output preventing XSS. I use environment variables for secrets, never committing credentials. CORS is configured to control cross-origin requests. For production, I'd add authentication with JWT, rate limiting, and input sanitization libraries."

#### **6. "How would you scale this application?"**

**Answer:**
> "For scaling, I'd implement: pagination/infinite scroll for large datasets, server-side search with text indexes, Redis caching for frequently accessed data, CDN for static assets, database sharding as data grows, load balancing for multiple server instances, and microservices architecture for different domains like products, orders, and users."

#### **7. "Explain your MongoDB schema design"**

**Answer:**
> "The Product schema uses Mongoose with strict validation, unique indexes on SKU, and virtual properties for computed fields like stockStatus. StockHistory is a separate collection with references to Product via ObjectId, but I denormalized the product name for faster queries. I use compound indexes for efficient time-based queries. This design balances normalization with query performance."

#### **8. "What challenges did you face?"**

**Answer:**
> "Key challenges included: designing an intuitive data flow without over-engineering, implementing efficient client-side filtering that handles edge cases, ensuring proper error handling across the stack, and creating a responsive design that works on all devices. I solved these by iterating on the design, writing comprehensive validation, and using CSS Grid/Flexbox effectively."

### Technical Deep Dives to Prepare

1. **React Lifecycle & Hooks**
   - When does useEffect run?
   - Dependency array behavior
   - Cleanup functions

2. **Express Middleware**
   - Order of execution
   - Error handling middleware
   - Custom middleware creation

3. **MongoDB Concepts**
   - Documents vs Collections
   - Indexing strategies
   - Aggregation pipelines
   - Transactions

4. **RESTful API Design**
   - HTTP verbs and their use
   - Status codes
   - Resource naming
   - Idempotency

5. **JavaScript Concepts**
   - Promises vs async/await
   - Event loop
   - Closures
   - This binding

### Code Walkthrough Practice

**Be ready to explain:**
- Why you chose certain patterns
- Trade-offs in your decisions
- Alternative approaches considered
- How you'd extend features
- Debugging strategies used

---

## Advanced Topics (Future Enhancements)

### Authentication & Authorization

**JWT Implementation**
```javascript
// Login generates token
const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '7d' });

// Middleware verifies token
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(token, SECRET);
  req.userId = decoded.userId;
  next();
};

// Protected route
router.get('/profile', auth, getProfile);
```

### Real-Time Updates (WebSockets)

**Socket.io Integration**
```javascript
// Server
io.on('connection', (socket) => {
  socket.on('product-updated', (data) => {
    socket.broadcast.emit('refresh-products');
  });
});

// Client
socket.on('refresh-products', () => {
  fetchProducts();
});
```

### File Uploads (Product Images)

**Multer + Cloudinary**
```javascript
const upload = multer({ dest: 'uploads/' });

router.post('/products', upload.single('image'), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  const product = await Product.create({
    ...req.body,
    imageUrl: result.secure_url,
  });
  res.json(product);
});
```

### Advanced Analytics

**MongoDB Aggregation**
```javascript
const analytics = await Product.aggregate([
  {
    $group: {
      _id: '$category',
      totalValue: { $sum: { $multiply: ['$price', '$stock'] } },
      avgPrice: { $avg: '$price' },
      count: { $sum: 1 },
    },
  },
  { $sort: { totalValue: -1 } },
]);
```

---

## Resources & References

### Documentation
- [React Docs](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)
- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB Manual](https://www.mongodb.com/docs/manual/)

### Learning Paths
- JavaScript ES6+ features
- React Hooks deep dive
- Node.js best practices
- MongoDB schema design
- RESTful API design patterns

---

**Last Updated:** January 2026  
**Maintained by:** Project Author  
**License:** Open Source - Educational Use
