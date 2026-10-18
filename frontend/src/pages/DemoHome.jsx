import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  Sparkles, 
  ArrowRight, 
  Gem, 
  ShieldCheck, 
  Heart, 
  Award, 
  Compass, 
  MessageCircle, 
  ChevronRight,
  Star
} from 'lucide-react';
import { getHomeConfig } from '../services/homeConfig';
import './DemoHome.css';

// Fixed list of 9 official Jacqueline Tapia categories with representative imagery
const defaultCategoryDefs = [
  { name: 'Anillos de compromiso', query: 'Anillos de compromiso', image: '/images/ring.png' },
  { name: 'Churumbelas', query: 'Churumbelas', image: '/images/ring.png' },
  { name: 'Nupciales', query: 'Nupciales', image: '/images/ring.png' },
  { name: 'Anillos', query: 'Anillos', image: '/images/ring.png' },
  { name: 'Argollas', query: 'Argollas', image: '/images/ring.png' },
  { name: 'Dijes', query: 'Dijes', image: '/images/necklace.png' },
  { name: 'Broqueles', query: 'Broqueles', image: '/images/ring.png' },
  { name: 'Especiales', query: 'Especiales', image: '/images/necklace.png' },
  { name: 'Mancuernillas', query: 'Mancuernillas', image: '/images/editorial_order.png' }
];

// Reference site "Favoritos del mes" official pieces
const defaultFavorites = [
  {
    id: 'fav-1',
    name: 'Eternity | Paco',
    category: 'Churumbela',
    materials: 'Oro de 14K con Diamantes de 2.3 mm',
    price: '$32,000 MXN',
    image: '/images/ring.png'
  },
  {
    id: 'fav-2',
    name: 'Dije | Marta',
    category: 'Dije',
    materials: 'Oro de 14K con Zafiro Natural',
    price: '$18,900 MXN',
    image: '/images/necklace.png'
  },
  {
    id: 'fav-3',
    name: 'Broquel | Mariajo',
    category: 'Broqueles',
    materials: 'Oro Blanco 14K con Diamantes',
    price: '$14,200 MXN',
    image: '/images/ring.png'
  },
  {
    id: 'fav-4',
    name: 'Conjunto Argollas | Monse',
    category: 'Argollas',
    materials: 'Oro 14K Blanco y Rosa con Diamantes',
    price: '$42,500 MXN',
    image: '/images/ring.png'
  }
];

// Emotional client stories
const customerStories = [
  {
    couple: 'Valeria & Fernando',
    piece: 'Anillo de Compromiso con Diamante Corte Cojín',
    quote: 'Jacqueline logró capturar exactamente lo que soñábamos. La asesoría en la selección del diamante y ver el diseño nacer desde el boceto fue una experiencia inolvidable.',
    date: 'Guadalajara, México'
  },
  {
    couple: 'Sofía & Alejandro',
    piece: 'Conjunto de Argollas de Matrimonio en Oro Rosa',
    quote: 'Buscábamos algo que no fuera genérico. El grabado y la textura artesanal de nuestras argollas hacen que las miremos con amor todos los días.',
    date: 'Ciudad de México'
  },
  {
    couple: 'Camila & Mateo',
    piece: 'Churumbela Eternity de Aniversario',
    quote: 'El detalle en cada garra y el brillo de los diamantes superó cualquier expectativa. El certificado personalizado y la presentación fueron de primer nivel.',
    date: 'Monterrey, México'
  }
];

export default function DemoHome() {
  const [cms, setCms] = useState(getHomeConfig());
  const [categoryCounts, setCategoryCounts] = useState({});
  const [favoritesList, setFavoritesList] = useState(defaultFavorites);

  // Load real catalog items to compute real counts and sync with DB if available
  useEffect(() => {
    // Read current CMS settings
    setCms(getHomeConfig());

    const loadRealData = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/public/products');
        if (res.ok) {
          const apiProducts = await res.json();
          if (Array.isArray(apiProducts) && apiProducts.length > 0) {
            // Count products by category
            const counts = {};
            apiProducts.forEach(p => {
              const cat = (p.category || '').toLowerCase();
              counts[cat] = (counts[cat] || 0) + 1;
            });
            setCategoryCounts(counts);
          }
        }
      } catch (e) {
        // Fallback silently: client-side base catalog counts
      }
    };

    loadRealData();
  }, []);

  // Compute real count for category
  const getProductCount = (catName) => {
    const key = catName.toLowerCase();
    // Count matches in real database or return real catalog base representation
    if (categoryCounts[key] !== undefined) {
      return categoryCounts[key];
    }
    // Count in fallback base
    const baseOccurrences = {
      'anillos de compromiso': 1,
      'churumbelas': 1,
      'nupciales': 1,
      'anillos': 3,
      'argollas': 2,
      'dijes': 1,
      'broqueles': 1,
      'especiales': 2,
      'mancuernillas': 1
    };
    return baseOccurrences[key] || 1;
  };

  const cleanPhone = (cms.footer.whatsappNumber || '523334554536').replace(/[^0-9]/g, '');
  const whatsappLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(cms.footer.whatsappMessage || 'Hola, me gustaría información sobre una joya personalizada')}`;

  return (
    <div className="jt-home fade-in">
      <Navbar />

      {/* =========================================================================
         2.2 BANNER PRINCIPAL (HERO)
         ========================================================================= */}
      {cms.hero.enabled && (
        <header className="jt-hero-luxury" style={{ backgroundImage: `url('${cms.hero.backgroundImage}')` }}>
          <div className="jt-hero-overlay"></div>
          <div className="jt-hero-container container">
            <div className="jt-hero-text-block fade-in-up">
              <span className="jt-hero-kicker">{cms.hero.tagline}</span>
              <h1 className="jt-hero-title">{cms.hero.title}</h1>
              <p className="jt-hero-lead">{cms.hero.subtitle}</p>
              
              <div className="jt-hero-cta-group">
                <Link to={cms.hero.buttonLink} className="btn-premium filled">
                  {cms.hero.buttonText}
                </Link>
                <Link to={cms.hero.secondaryButtonLink} className="btn-premium gold">
                  {cms.hero.secondaryButtonText}
                </Link>
              </div>

              {/* Redes Sociales directamente abajo de los botones del Hero (Solo Iconos) */}
              <div className="jt-hero-social-block">
                <div className="jt-hero-social-buttons">
                  <a 
                    href={cms.footer.facebookUrl || 'https://www.facebook.com/jacquelinetapiajoyeria'} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="jt-hero-social-icon-btn facebook"
                    aria-label="Facebook Jacqueline Tapia Joyería"
                    title="Facebook"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>

                  <a 
                    href={cms.footer.instagramUrl || 'https://www.instagram.com/jacquelinetapiajoyeria'} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="jt-hero-social-icon-btn instagram"
                    aria-label="Instagram Jacqueline Tapia Joyería"
                    title="Instagram"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>

                  <a 
                    href={cms.footer.tiktokUrl || 'https://www.tiktok.com/@jacquelinetapiajoyeria'} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="jt-hero-social-icon-btn tiktok"
                    aria-label="TikTok Jacqueline Tapia Joyería"
                    title="TikTok"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.11V9.93a6.38 6.38 0 0 0-.79-.05A6.34 6.34 0 0 0 3 16.22 6.34 6.34 0 0 0 9.34 22.56c3.5 0 6.34-2.84 6.34-6.34V9.05a8.28 8.28 0 0 0 4.91 1.6V7.2a4.86 4.86 0 0 1-1-.51z"/>
                    </svg>
                  </a>

                  <a 
                    href={whatsappLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="jt-hero-social-icon-btn whatsapp"
                    aria-label="WhatsApp Jacqueline Tapia Joyería"
                    title="WhatsApp"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.395-10.416c-5.525 0-10.003 4.478-10.003 10.003 0 1.839.497 3.563 1.365 5.048l-1.451 5.305 5.441-1.427c1.428.804 3.076 1.264 4.829 1.264 5.524 0 10.002-4.478 10.002-10.003 0-5.525-4.478-10.003-10.002-10.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* =========================================================================
         2.3 PRESENTACIÓN DE LA MARCA (PHILOSOPHY)
         ========================================================================= */}
      {cms.brandPresentation.enabled && (
        <section id="acerca-de" className="jt-brand-story section-spacing">
          <div className="container">
            <div className="jt-brand-grid">
              
              <div className="jt-brand-visual">
                <div className="jt-brand-image-frame">
                  <img 
                    src={cms.brandPresentation.image} 
                    alt="Jacqueline Tapia Joyería Taller" 
                    className="jt-brand-img"
                    loading="lazy"
                  />
                  <div className="jt-brand-badge">
                    <span className="badge-year">Desde 2018</span>
                    <span className="badge-text">Joyería de Autor</span>
                  </div>
                </div>
              </div>

              <div className="jt-brand-copy">
                <span className="section-eyebrow">{cms.brandPresentation.tagline}</span>
                <h2 className="section-heading">{cms.brandPresentation.title}</h2>
                <blockquote className="jt-brand-quote">
                  "{cms.brandPresentation.quote}"
                </blockquote>
                <p className="jt-brand-author">{cms.brandPresentation.author}</p>
                <p className="jt-brand-paragraph">
                  {cms.brandPresentation.text}
                </p>
                <div className="jt-brand-signature-row">
                  <Link to="/order" className="btn-premium filled">
                    {cms.brandPresentation.buttonText}
                  </Link>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-premium gold">
                    <MessageCircle size={15} style={{ marginRight: '8px' }} />
                    Consulta por WhatsApp
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
         2.4 CATEGORÍAS DE JOYERÍA (9 EXACT REAL CATEGORIES)
         ========================================================================= */}
      {cms.categories.enabled && (
        <section className="jt-categories-section section-spacing bg-subtle">
          <div className="container">
            <div className="section-header-center">
              <span className="section-eyebrow">{cms.categories.tagline}</span>
              <h2 className="section-heading">{cms.categories.title}</h2>
              <p className="section-subheading">{cms.categories.description}</p>
            </div>

            <div className="jt-category-nine-grid">
              {defaultCategoryDefs.map((cat, idx) => {
                const count = getProductCount(cat.name);
                return (
                  <Link 
                    key={idx} 
                    to={`/catalog?categoria=${encodeURIComponent(cat.query)}`} 
                    className="jt-category-tile"
                  >
                    <div className="tile-image-wrapper">
                      <img src={cat.image} alt={cat.name} loading="lazy" />
                      <div className="tile-hover-overlay">
                        <span className="view-link">Ver Piezas <ArrowRight size={14} /></span>
                      </div>
                    </div>
                    <div className="tile-meta">
                      <h3 className="tile-name">{cat.name}</h3>
                      <span className="tile-count">{count} {count === 1 ? 'pieza' : 'piezas'}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
         2.5 SECCIÓN JOYERÍA FINA
         ========================================================================= */}
      {cms.fineJewelry.enabled && (
        <section id="gemas" className="jt-fine-jewelry-hero">
          <div className="fine-jewelry-backdrop">
            <img src={cms.fineJewelry.image} alt="Joyería Fina y Gemas Preciosas" />
            <div className="fine-jewelry-overlay"></div>
          </div>
          <div className="container fine-jewelry-container">
            <div className="fine-jewelry-content">
              <span className="section-eyebrow-light">{cms.fineJewelry.tagline}</span>
              <h2 className="fine-jewelry-title">{cms.fineJewelry.title}</h2>
              <p className="fine-jewelry-subtitle">{cms.fineJewelry.subtitle}</p>
              <p className="fine-jewelry-desc">{cms.fineJewelry.description}</p>
              <div className="fine-jewelry-buttons">
                <Link to="/order" className="btn-premium white">
                  {cms.fineJewelry.buttonText}
                </Link>
                <Link to="/catalog" className="btn-premium gold">
                  Ver Colección Fina
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
         2.6 FAVORITOS DEL MES
         ========================================================================= */}
      {cms.favorites.enabled && (
        <section className="jt-favorites-section section-spacing">
          <div className="container">
            <div className="section-header-center">
              <span className="section-eyebrow">{cms.favorites.tagline}</span>
              <h2 className="section-heading">{cms.favorites.title}</h2>
              <p className="section-subheading">{cms.favorites.description}</p>
            </div>

            <div className="jt-favorites-grid">
              {favoritesList.map((prod) => (
                <div key={prod.id} className="jt-favorite-card">
                  <div className="card-media-box">
                    <img src={prod.image} alt={prod.name} loading="lazy" />
                    <div className="card-badge-top">Exclusivo</div>
                    <div className="card-action-hover">
                      <Link to="/order" className="btn-premium filled small">
                        Personalizar
                      </Link>
                    </div>
                  </div>
                  <div className="card-details">
                    <span className="card-category">{prod.category}</span>
                    <h3 className="card-title">{prod.name}</h3>
                    <p className="card-materials">{prod.materials}</p>
                    {prod.price && <div className="card-price">{prod.price}</div>}
                  </div>
                </div>
              ))}
            </div>

            <div className="jt-favorites-footer">
              <Link to="/catalog" className="btn-premium filled">
                Explorar Catálogo Completo
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
         2.7 SECCIÓN DE PERSONALIZACIÓN
         ========================================================================= */}
      {cms.personalization.enabled && (
        <section id="contacto" className="jt-personalization-section">
          <div className="container">
            <div className="jt-personalization-banner">
              <div className="personalization-text">
                <span className="section-eyebrow-light">{cms.personalization.tagline}</span>
                <h2 className="personalization-title">{cms.personalization.title}</h2>
                <h3 className="personalization-subtitle">{cms.personalization.subtitle}</h3>
                <p className="personalization-desc">{cms.personalization.description}</p>
                <div className="personalization-actions">
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-premium gold">
                    <MessageCircle size={16} style={{ marginRight: '8px' }} />
                    {cms.personalization.buttonText}
                  </a>
                  <Link to="/order" className="btn-premium white">
                    Iniciar Solicitud en Línea
                  </Link>
                </div>
              </div>
              <div className="personalization-preview">
                <img src={cms.personalization.image} alt="Personalización Jacqueline Tapia" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
         2.8 FILOSOFÍA DE DISEÑO
         ========================================================================= */}
      {cms.designPhilosophy.enabled && (
        <section className="jt-philosophy-section section-spacing">
          <div className="container">
            <div className="philosophy-header text-center">
              <span className="section-eyebrow">{cms.designPhilosophy.tagline}</span>
              <h2 className="section-heading">{cms.designPhilosophy.title}</h2>
              <p className="philosophy-manifesto">
                "{cms.designPhilosophy.statement}"
              </p>
            </div>

            <div className="philosophy-features-grid">
              <div className="philosophy-pillar">
                <div className="pillar-icon"><Award size={28} /></div>
                <h3>Oro de 14K y 18K</h3>
                <p>Metales preciosos con aleaciones de la máxima calidad orfebre en amarillo, blanco o rosa.</p>
              </div>

              <div className="philosophy-pillar">
                <div className="pillar-icon"><Gem size={28} /></div>
                <h3>Gemas Certificadas</h3>
                <p>Diamantes naturales y gemas con corte de precisión y certificados de autenticidad.</p>
              </div>

              <div className="philosophy-pillar">
                <div className="pillar-icon"><Compass size={28} /></div>
                <h3>Orfebrería a Medida</h3>
                <p>Cada pieza se modela en 3D y se detalla a mano por artesanos joyeros especializados.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
         2.9 HISTORIAS Y EXPERIENCIAS
         ========================================================================= */}
      {cms.stories.enabled && (
        <section id="historias" className="jt-stories-section section-spacing bg-subtle">
          <div className="container">
            <div className="section-header-center">
              <span className="section-eyebrow">{cms.stories.tagline}</span>
              <h2 className="section-heading">{cms.stories.title}</h2>
              <p className="section-subheading">{cms.stories.subtitle}</p>
            </div>

            <div className="jt-stories-grid">
              {customerStories.map((story, i) => (
                <div key={i} className="story-card">
                  <div className="story-stars">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={14} fill="#CB9274" color="#CB9274" />
                    ))}
                  </div>
                  <blockquote className="story-quote">"{story.quote}"</blockquote>
                  <div className="story-meta">
                    <h4 className="story-couple">{story.couple}</h4>
                    <span className="story-piece">{story.piece}</span>
                    <span className="story-location">{story.date}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="stories-cta text-center">
              <Link to="/order" className="btn-premium filled">
                {cms.stories.buttonText}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
         2.10 PIE DE PÁGINA (FOOTER OFICIAL)
         ========================================================================= */}
      <footer className="jt-footer">
        <div className="container">
          <div className="jt-footer-grid">
            
            {/* Brand Presentation */}
            <div className="footer-brand-column">
              <div className="footer-logo">
                <img 
                  src="/images/logo-white.png" 
                  alt="Jacqueline Tapia Joyería" 
                  className="footer-logo-img" 
                />
              </div>
              <p className="footer-tagline">
                Piezas de diseño personalizadas, concebidas artesanalmente para celebrar el amor y los momentos que perduran para siempre.
              </p>
              
              {/* Official Social Media Buttons */}
              <div className="footer-social-wrapper">
                <span className="footer-social-heading">Síguenos en redes</span>
                <div className="footer-social-buttons">
                  <a 
                    href={cms.footer.facebookUrl || 'https://www.facebook.com/jacquelinetapiajoyeria'} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="jt-social-pill facebook"
                    aria-label="Facebook Jacqueline Tapia Joyería"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Facebook</span>
                  </a>

                  <a 
                    href={cms.footer.instagramUrl || 'https://www.instagram.com/jacquelinetapiajoyeria'} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="jt-social-pill instagram"
                    aria-label="Instagram Jacqueline Tapia Joyería"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>Instagram</span>
                  </a>

                  <a 
                    href={cms.footer.tiktokUrl || 'https://www.tiktok.com/@jacquelinetapiajoyeria'} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="jt-social-pill tiktok"
                    aria-label="TikTok Jacqueline Tapia Joyería"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.11V9.93a6.38 6.38 0 0 0-.79-.05A6.34 6.34 0 0 0 3 16.22 6.34 6.34 0 0 0 9.34 22.56c3.5 0 6.34-2.84 6.34-6.34V9.05a8.28 8.28 0 0 0 4.91 1.6V7.2a4.86 4.86 0 0 1-1-.51z"/>
                    </svg>
                    <span>TikTok</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 1: Nosotros */}
            <div className="footer-column">
              <h4>Nosotros</h4>
              <ul>
                <li><a href="/#acerca-de">Acerca de</a></li>
                <li><a href="/#gemas">Piedras</a></li>
                <li><a href="/#contacto">Contacto</a></li>
                <li><Link to="/order">Diseño Personalizado</Link></li>
              </ul>
            </div>

            {/* Column 2: Nuestro trabajo */}
            <div className="footer-column">
              <h4>Nuestro trabajo</h4>
              <ul>
                <li><a href="/#historias">Historias</a></li>
                <li><Link to="/catalog?categoria=Anillos+de+compromiso">Anillos de Compromiso</Link></li>
                <li><Link to="/catalog?categoria=Churumbelas">Churumbelas</Link></li>
                <li><Link to="/catalog?categoria=Argollas">Argollas Nupciales</Link></li>
              </ul>
            </div>

            {/* Column 3: Servicio */}
            <div className="footer-column">
              <h4>Servicio</h4>
              <ul>
                <li><a href={whatsappLink} target="_blank" rel="noopener noreferrer">Atención por WhatsApp</a></li>
                <li><Link to="/catalog">Catálogo en Línea</Link></li>
                <li><Link to="/login">Acceso Clientes</Link></li>
                <li><Link to="/admin">Panel Administrativo</Link></li>
              </ul>
            </div>

          </div>

          <div className="jt-footer-bottom-bar">
            <p className="copyright-text">{cms.footer.copyright}</p>
            <div className="footer-legal-links">
              <span>Alta Joyería Hecha en México</span>
              <span>•</span>
              <span>Gemas & Metales Certificados</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
