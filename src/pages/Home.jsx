import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="hero animate-fade-in container">
      <h1 className="text-gradient">Welcome to the Future of Commerce</h1>
      <p>
        Plutomart brings you premium assets with an uncompromised aesthetic. 
        Experience the cutting edge of modern design and next-gen technology.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
        <Link to="/products" className="btn btn-primary">
          Explore Collections
        </Link>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="btn glass">
          Learn More
        </a>
      </div>
    </div>
  );
}
