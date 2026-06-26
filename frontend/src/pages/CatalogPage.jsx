import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './CatalogPage.css';

// Dummy data for the catalog demo
const mockProducts = [
  { id: 1, name: 'Anillo Solitario Clásico', category: 'Anillos', price: '$15,000 MXN', image: '/images/ring.png' },
  { id: 2, name: 'Collar Gota de Oro', category: 'Collares', price: '$22,500 MXN', image: '/images/necklace.png' },
  { id: 3, name: 'Anillo de Compromiso Vintage', category: 'Anillos', price: '$35,000 MXN', image: '/images/ring.png' },
  { id: 4, name: 'Gargantilla Diamantes', category: 'Collares', price: '$48,000 MXN', image: '/images/necklace.png' },
  { id: 5, name: 'Anillo Eternidad', category: 'Anillos', price: '$18,500 MXN', image: '/images/ring.png' },
  { id: 6, name: 'Collar Minimalista', category: 'Collares', price: '$12,000 MXN', image: '/images/necklace.png' },
];

export default function CatalogPage() {
  const [filter, setFilter] = useState('Todos');
  const categories = ['Todos', 'Anillos', 'Collares'];

  const filteredProducts = filter === 'Todos' 
    ? mockProducts 
    : mockProducts.filter(p => p.category === filter);

  return (
    <div className="catalog-page">
      <Navbar />

      <main className="catalog-content container">
        <div className="catalog-header">
          <h1 className="section-title">Nuestro Catálogo</h1>
          <p className="catalog-subtitle">Explora piezas únicas diseñadas con pasión y detalle.</p>
          
          <div className="category-filters">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="catalog-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="catalog-card glass-panel">
              <div className="catalog-image-wrapper">
                <img src={product.image} alt={product.name} />
                <div className="catalog-overlay">
                  <Link to={`/order`} className="btn-premium filled small">Solicitar</Link>
                </div>
              </div>
              <div className="catalog-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
