import { useState } from 'react';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import StockHistoryPage from './pages/StockHistoryPage';
import './styles/app.css';

/**
 * App Component
 * Root component with simple page navigation
 */
function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-container">
          <div className="nav-brand">
            <h1>Inventory System</h1>
          </div>
          <div className="nav-links">
            <button
              className={`nav-button ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentPage('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`nav-button ${currentPage === 'products' ? 'active' : ''}`}
              onClick={() => setCurrentPage('products')}
            >
              Products
            </button>
            <button
              className={`nav-button ${currentPage === 'history' ? 'active' : ''}`}
              onClick={() => setCurrentPage('history')}
            >
              Stock History
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {currentPage === 'dashboard' && <DashboardPage />}
        {currentPage === 'products' && <ProductsPage />}
        {currentPage === 'history' && <StockHistoryPage />}
      </main>
    </div>
  );
}

export default App;
