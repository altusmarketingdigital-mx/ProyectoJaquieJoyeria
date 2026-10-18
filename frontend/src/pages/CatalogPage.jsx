import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './CatalogPage.css';

// Official pieces matching Jacqueline Tapia Joyería reference catalogue
const defaultCatalog = [
  // 12 Colecciones Oficiales de Anillos de Compromiso (jacquelinetapiajoyeria.com/product-category/anillos-de-compromiso/)
  { id: 'ac-1', name: 'Anillo de Compromiso | Alejandro', category: 'Anillos de compromiso', material: 'Oro Blanco 14K', gemstone: 'Diamante Central y Laterales', price: 'Cotización personalizada', image: '/images/anillos_compromiso/alejandro.png' },
  { id: 'ac-2', name: 'Anillo de Compromiso | Antonio', category: 'Anillos de compromiso', material: 'Oro Amarillo 14K', gemstone: 'Diamante Solitario Natural', price: 'Cotización personalizada', image: '/images/anillos_compromiso/antonio.png' },
  { id: 'ac-3', name: 'Anillo de Compromiso | Armando', category: 'Anillos de compromiso', material: 'Oro Blanco 18K', gemstone: 'Diamante Corte Brillante', price: 'Cotización personalizada', image: '/images/anillos_compromiso/armando.png' },
  { id: 'ac-4', name: 'Anillo de Compromiso | David', category: 'Anillos de compromiso', material: 'Oro Amarillo 14K', gemstone: 'Esmeralda Natural Certificada', price: 'Cotización personalizada', image: '/images/anillos_compromiso/david.png' },
  { id: 'ac-5', name: 'Anillo de Compromiso | Ernesto', category: 'Anillos de compromiso', material: 'Oro Blanco 14K', gemstone: 'Diamante Natural Solitario', price: 'Cotización personalizada', image: '/images/anillos_compromiso/ernesto.png' },
  { id: 'ac-6', name: 'Anillo de Compromiso | Gustavo', category: 'Anillos de compromiso', material: 'Oro Rosa 14K', gemstone: 'Diamantes Laterales en Pavé', price: 'Cotización personalizada', image: '/images/anillos_compromiso/gustavo_1.png' },
  { id: 'ac-7', name: 'Anillo de Compromiso | Gustavo II', category: 'Anillos de compromiso', material: 'Oro Blanco 14K', gemstone: 'Diamante Central con Halo', price: 'Cotización personalizada', image: '/images/anillos_compromiso/gustavo_2.png' },
  { id: 'ac-8', name: 'Anillo de Compromiso | Juan Pablo', category: 'Anillos de compromiso', material: 'Oro Blanco 18K', gemstone: 'Diamante Natural Certificado', price: 'Cotización personalizada', image: '/images/anillos_compromiso/juan_pablo.png' },
  { id: 'ac-9', name: 'Anillo de Compromiso | Pablo', category: 'Anillos de compromiso', material: 'Oro Amarillo 14K', gemstone: 'Diamante Corte Redondo', price: 'Cotización personalizada', image: '/images/anillos_compromiso/pablo.png' },
  { id: 'ac-10', name: 'Anillo de Compromiso | Ricardo', category: 'Anillos de compromiso', material: 'Oro Blanco 14K', gemstone: 'Trilogía de Diamantes', price: 'Cotización personalizada', image: '/images/anillos_compromiso/ricardo.png' },
  { id: 'ac-11', name: 'Anillo de Compromiso | Ricky', category: 'Anillos de compromiso', material: 'Oro Rosa 14K', gemstone: 'Diamante Corte Oval', price: 'Cotización personalizada', image: '/images/anillos_compromiso/ricky.png' },
  { id: 'ac-12', name: 'Anillo de Compromiso | Roberto', category: 'Anillos de compromiso', material: 'Oro Blanco 18K', gemstone: 'Diamante Solitario 6 Uñas', price: 'Cotización personalizada', image: '/images/anillos_compromiso/roberto.png' },
  
  // Categorías complementarias
  { id: 'ch-1', name: 'Eternity | Paco', category: 'Churumbelas', material: 'Oro de 14K', gemstone: 'Diamantes de 2.3 mm', price: '$32,000 MXN', image: '/images/churumbela.png' },
  { id: 'nup-1', name: 'Alianza Dúo Nupcial', category: 'Nupciales', material: 'Oro 14K Blanco y Rosa', gemstone: 'Diamantes Naturales', price: '$38,500 MXN', image: '/images/nupciales.png' },
  { id: 'an-1', name: 'Anillo Calado Pavé', category: 'Anillos', material: 'Oro Blanco 18K', gemstone: 'Diamantes', price: '$26,000 MXN', image: '/images/anillos.png' },
  { id: 'arg-1', name: 'Conjunto Argollas | Monse', category: 'Argollas', material: 'Oro 14K Grabado', gemstone: 'Diamantes', price: '$42,500 MXN', image: '/images/argollas.png' },
  { id: 'dj-1', name: 'Dije | Marta', category: 'Dijes', material: 'Oro 14K Blanco', gemstone: 'Esmeralda Natural y Halo de Diamantes', price: '$18,900 MXN', image: '/images/dijes.png' },
  { id: 'br-1', name: 'Broquel | Mariajo', category: 'Broqueles', material: 'Oro Blanco 14K', gemstone: 'Zafiro Natural y Diamantes', price: '$14,200 MXN', image: '/images/broqueles.png' },
  { id: 'esp-1', name: 'Anillo Gemelas Morganita', category: 'Especiales', material: 'Oro Rosa 14K', gemstone: 'Morganitas Naturales y Pavé', price: '$24,500 MXN', image: '/images/especiales.png' },
  { id: 'man-1', name: 'Mancuernillas Huella', category: 'Mancuernillas', material: 'Oro Blanco y Rosa 14K', gemstone: 'Grabado dactilar de alta precisión', price: '$19,800 MXN', image: '/images/mancuernillas.png' }
];

// The 9 official categories with official photography
const defaultCategoryDefs = [
  { name: 'Anillos de compromiso', query: 'Anillos de compromiso', image: '/images/anillo_compromiso.png' },
  { name: 'Churumbelas', query: 'Churumbelas', image: '/images/churumbela.png' },
  { name: 'Nupciales', query: 'Nupciales', image: '/images/nupciales.png' },
  { name: 'Anillos', query: 'Anillos', image: '/images/anillos.png' },
  { name: 'Argollas', query: 'Argollas', image: '/images/argollas.png' },
  { name: 'Dijes', query: 'Dijes', image: '/images/dijes.png' },
  { name: 'Broqueles', query: 'Broqueles', image: '/images/broqueles.png' },
  { name: 'Especiales', query: 'Especiales', image: '/images/especiales.png' },
  { name: 'Mancuernillas', query: 'Mancuernillas', image: '/images/mancuernillas.png' }
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
    setFilter(cat || 'Todos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        const pCat = (p.category || '').toLowerCase().trim();
        const fCat = filter.toLowerCase().trim();
        return pCat === fCat;
      });

  return (
    <div className="catalog-page">
      <Navbar />

      <main className="catalog-content container">
        <div className="catalog-header">
          <h1 className="section-title">
            {filter === 'Todos' ? 'Catálogo' : (filter.charAt(0).toUpperCase() + filter.slice(1))}
          </h1>
        </div>

        {/* View 1: When user enters General Catalog, show the 9 official Categories */}
        {filter === 'Todos' ? (
          <div className="jt-catalog-categories-view">
            <div className="jt-category-nine-grid">
              {defaultCategoryDefs.map((cat, idx) => (
                <Link 
                  key={idx} 
                  to={`/catalog?categoria=${encodeURIComponent(cat.query)}`} 
                  className="jt-category-tile"
                >
                  <div className="tile-image-wrapper">
                    <img src={cat.image} alt={cat.name} loading="lazy" />
                    <div className="tile-hover-overlay">
                      <span className="view-link">Ver Piezas</span>
                    </div>
                  </div>
                  <div className="tile-meta">
                    <h3 className="tile-name">{cat.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          /* View 2: When user clicks on a Category, show its official products & toolbar */
          <>
            <div className="catalog-toolbar">
              <span className="catalog-results-text">
                Mostrando 1–{filteredProducts.length} de {filteredProducts.length} resultados
              </span>

              <div className="catalog-sort-wrapper">
                <select className="catalog-sort-select" defaultValue="default">
                  <option value="default">Orden predeterminado</option>
                  <option value="popularity">Ordenar por popularidad</option>
                  <option value="rating">Ordenar por calificación media</option>
                  <option value="date">Ordenar por las últimas</option>
                  <option value="price-asc">Ordenar por precio: bajo a alto</option>
                  <option value="price-desc">Ordenar por precio: alto a bajo</option>
                </select>
              </div>
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
          </>
        )}
      </main>
    </div>
  );
}
