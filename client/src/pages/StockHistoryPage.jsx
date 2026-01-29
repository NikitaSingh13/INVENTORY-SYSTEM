import { useState, useEffect } from 'react';
import { getStockHistory } from '../services/productApi';

/**
 * StockHistoryPage Component
 * Displays audit log of all stock changes
 */
const StockHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getStockHistory();
      setHistory(data);
    } catch (err) {
      setError('Failed to load stock history. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatChange = (change) => {
    if (change > 0) {
      return `+${change}`;
    }
    return change.toString();
  };

  if (loading) {
    return <div className="loading">Loading stock history...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="btn btn-primary" onClick={fetchHistory}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="stock-history-page">
      <h1>Stock History</h1>

      {history.length === 0 ? (
        <div className="table-container">
          <p className="no-products">No stock changes recorded yet.</p>
        </div>
      ) : (
        <div className="table-container">
          <div className="product-table-wrapper">
            <table className="product-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Product Name</th>
                  <th>Change</th>
                  <th>New Stock</th>
                </tr>
              </thead>
              <tbody>
                {history.map((log) => (
                  <tr key={log.id}>
                    <td>{formatDate(log.timestamp)}</td>
                    <td>{log.productName}</td>
                    <td>
                      <span className={`stock-change ${log.change >= 0 ? 'positive' : 'negative'}`}>
                        {formatChange(log.change)}
                      </span>
                    </td>
                    <td>{log.newStock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockHistoryPage;
