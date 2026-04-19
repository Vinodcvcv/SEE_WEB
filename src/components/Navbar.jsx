import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, LayoutGrid, LogOut, User, Menu, X } from 'lucide-react';

export default function Navbar({ cartCount, user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="text-gradient logo flex-between" style={{ gap: '0.5rem' }}>
          <LayoutGrid size={24} />
          <span className="brand-text">Plutomart</span>
        </Link>
        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/products" onClick={() => setIsOpen(false)}>Collections</Link></li>
          {user && <li><Link to="/orders" onClick={() => setIsOpen(false)}>Orders</Link></li>}
        </ul>
        <div className="nav-right-actions" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                <User size={16} /> <span className="hidden-mobile">{user.name.split(' ')[0]}</span>
              </span>
              <button onClick={onLogout} className="btn" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', borderWidth: '1px', border: '1px solid rgba(255,0,110,0.3)', color: 'var(--secondary)' }}>
                <LogOut size={16} />
                <span className="hidden-mobile" style={{ marginLeft: '0.4rem', display: 'inline-block', verticalAlign: 'text-bottom' }}>Logout</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn" style={{ padding: '0.4rem 1.2rem', fontSize: '0.9rem', borderWidth: '1px' }}>
              Login
            </Link>
          )}
          <Link to="/cart" className="cart-btn" style={{ display: 'inline-block', padding: '0.5rem' }}>
            <ShoppingCart size={24} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <button className="nav-menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
