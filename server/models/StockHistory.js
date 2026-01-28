const mongoose = require('mongoose');

/**
 * StockHistory Schema
 * Tracks all stock changes for audit trail and reporting
 */
const stockHistorySchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product ID is required'],
      index: true,
    },
    productName: {
      type: String,
      required: [true, 'Product name is required'],
    },
    change: {
      type: Number,
      required: [true, 'Stock change amount is required'],
    },
    oldStock: {
      type: Number,
      required: true,
      min: 0,
    },
    newStock: {
      type: Number,
      required: [true, 'New stock value is required'],
      min: 0,
    },
    changeType: {
      type: String,
      enum: ['INITIAL', 'INCREASE', 'DECREASE', 'UPDATE'],
      default: 'UPDATE',
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Indexes for query optimization
 */
stockHistorySchema.index({ productId: 1, createdAt: -1 });
stockHistorySchema.index({ createdAt: -1 });

/**
 * Log stock change with automatic change type detection
 * @param {ObjectId} productId - Product identifier
 * @param {String} productName - Product name
 * @param {Number} oldStock - Previous stock value
 * @param {Number} newStock - New stock value
 * @returns {Promise} Created stock history record
 */
stockHistorySchema.statics.logChange = async function (
  productId,
  productName,
  oldStock,
  newStock
) {
  const change = newStock - oldStock;
  
  let changeType = 'UPDATE';
  if (oldStock === 0 && newStock > 0) {
    changeType = 'INITIAL';
  } else if (change > 0) {
    changeType = 'INCREASE';
  } else if (change < 0) {
    changeType = 'DECREASE';
  }

  return await this.create({
    productId,
    productName,
    change,
    oldStock,
    newStock,
    changeType,
  });
};

module.exports = mongoose.model('StockHistory', stockHistorySchema);
