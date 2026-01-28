import { useState } from 'react';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import StockHistoryPage from './pages/StockHistoryPage';
import './styles/app.css';

/**
 * App Component
 * Root component with "Elegant SaaS" navigation structure
 */
function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Helper to handle navigation and close mobile menu automatically
  const handleNavClick = (page) => {
    setCurrentPage(page);
    // Uncheck the hidden checkbox to close menu on mobile
    const toggle = document.getElementById('nav-toggle');
    if (toggle) toggle.checked = false;
  };

  return (
    <div className="app">
      {/* Hamburger Menu Logic (CSS-Only) */}
      <input type="checkbox" id="nav-toggle" className="nav-toggle" />
      
      {/* Overlay backdrop for mobile menu */}
      <label htmlFor="nav-toggle" className="nav-overlay"></label>
      
      <nav className="navbar">
        <div className="navbar-container">
          <div className="nav-brand">
            <h1>Inventory System</h1>
          </div>
          
          <label htmlFor="nav-toggle" className="nav-burger">
            <span></span>
            <span></span>
            <span></span>
          </label>

          <div className="nav-links">
            <button
              className={`nav-button ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleNavClick('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`nav-button ${currentPage === 'products' ? 'active' : ''}`}
              onClick={() => handleNavClick('products')}
            >
              Products
            </button>
            <button
              className={`nav-button ${currentPage === 'history' ? 'active' : ''}`}
              onClick={() => handleNavClick('history')}
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