import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, QrCode } from 'lucide-react';

export default function Payment({ cart, clearCart, user }) {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [loading, setLoading] = useState(false);
  const [errorMSG, setErrorMSG] = useState('');

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePlaceOrder = async () => {
    if (!user) {
      setErrorMSG('You must be logged in to place an order.');
      return;
    }
    if (cart.length === 0) {
      setErrorMSG('Your cart is empty.');
      return;
    }

    setLoading(true);
    setErrorMSG('');
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${apiUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, items: cart })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to place order');

      clearCart();
      navigate('/orders');
    } catch (err) {
      setErrorMSG(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container animate-fade-in" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h2>Please login to proceed to payment</h2>
        <button onClick={() => navigate('/login')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Payment Options</h1>

      {errorMSG && (
        <div style={{ background: 'rgba(255, 0, 110, 0.1)', border: '1px solid var(--secondary)', color: 'var(--secondary)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          {errorMSG}
        </div>
      )}

      <div className="glass" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Select Payment Method</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label
            className="glass flex-between"
            style={{
              padding: '1rem',
              cursor: 'pointer',
              border: paymentMethod === 'upi' ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={() => setPaymentMethod('upi')}
                style={{ accentColor: 'var(--primary)' }}
              />
              <QrCode size={24} color="var(--primary)" />
              <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>UPI Payment</span>
            </div>
          </label>

          <label
            className="glass flex-between"
            style={{
              padding: '1rem',
              cursor: 'pointer',
              border: paymentMethod === 'cod' ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
                style={{ accentColor: 'var(--primary)' }}
              />
              <Truck size={24} color="var(--primary)" />
              <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>Cash on Delivery (COD)</span>
            </div>
          </label>
        </div>
      </div>

      {paymentMethod === 'upi' && (
        <div className="glass animate-fade-in" style={{ padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Scan QR Code to Pay</h3>
          <p className="product-desc" style={{ marginBottom: '1.5rem' }}>Open your UPI app and scan the code below to complete the payment.</p>
          <div style={{ background: 'white', padding: '1rem', display: 'inline-block', borderRadius: '8px', marginBottom: '1rem' }}>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=8088021505@fam&pn=vinod c v&am=${total.toFixed(1)}`}
              alt="UPI QR Code"
            />
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--secondary)' }}>
            Amount to Pay: ₹{total.toFixed(2)}
          </div>
        </div>
      )}

      {paymentMethod === 'cod' && (
        <div className="glass animate-fade-in" style={{ padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Pay on Delivery</h3>
          <p className="product-desc" style={{ marginBottom: '1rem' }}>You can pay via cash or UPI when the delivery arrives at your doorstep.</p>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--secondary)' }}>
            Amount to Pay: ₹{total.toFixed(2)}
          </div>
        </div>
      )}

      <div style={{ textAlign: 'center' }}>
        <button onClick={handlePlaceOrder} disabled={loading} className="btn btn-primary" style={{ width: '100%', maxWidth: '300px', padding: '1rem', fontSize: '1.1rem', opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Processing...' : 'Confirm Order'}
        </button>
      </div>

    </div>
  );
}
