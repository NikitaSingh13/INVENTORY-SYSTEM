import { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm';
import ProductTable from '../components/ProductTable';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/productApi';

/**
 * ProductsPage Component
 * Main page for managing product catalog
 */
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Search, filter, and sort state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortOption, setSortOption] = useState('name-asc');

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (productData) => {
    try {
      await createProduct(productData);
      await fetchProducts(); // Refresh list
    } catch (err) {
      alert('Failed to add product. Please try again.');
      console.error(err);
    }
  };

  const handleUpdateProduct = async (productData) => {
    try {
      await updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
      await fetchProducts(); // Refresh list
    } catch (err) {
      alert('Failed to update product. Please try again.');
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      await fetchProducts(); // Refresh list
    } catch (err) {
      alert('Failed to delete product. Please try again.');
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  // Process products: search -> filter -> sort
  const getProcessedProducts = () => {
    let result = [...products];

    // 1. Apply search
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter((product) => {
        const nameMatch = product.name.toLowerCase().includes(searchLower);
        const skuMatch = product.sku.toLowerCase().includes(searchLower);
        return nameMatch || skuMatch;
      });
    }

    // 2. Apply filter
    if (filterStatus !== 'all') {
      result = result.filter((product) => {
        const { stock, minStock } = product;
        
        if (filterStatus === 'out-of-stock') {
          return stock === 0;
        } else if (filterStatus === 'low-stock') {
          return stock > 0 && stock <= minStock;
        } else if (filterStatus === 'in-stock') {
          return stock > minStock;
        }
        
        return true;
      });
    }

    // 3. Apply sort
    result.sort((a, b) => {
      switch (sortOption) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'stock-asc':
          return a.stock - b.stock;
        case 'stock-desc':
          return b.stock - a.stock;
        default:
          return 0;
      }
    });

    return result;
  };

  const displayProducts = getProcessedProducts();

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="btn btn-primary" onClick={fetchProducts}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Product Management</h1>
        <p>Manage your inventory and track product availability</p>
      </div>

      <ProductForm
        productToEdit={editingProduct}
        onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
        onCancel={handleCancelEdit}
      />

      <div className="products-section">
        <h2>Product Catalog</h2>
        
        {/* Search, Filter, and Sort Controls */}
        <div className="product-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-sort-group">
            <div className="filter-box">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Products</option>
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>

            <div className="sort-box">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="sort-select"
              >
                <option value="name-asc">Name (A–Z)</option>
                <option value="name-desc">Name (Z–A)</option>
                <option value="price-asc">Price (Low → High)</option>
                <option value="price-desc">Price (High → Low)</option>
                <option value="stock-asc">Stock (Low → High)</option>
                <option value="stock-desc">Stock (High → Low)</option>
              </select>
            </div>
          </div>
        </div>

        <ProductTable
          products={displayProducts}
          onEdit={handleEdit}
          onDelete={handleDeleteProduct}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
