const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAnalytics,
  getStockHistory,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/analytics/summary", getAnalytics);
router.get("/stock-history", getStockHistory);


module.exports = router;
