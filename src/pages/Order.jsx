import { useState, useEffect } from 'react';
import { Package, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Order({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMSG, setErrorMSG] = useState('');

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/orders?email=${user.email}`);
        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'Failed to fetch orders');
        setOrders(data);
      } catch (err) {
        setErrorMSG(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="container animate-fade-in" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <div className="glass" style={{ padding: '4rem 2rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>Please Log In</h2>
          <p className="product-desc" style={{ marginBottom: '2rem' }}>You must be logged in to view your order history.</p>
          <Link to="/login" className="btn btn-primary">Login Now</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '4rem 2rem' }}>
      <h1 className="text-gradient" style={{ marginBottom: '2rem' }}>Order History</h1>

      {errorMSG && (
        <div style={{ background: 'rgba(255, 0, 110, 0.1)', border: '1px solid var(--secondary)', color: 'var(--secondary)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          {errorMSG}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div className="glass" style={{ display: 'inline-block', padding: '2rem', borderRadius: '50%' }}>Loading...</div>
        </div>
      ) : orders.length === 0 ? (
        <div className="glass" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <Package size={64} color="var(--primary)" style={{ margin: '0 auto 1.5rem', opacity: 0.8 }} />
          <h2 style={{ marginBottom: '1rem' }}>No orders yet</h2>
          <p className="product-desc" style={{ marginBottom: '2rem' }}>Head to the collections page to place your first order!</p>
          <Link to="/products" className="btn btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orders.map((order, i) => (
            <div key={i} className="glass" style={{ padding: '1.5rem' }}>
              <div className="flex-between" style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>Status: <p style={{ fontWeight: '400', fontSize: '1.1rem', color: 'var(--secondary)', display: 'inline-block' }}>{order.status}</p></span>
                <span className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Clock size={16} /> Delevery Date: <p style={{ fontWeight: '400', fontSize: '1.1rem', color: 'var(--secondary)', display: 'inline-block' }}>{order.d_date}</p>
                </span>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                {order.products && order.products.p_image_url ? (
                  <img src={order.products.p_image_url} alt={order.products.p_name || 'Product'} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                ) : (
                  <div style={{ width: '80px', height: '80px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Package size={32} color="var(--text-muted)" />
                  </div>
                )}
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                    {order.products ? order.products.p_name : `Product #${order.p_id}`}
                  </h3>
                  <p className="product-desc" style={{ margin: 0 }}>{order.products ? order.products.p_disc : ""}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
//oug