import { Link } from 'react-router-dom';
import { ShoppingCart, LayoutGrid, LogOut, User } from 'lucide-react';

export default function Navbar({ cartCount, user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="container flex-between">
        <Link to="/" className="text-gradient logo flex-between" style={{ gap: '0.5rem' }}>
          <LayoutGrid size={24} />
          Plutomart
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Collections</Link></li>
          {user && <li><Link to="/orders">Orders</Link></li>}
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                <User size={16} /> {user.name.split(' ')[0]}
              </span>
              <button onClick={onLogout} className="btn" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', borderWidth: '1px', border: '1px solid rgba(255,0,110,0.3)', color: 'var(--secondary)' }}>
                <LogOut size={16} style={{ marginRight: '0.4rem', display: 'inline-block', verticalAlign: 'text-bottom' }} />
                Logout
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
        </div>
      </div>
    </nav>
  );
}
