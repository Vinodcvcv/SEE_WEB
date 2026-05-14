import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Apparel', 'Books', 'Electronics', 'Accessories', 'Furniture'];

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container animate-fade-in" style={{ padding: '4rem 2rem' }}>
      <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        Latest Collections
      </h2>
      <p className="text-muted" style={{ marginBottom: '2rem' }}>
        Explore our premium selection of digital and physical assets.
      </p>

      {}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2.5rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem',
        scrollbarWidth: 'none', 
      }} className="hide-scrollbar">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`btn ${activeFilter === filter ? 'btn-primary' : ''}`}
            style={{
              padding: '0.5rem 1.2rem',
              borderRadius: '20px',
              whiteSpace: 'nowrap',
              border: '1px solid var(--glass-border)',
              background: activeFilter === filter ? 'var(--gradient)' : 'rgba(255,255,255,0.05)'
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div className="glass" style={{ display: 'inline-block', padding: '2rem', borderRadius: '50%' }}>
            Loading...
          </div>
        </div>
      ) : (
        <div className="product-grid">
          {products
            .filter(product => {
              if (activeFilter === 'All') return true;
              
              const categoryMatch = product.cat === activeFilter || product.category === activeFilter;
              return categoryMatch;
            })
            .map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
        </div>
      )}
    </div>
  );
}
