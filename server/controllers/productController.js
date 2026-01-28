const Product = require('../models/Product');
const StockHistory = require('../models/StockHistory');

/**
 * Product Controller
 * Business logic for product management operations
 */

/**
 * Get all products
 * @route   GET /api/products
 * @returns {Array} List of products sorted by creation date
 */
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      message: 'Failed to fetch products', 
      error: error.message 
    });
  }
};

/**
 * Create a new product
 * @route   POST /api/products
 * @param   {Object} req.body - Product data (name, sku, price, stock, minStock)
 * @returns {Object} Created product
 */
const createProduct = async (req, res) => {
  try {
    const { name, sku, price, stock, minStock } = req.body;

    if (!name || !sku || price == null || stock == null || minStock == null) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (price < 0 || stock < 0 || minStock < 0) {
      return res.status(400).json({ message: 'Values cannot be negative' });
    }

    const existingProduct = await Product.findOne({ sku: sku.toUpperCase() });
    if (existingProduct) {
      return res.status(400).json({ message: 'SKU must be unique' });
    }

    const newProduct = await Product.create({
      name,
      sku,
      price,
      stock,
      minStock,
    });

    await StockHistory.logChange(newProduct._id, newProduct.name, 0, stock);

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ message: 'SKU already exists' });
    }

    res.status(500).json({ 
      message: 'Failed to create product', 
      error: error.message 
    });
  }
};

/**
 * Update an existing product
 * @route   PUT /api/products/:id
 * @param   {String} req.params.id - Product ID
 * @param   {Object} req.body - Updated product data
 * @returns {Object} Updated product
 */
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sku, price, stock, minStock } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (price < 0 || stock < 0 || minStock < 0) {
      return res.status(400).json({ message: 'Values cannot be negative' });
    }
    if (sku && sku.toUpperCase() !== product.sku) {
      const skuExists = await Product.findOne({ 
        sku: sku.toUpperCase(), 
        _id: { $ne: id } 
      });
      if (skuExists) {
        return res.status(400).json({ message: 'SKU must be unique' });
      }
    }

    const oldStock = product.stock;

    product.name = name ?? product.name;
    product.sku = sku ?? product.sku;
    product.price = price ?? product.price;
    product.stock = stock ?? product.stock;
    product.minStock = minStock ?? product.minStock;

    await product.save();

    if (stock != null && stock !== oldStock) {
      await StockHistory.logChange(product._id, product.name, oldStock, stock);
    }

    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }

    res.status(500).json({ 
      message: 'Failed to update product', 
      error: error.message 
    });
  }
};

/**
 * Delete a product
 * @route   DELETE /api/products/:id
 * @param   {String} req.params.id - Product ID
 * @returns {Object} Success message
 */
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    res.status(500).json({ 
      message: 'Failed to delete product', 
      error: error.message 
    });
  }
};

/**
 * Get analytics and dashboard data
 * @route   GET /api/products/analytics
 * @returns {Object} Analytics data including totals and alerts
 */
const getAnalytics = async (req, res) => {
  try {
    const products = await Product.find();

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
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ 
      message: 'Failed to fetch analytics', 
      error: error.message 
    });
  }
};

/**
 * Get stock change history
 * @route   GET /api/products/history
 * @query   {Number} limit - Maximum records to return (default: 50)
 * @query   {String} productId - Filter by specific product ID
 * @returns {Array} Stock history records
 */
const getStockHistory = async (req, res) => {
  try {
    const { limit = 50, productId } = req.query;

    const query = productId ? { productId } : {};

    const history = await StockHistory.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('productId', 'name sku');

    res.json(history);
  } catch (error) {
    console.error('Error fetching stock history:', error);
    res.status(500).json({ 
      message: 'Failed to fetch stock history', 
      error: error.message 
    });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAnalytics,
  getStockHistory,
};
