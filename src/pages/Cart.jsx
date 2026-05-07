import { useState } from 'react';
import { Trash2, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart({ cart, removeFromCart, clearCart, user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMSG, setErrorMSG] = useState('');

  const handleCheckout = () => {
    if (!user) {
      setErrorMSG('You must be logged in to proceed to checkout.');
      return;
    }
    navigate('/payment');
  };
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container animate-fade-in" style={{ padding: '4rem 2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Your Cart</h1>
      
      {errorMSG && (
        <div style={{ background: 'rgba(255, 0, 110, 0.1)', border: '1px solid var(--secondary)', color: 'var(--secondary)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          {errorMSG}
        </div>
      )}

      {cart.length === 0 ? (
        <div className="glass" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <ShoppingBag size={64} color="var(--primary)" style={{ margin: '0 auto 1.5rem', opacity: 0.8 }} />
          <h2 style={{ marginBottom: '1rem' }}>Your cart is empty</h2>
          <p className="product-desc" style={{ marginBottom: '2rem' }}>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cart.map((item, index) => (
              <div key={index} className="glass flex-between" style={{ padding: '1rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <img 
                    src={item.p_image_url} 
                    alt={item.p_name} 
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} 
                  />
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{item.p_name}</h3>
                    <div style={{ color: 'var(--secondary)', fontWeight: '600' }}>₹{item.price.toFixed(2)}</div>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(index)}
                  className="btn"
                  style={{ padding: '0.5rem', border: '1px solid rgba(255,0,110,0.3)', color: 'var(--secondary)' }}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
          
          <div className="glass cart-sidebar" style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>Order Summary</h2>
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <span className="product-desc" style={{ margin: 0 }}>Items ({cart.length})</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
              <span className="product-desc" style={{ margin: 0 }}>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex-between" style={{ marginBottom: '2rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
              <span>Total</span>
              <span style={{ color: 'var(--secondary)' }}>₹{total.toFixed(2)}</span>
            </div>
            <button onClick={handleCheckout} disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
