import { useState, useEffect } from 'react';
import { getAnalytics } from '../services/productApi';

/**
 * DashboardPage Component
 * Displays inventory analytics and insights
 */
const DashboardPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAnalytics();
      setAnalytics(data);
    } catch (err) {
      setError('Failed to load analytics. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading analytics...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="btn btn-primary" onClick={fetchAnalytics}>
          Retry
        </button>
      </div>
    );
  }

  if (!analytics) {
    return <div className="error-container">No analytics data available</div>;
  }

  return (
    <div className="dashboard-page">
      <h1>Inventory Dashboard</h1>

      <div className="summary-cards">
        <div className="card">
          <h3>Total Products</h3>
          <p className="card-value">{analytics.totalProducts}</p>
        </div>

        <div className="card">
          <h3>Total Inventory Value</h3>
          <p className="card-value">${analytics.totalInventoryValue.toFixed(2)}</p>
        </div>

        <div className="card card-warning">
          <h3>Low Stock Count</h3>
          <p className="card-value">{analytics.lowStockCount}</p>
        </div>

        <div className="card card-danger">
          <h3>Out of Stock</h3>
          <p className="card-value">{analytics.outOfStockCount}</p>
        </div>
      </div>

      {analytics.lowStockItems && analytics.lowStockItems.length > 0 && (
        <div className="alerts-section">
          <h2>Low Stock Alerts</h2>
          <div className="alerts-list">
            {analytics.lowStockItems.map((alert) => (
              <div key={alert.id} className="alert-item">
                <div className="alert-info">
                  <span className="alert-name">{alert.name}</span>
                  <span className="alert-sku">SKU: {alert.sku}</span>
                </div>
                <div className="alert-stock">
                  <span className="stock-value">{alert.stock} units</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {analytics.lowStockItems && analytics.lowStockItems.length === 0 && (
        <div className="alerts-section">
          <p className="no-alerts">No low stock alerts. All products are well-stocked!</p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
