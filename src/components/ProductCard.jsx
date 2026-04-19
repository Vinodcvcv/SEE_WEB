import { ShoppingCart } from 'lucide-react';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card glass animate-fade-in">
      <img src={product.p_image_url} alt={product.p_name} className="product-image" />
      <div className="product-info">
        <h3 className="product-title">{product.p_name}</h3>
        <p className="product-desc">{product.p_disc}</p>
        <div className="product-footer">
          <span className="product-price">₹{product.price.toFixed(2)}</span>
          <button className="btn btn-primary" onClick={() => onAddToCart(product)}>
            <ShoppingCart size={18} style={{ marginRight: '0.5rem' }} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
