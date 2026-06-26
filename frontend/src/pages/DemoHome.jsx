import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Truck, Gem, Gift, Tag } from 'lucide-react';
import './DemoHome.css';

export default function DemoHome() {
  const categories = [
    { name: 'Anillos', image: '/images/ring.png', path: '/catalog' },
    { name: 'Pulseras', image: '/images/necklace.png', path: '/catalog' },
    { name: 'Cadenas', image: '/images/ring.png', path: '/catalog' },
    { name: 'Chokers', image: '/images/necklace.png', path: '/catalog' },
    { name: 'Aretes', image: '/images/ring.png', path: '/catalog' },
    { name: 'Gemas', image: '/images/necklace.png', path: '/catalog' }
  ];

  const products = [
    { title: 'Gilded Horizon Cuff', oldPrice: '$990.99', price: '$890.99', discount: '-10%', rating: '★★★★★', image: '/images/ring.png' },
    { title: 'Starlight Echo Hoops', oldPrice: '$642.99', price: '$542.99', discount: '-15%', rating: '★★★★☆', image: '/images/necklace.png' },
    { title: 'Moonlit Bloom Pendant', oldPrice: '$198.99', price: '$178.99', discount: '-10%', rating: '★★★★★', image: '/images/ring.png' },
    { title: 'Velvet Serenity Band', oldPrice: '$450.00', price: '$400.00', discount: '-11%', rating: '★★★★★', image: '/images/necklace.png' }
  ];

  return (
    <div className="jt-home fade-in">
      <Navbar />

      {/* 2. Hero Section */}
      <header className="jt-hero">
        <div className="jt-hero-content fade-in-up">
          <span className="jt-hero-subtitle">THIS WEEKS HIGHLIGHTS</span>
          <h1>Descubre Joyas Que Hablan Tu Estilo</h1>
          <p>Sumérgete en diseños atemporales y sofisticación moderna. Desde anillos impactantes hasta piezas delicadas que definen tu elegancia.</p>
          <div className="jt-hero-buttons">
            <Link to="/catalog" className="btn-premium filled">Descubrir Colección</Link>
            <Link to="/catalog" className="btn-outline">Comprar Ahora</Link>
          </div>
        </div>
      </header>

      {/* 3. Features Strip */}
      <section className="jt-features">
        <div className="jt-features-grid">
          <div className="feature-item">
            <div className="feature-icon"><Truck size={24} /></div>
            <h3>Envíos Fáciles</h3>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><Gem size={24} /></div>
            <h3>Piedras Originales</h3>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><Gift size={24} /></div>
            <h3>Tarjetas de Regalo</h3>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><Tag size={24} /></div>
            <h3>Cupones & Ofertas</h3>
          </div>
        </div>
      </section>

      {/* 4. Top Categories */}
      <section className="jt-categories">
        <span className="section-subtitle">TOP COLLECTIONS</span>
        <h2>Top Category</h2>
        <div className="category-grid">
          {categories.map((cat, i) => (
            <Link key={i} to={cat.path} className="category-card">
              <div className="category-img" style={{ backgroundImage: `url(${cat.image})` }}></div>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. New Collection Banner */}
      <section className="jt-new-collection">
        <div className="nc-text-box">
          <h2>NEW COLLECTION</h2>
          <div className="nc-year">2026</div>
          <p>Inspirada por la belleza atemporal y la sensibilidad moderna, cada pieza está cuidadosamente creada para complementar tu individualidad.</p>
        </div>
        <div className="nc-images">
          <div className="nc-image-card" style={{ backgroundImage: `url('/images/editorial_order.png')` }}>
            <div className="nc-image-content">
              <span>FROM OUR LATEST DROP</span>
              <h3>New In: Everyday Elegance</h3>
              <Link to="/catalog" className="btn-premium filled" style={{ padding: '0.8rem 1.5rem', fontSize: '0.75rem', marginTop: '1rem' }}>Comprar Ahora</Link>
            </div>
          </div>
          <div className="nc-image-card" style={{ backgroundImage: `url('/images/editorial_login.png')` }}>
            <div className="nc-image-content">
              <span>JUST ARRIVED</span>
              <h3>Glow Boldly: The Statement Chain</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Latest Products */}
      <section className="jt-latest">
        <h2>Latest Products</h2>
        <p>Descubre piezas hechas a mano para capturar la atención; desde deslumbrantes diamantes hasta acentos dorados únicos.</p>
        
        <div className="products-grid">
          {products.map((prod, i) => (
            <div key={i} className="product-card">
              <div className="product-image-wrapper">
                <div className="discount-badge">{prod.discount}</div>
                <div className="product-img" style={{ backgroundImage: `url(${prod.image})` }}></div>
              </div>
              <div className="product-info">
                <h3>{prod.title}</h3>
                <div className="product-rating">{prod.rating}</div>
                <div className="product-price">
                  <span className="price-old">{prod.oldPrice}</span>
                  <span className="price-new">{prod.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="jt-footer">
        <div className="jt-footer-grid">
          <div className="footer-brand">
            <h2>Gemora.</h2>
            <p>Hecho para atraer miradas. Joyería que combina elegancia atemporal con un diseño que habla a tu corazón.</p>
          </div>
          <div className="footer-col">
            <h4>Páginas</h4>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/catalog">Tienda</Link></li>
              <li><Link to="/login">Cuenta</Link></li>
              <li><Link to="/order">Pedidos</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Colecciones</h4>
            <ul>
              <li><Link to="#">Nuevas Llegadas</Link></li>
              <li><Link to="#">Anillos</Link></li>
              <li><Link to="#">Pulseras</Link></li>
              <li><Link to="#">Cadenas</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Soporte</h4>
            <ul>
              <li><Link to="#">Preguntas Frecuentes</Link></li>
              <li><Link to="#">Envíos y Devoluciones</Link></li>
              <li><Link to="#">Contacto</Link></li>
            </ul>
          </div>
        </div>
        <div className="jt-footer-bottom">
          <p>Copyright © 2026 Gemora Joyería. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
