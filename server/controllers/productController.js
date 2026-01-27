let products = [];
let stockHistory = [];

// Helper function to log stock changes
const logStockChange = (productId, productName, oldStock, newStock) => {
  const change = newStock - oldStock;
  const logEntry = {
    id: Date.now() + Math.random(), // Ensure unique ID
    productId,
    productName,
    change,
    newStock,
    timestamp: new Date().toISOString(),
  };
  stockHistory.push(logEntry);
};

const getAllProducts = (req, res) => {
  res.json(products);
};

const createProduct = (req, res) => {
  const { name, sku, price, stock, minStock } = req.body;

  if (!name || !sku || price == null || stock == null || minStock == null) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (price < 0 || stock < 0 || minStock < 0) {
    return res.status(400).json({ message: "Values cannot be negative" });
  }

  const existingProduct = products.find((p) => p.sku === sku);
  if (existingProduct) {
    return res.status(400).json({ message: "SKU must be unique" });
  }

  const newProduct = {
    id: Date.now(),
    name,
    sku,
    price,
    stock,
    minStock,
  };

  products.push(newProduct);
  
  // Log initial stock
  logStockChange(newProduct.id, newProduct.name, 0, stock);
  
  res.status(201).json(newProduct);
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, sku, price, stock, minStock } = req.body;

  const product = products.find((p) => p.id == id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (price < 0 || stock < 0 || minStock < 0) {
    return res.status(400).json({ message: "Values cannot be negative" });
  }

  // Prevent SKU duplication
  if (sku && sku !== product.sku) {
    const skuExists = products.find((p) => p.sku === sku);
    if (skuExists) {
      return res.status(400).json({ message: "SKU must be unique" });
    }
  }

  // Track old stock before update
  const oldStock = product.stock;

  product.name = name ?? product.name;
  product.sku = sku ?? product.sku;
  product.price = price ?? product.price;
  product.stock = stock ?? product.stock;
  product.minStock = minStock ?? product.minStock;

  // Log stock change only if stock actually changed
  if (stock != null && stock !== oldStock) {
    logStockChange(product.id, product.name, oldStock, stock);
  }

  res.json(product);
};

const deleteProduct = (req, res) => {
  const { id } = req.params;

  const index = products.findIndex((p) => p.id == id);
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products.splice(index, 1);
  res.json({ message: "Product deleted successfully" });
};


const getAnalytics = (req, res) => {
  const totalProducts = products.length;

  const totalInventoryValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  );

  const lowStockItems = products.filter(
    (p) => p.stock <= p.minStock && p.stock > 0
  );

  const outOfStockItems = products.filter((p) => p.stock === 0);

  res.json({
    totalProducts,
    totalInventoryValue,
    lowStockCount: lowStockItems.length,
    outOfStockCount: outOfStockItems.length,
    lowStockItems,
  });
};

const getStockHistory = (req, res) => {
  // Return logs sorted by newest first
  const sortedHistory = [...stockHistory].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );
  res.json(sortedHistory);
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAnalytics,
  getStockHistory,
};