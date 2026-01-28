const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

/**
 * Fetch all products
 */
export const getProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Create a new product
 */
export const createProduct = async (productData) => {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

/**
 * Update an existing product
 */
export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

/**
 * Delete a product
 */
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

/**
 * Get analytics summary
 */
export const getAnalytics = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/analytics/summary`);
    if (!response.ok) {
      throw new Error('Failed to fetch analytics');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
};

/**
 * Get stock history
 */
export const getStockHistory = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/stock-history`);
    if (!response.ok) {
      throw new Error('Failed to fetch stock history');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching stock history:', error);
    throw error;
  }
};
