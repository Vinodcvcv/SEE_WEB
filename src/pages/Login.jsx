import { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errorMSG, setErrorMSG] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMSG('');
    setLoading(true);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const endpoint = isSignUp ? '/api/auth/signup' : '/api/auth/login';

    try {
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Success
      localStorage.setItem('user', JSON.stringify(data.user));
      if (setUser) setUser(data.user);
      navigate('/');
    } catch (err) {
      setErrorMSG(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '6rem 2rem', display: 'flex', justifyContent: 'center' }}>
      <div className="glass" style={{ width: '100%', maxWidth: '450px', padding: '3rem 2.5rem' }}>
        <h2 className="text-gradient" style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '0.5rem' }}>
          {isSignUp ? 'Create an Account' : 'Welcome Back'}
        </h2>
        <p className="text-muted" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          {isSignUp ? 'Join Plutomart to start shopping' : 'Access your futuristic digital assets'}
        </p>

        {errorMSG && (
          <div style={{ background: 'rgba(255, 0, 110, 0.1)', border: '1px solid var(--secondary)', color: 'var(--secondary)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center' }}>
            {errorMSG}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {isSignUp && (
            <div style={{ position: 'relative' }}>
              <User size={20} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--glass-border)',
                  color: 'white', fontFamily: 'inherit', fontSize: '1rem', outline: 'none'
                }}
                required
              />
            </div>
          )}

          <div style={{ position: 'relative' }}>
            <Mail size={20} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{
                width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--glass-border)',
                color: 'white', fontFamily: 'inherit', fontSize: '1rem', outline: 'none'
              }}
              required
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={20} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={{
                width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--glass-border)',
                color: 'white', fontFamily: 'inherit', fontSize: '1rem', outline: 'none'
              }}
              required
            />
          </div>

          {!isSignUp && (
            <div style={{ textAlign: 'right' }}>
              <a href="#" className="text-secondary" style={{ fontSize: '0.9rem', color: 'var(--secondary)', textDecoration: 'none' }}>
                Forgot Password?
              </a>
            </div>
          )}

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '0.5rem', fontSize: '1.05rem', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Log In')}
            {!loading && <ArrowRight size={20} />}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)' }}>
          <p className="text-muted">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              type="button"
              onClick={() => { setIsSignUp(!isSignUp); setErrorMSG(''); }}
              style={{
                background: 'none', border: 'none', color: 'var(--primary)',
                fontWeight: '600', cursor: 'pointer', marginLeft: '0.5rem',
                fontFamily: 'inherit', fontSize: '1rem'
              }}
            >
              {isSignUp ? 'Log In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
