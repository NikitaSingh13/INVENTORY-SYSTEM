const mongoose = require('mongoose');

/**
 * Product Schema
 * Data model for inventory products
 */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters'],
    },
    sku: {
      type: String,
      required: [true, 'SKU is required'],
      unique: true,
      trim: true,
      uppercase: true,
      maxlength: [50, 'SKU cannot exceed 50 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    minStock: {
      type: Number,
      required: [true, 'Minimum stock threshold is required'],
      min: [0, 'Minimum stock cannot be negative'],
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/**
 * Virtual property for stock status
 * @returns {String} 'in-stock', 'low-stock', or 'out-of-stock'
 */
productSchema.virtual('stockStatus').get(function () {
  if (this.stock === 0) return 'out-of-stock';
  if (this.stock <= this.minStock) return 'low-stock';
  return 'in-stock';
});

/**
 * Pre-save middleware to normalize SKU format
 */
productSchema.pre('save', function () {
  if (this.isModified('sku')) {
    this.sku = this.sku.toUpperCase().trim();
  }
});

/**
 * Indexes for query optimization
 */
productSchema.index({ name: 1 });
productSchema.index({ stock: 1 });

module.exports = mongoose.model('Product', productSchema);
