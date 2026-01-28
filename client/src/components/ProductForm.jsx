import { useState, useEffect } from 'react';

/**
 * ProductForm Component
 * Reusable form for both adding and editing products
 */
const ProductForm = ({ productToEdit, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    price: '',
    stock: '',
    minStock: '',
  });

  // Populate form when editing
  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        sku: productToEdit.sku,
        price: productToEdit.price,
        stock: productToEdit.stock,
        minStock: productToEdit.minStock,
      });
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.sku || !formData.price || !formData.stock || !formData.minStock) {
      alert('All fields are required');
      return;
    }

    // Convert numeric fields
    const productData = {
      name: formData.name,
      sku: formData.sku,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
      minStock: parseInt(formData.minStock, 10),
    };

    onSubmit(productData);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      sku: '',
      price: '',
      stock: '',
      minStock: '',
    });
  };

  const handleCancelClick = () => {
    resetForm();
    if (onCancel) onCancel();
  };

  return (
    <div className="product-form-container">
      <h2>{productToEdit ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="sku">SKU *</label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="e.g., MON-27-FHD"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price ($) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Current Stock *</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="0"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="minStock">Min Stock Alert *</label>
            <input
              type="number"
              id="minStock"
              name="minStock"
              value={formData.minStock}
              onChange={handleChange}
              placeholder="0"
              min="0"
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary btn-large" onClick={handleCancelClick}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary btn-large">
            {productToEdit ? '✓ Update Product' : '+ Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
