import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './CatalogPage.css';

// Base catalog products matching real Jacqueline Tapia categories
const defaultCatalog = [
  { id: '1', name: 'Anillo Solitario Clásico', category: 'Anillos', material: 'Oro 18k', gemstone: 'Diamante', price: '$15,000 MXN', image: '/images/ring.png' },
  { id: '2', name: 'Eternity | Paco', category: 'Churumbelas', material: 'Oro 14k', gemstone: 'Diamantes 2.3 mm', price: '$32,000 MXN', image: '/images/ring.png' },
  { id: '3', name: 'Conjunto Argollas | Monse', category: 'Argollas', material: 'Oro 14k Blanco y Rosa', gemstone: 'Diamantes', price: '$42,500 MXN', image: '/images/ring.png' },
  { id: '4', name: 'Dije | Marta', category: 'Dijes', material: 'Oro 14k', gemstone: 'Zafiro Natural', price: '$18,900 MXN', image: '/images/necklace.png' },
  { id: '5', name: 'Broquel | Mariajo', category: 'Broqueles', material: 'Oro 14k Blanco', gemstone: 'Diamantes', price: '$14,200 MXN', image: '/images/ring.png' },
  { id: '6', name: 'Anillo de Compromiso Vintage', category: 'Anillos de compromiso', material: 'Oro Blanco 18k', gemstone: 'Diamante Central 0.75ct', price: '$35,000 MXN', image: '/images/ring.png' },
  { id: '7', name: 'Mancuernillas Heritage', category: 'Mancuernillas', material: 'Oro Blanco 14k', gemstone: 'Ónix Negro', price: '$16,500 MXN', image: '/images/editorial_order.png' },
  { id: '8', name: 'Alianza Nupcial Eternelle', category: 'Nupciales', material: 'Oro Amarillo 18k', gemstone: 'Pave Diamantes', price: '$27,800 MXN', image: '/images/ring.png' },
  { id: '9', name: 'Collar Gota de Luz', category: 'Especiales', material: 'Oro Blanco 18k', gemstone: 'Zafiro Azul', price: '$22,500 MXN', image: '/images/necklace.png' }
];

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('categoria') || 'Todos';
  const [filter, setFilter] = useState(initialCategory);
  const [products, setProducts] = useState(defaultCatalog);
  const [loading, setLoading] = useState(false);

  const categories = [
    'Todos',
    'Anillos de compromiso',
    'Churumbelas',
    'Nupciales',
    'Anillos',
    'Argollas',
    'Dijes',
    'Broqueles',
    'Especiales',
    'Mancuernillas'
  ];

  // Try to load any admin added products from DB if available
  useEffect(() => {
    const fetchApiProducts = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/public/products');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const formatted = data.map(item => ({
              id: item.id,
              name: item.name,
              category: item.category,
              material: item.material,
              gemstone: item.gemstone,
              price: item.priceBase ? `$${parseFloat(item.priceBase).toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN` : null,
              image: item.imageUrl || '/images/ring.png'
            }));
            // Combine with default catalog ensuring no ID collisions
            setProducts([...defaultCatalog, ...formatted]);
          }
        }
      } catch (err) {
        // Fallback silently to client catalog
      }
    };
    fetchApiProducts();
  }, []);

  // Sync category filter when URL search params change
  useEffect(() => {
    const cat = searchParams.get('categoria');
    if (cat) {
      setFilter(cat);
    }
  }, [searchParams]);

  const handleFilterChange = (cat) => {
    setFilter(cat);
    if (cat === 'Todos') {
      searchParams.delete('categoria');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ categoria: cat });
    }
  };

  const filteredProducts = filter === 'Todos'
    ? products
    : products.filter(p => {
        const pCat = (p.category || '').toLowerCase();
        const fCat = filter.toLowerCase();
        return pCat.includes(fCat) || fCat.includes(pCat);
      });

  return (
    <div className="catalog-page">
      <Navbar />

      <main className="catalog-content container">
        <div className="catalog-header">
          <span className="section-subtitle">ALTA JOYERÍA DE AUTOR</span>
          <h1 className="section-title">Nuestro Catálogo</h1>
          <p className="catalog-subtitle">
            Cada joya es concebida y fabricada a medida con metales preciosos y piedras de la más alta pureza.
          </p>
          
          <div className="category-filters-scroll">
            <div className="category-filters">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  className={`filter-btn ${filter.toLowerCase() === cat.toLowerCase() ? 'active' : ''}`}
                  onClick={() => handleFilterChange(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="catalog-results-count">
          <span>Mostrando {filteredProducts.length} {filteredProducts.length === 1 ? 'pieza' : 'piezas'}</span>
        </div>

        <div className="catalog-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="catalog-card">
              <div className="catalog-image-wrapper">
                <img src={product.image} alt={product.name} loading="lazy" />
                <div className="catalog-overlay">
                  <Link to="/order" className="btn-premium filled small">Personalizar Pieza</Link>
                </div>
              </div>
              <div className="catalog-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                {(product.material || product.gemstone) && (
                  <p className="product-materials">
                    {product.material} {product.gemstone && `• ${product.gemstone}`}
                  </p>
                )}
                {product.price && (
                  <p className="product-price">{product.price}</p>
                )}
              </div>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div className="catalog-empty-state">
              <h3>No se encontraron piezas en "{filter}"</h3>
              <p>Podemos diseñar y fabricar tu pieza exclusiva totalmente a medida.</p>
              <Link to="/order" className="btn-premium filled" style={{ marginTop: '1.5rem' }}>
                Solicitar Diseño Personalizado
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
