import StatusBadge from './StatusBadge';

/**
 * ProductTable Component
 * Displays products in a table format with edit and delete actions
 */
const ProductTable = ({ products, onEdit, onDelete }) => {
  const handleDelete = (product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      onDelete(product.id);
    }
  };

  if (products.length === 0) {
    return <p className="no-products">No products available. Add your first product!</p>;
  }

  return (
    <div className="table-container">
      <div className="product-table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>
                  <StatusBadge stock={product.stock} minStock={product.minStock} />
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn btn-sm btn-edit"
                      onClick={() => onEdit(product)}
                      title="Edit product"
                    >
                    Edit
                    </button>
                    <button
                      className="btn btn-sm btn-delete"
                      onClick={() => handleDelete(product)}
                      title="Delete product"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
