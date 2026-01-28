# Inventory System - Server

Production-ready Express.js backend with MongoDB integration.

## 📁 Project Structure

```
server/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   └── productController.js # Business logic for products
├── models/
│   ├── Product.js           # Product schema and model
│   └── StockHistory.js      # Stock history tracking
├── routes/
│   └── products.js          # API route definitions
├── .env                     # Environment variables
├── server.js               # Application entry point
└── package.json            # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product
- `GET /api/products/analytics` - Get dashboard analytics
- `GET /api/products/history` - Get stock change history

### Health Check
- `GET /api/health` - Check server status

## 🗄️ Database Schema

### Product
```javascript
{
  name: String (required, max 100 chars),
  sku: String (required, unique, uppercase),
  price: Number (required, min 0),
  stock: Number (required, min 0),
  minStock: Number (required, min 0),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### StockHistory
```javascript
{
  productId: ObjectId (ref: Product),
  productName: String,
  change: Number,
  oldStock: Number,
  newStock: Number,
  changeType: String (INITIAL|INCREASE|DECREASE|UPDATE),
  createdAt: Date (auto)
}
```

## 🔒 Features

- ✅ MongoDB integration with Mongoose ODM
- ✅ Input validation and error handling
- ✅ Automatic stock history tracking
- ✅ RESTful API design
- ✅ CORS enabled
- ✅ Environment-based configuration
- ✅ Database indexing for performance
- ✅ Comprehensive error messages

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| MONGO_URI | MongoDB connection string | Required |
| PORT | Server port | 5000 |
| NODE_ENV | Environment (development/production) | development |
