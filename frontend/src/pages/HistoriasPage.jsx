import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Heart, 
  Sparkles, 
  MessageCircle, 
  ArrowRight, 
  X, 
  ChevronRight,
  Gem,
  Calendar,
  Award
} from 'lucide-react';
import historiasData from '../data/historiasData.json';
import './HistoriasPage.css';

export default function HistoriasPage() {
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Close modal with ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedStory(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedStory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedStory]);

  return (
    <div className="jt-historias-page">
      <Navbar />

      {/* Hero Header */}
      <section className="jt-historias-hero">
        <div className="container">
          <div className="historias-hero-content text-center">
            <span className="section-eyebrow">Journal & Testimonios</span>
            <h1 className="historias-hero-title">Historias que Inspiran</h1>
            <p className="historias-hero-subtitle">
              “Mi pasión es plasmar en una pieza las historias de amor más bellas.”
            </p>
            <p className="historias-hero-desc">
              Cada creación es el testimonio físico de un momento irrepetible: pedidas de matrimonio, 
              nacimientos, aniversarios y tributos familiares que cobran vida en oro y gemas preciosas.
            </p>
          </div>
        </div>
      </section>

      {/* Journal Grid of Real Stories */}
      <section className="jt-historias-grid-section section-spacing">
        <div className="container">
          <div className="historias-cards-grid">
            {historiasData.map((item, idx) => (
              <article 
                key={item.id} 
                className="historia-card"
                onClick={() => setSelectedStory(item)}
              >
                <div className="historia-card-image-wrap">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="historia-card-image"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/images/ring.png';
                    }}
                  />
                  <span className="historia-card-badge">{item.category}</span>
                </div>

                <div className="historia-card-body">
                  <span className="historia-ocasion-tag">{item.details.ocasion}</span>
                  <h3 className="historia-card-title">{item.title}</h3>
                  <blockquote className="historia-card-quote">
                    "{item.quote}"
                  </blockquote>
                  <p className="historia-card-snippet">
                    {item.story.substring(0, 140)}...
                  </p>

                  <div className="historia-card-footer">
                    <span className="historia-piece-label">{item.details.pieza}</span>
                    <button 
                      className="historia-read-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStory(item);
                      }}
                    >
                      Leer Historia <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL EMERGENTE DE HISTORIA COMPLETA */}
      {selectedStory && (
        <div className="historia-modal-overlay" onClick={() => setSelectedStory(null)}>
          <div 
            className="historia-modal-dialog fade-in-up" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button 
              className="historia-modal-close" 
              onClick={() => setSelectedStory(null)}
              aria-label="Cerrar historia"
            >
              <X size={22} />
            </button>

            <div className="historia-modal-layout">
              <div className="historia-modal-media">
                <img 
                  src={selectedStory.image} 
                  alt={selectedStory.title} 
                  className="historia-modal-img"
                  onError={(e) => {
                    e.target.src = '/images/ring.png';
                  }}
                />
                <div className="historia-modal-badge">{selectedStory.category}</div>
              </div>

              <div className="historia-modal-text">
                <span className="section-eyebrow">{selectedStory.details.ocasion}</span>
                <h2 className="historia-modal-title">{selectedStory.title}</h2>
                <p className="historia-modal-tagline">"{selectedStory.tagline}"</p>

                <div className="historia-modal-quote-box">
                  <p>"{selectedStory.quote}"</p>
                </div>

                <div className="historia-modal-full-text">
                  <p>{selectedStory.story}</p>
                </div>

                {/* Technical specs of the custom piece */}
                <div className="historia-specs-card">
                  <h4>Detalles de la Creación:</h4>
                  <div className="specs-list">
                    <div className="spec-item">
                      <strong>Pieza:</strong> <span>{selectedStory.details.pieza}</span>
                    </div>
                    <div className="spec-item">
                      <strong>Gemas & Montadura:</strong> <span>{selectedStory.details.gemas}</span>
                    </div>
                    <div className="spec-item">
                      <strong>Ocasión:</strong> <span>{selectedStory.details.ocasion}</span>
                    </div>
                  </div>
                </div>

                <div className="historia-modal-actions">
                  <a 
                    href={`https://wa.me/523315206300?text=${encodeURIComponent(`Hola Jacqueline Tapia Joyería, me inspiró la historia de "${selectedStory.title}" y quisiera crear una pieza conmemorativa personalizada.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-premium gold"
                  >
                    <MessageCircle size={16} style={{ marginRight: '8px' }} />
                    Diseñar una Historia Similar
                  </a>
                  <Link 
                    to="/catalog" 
                    className="btn-premium filled"
                    onClick={() => setSelectedStory(null)}
                  >
                    Ver Catálogo
                    <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inspirational Bottom CTA */}
      <section className="jt-historias-cta-section">
        <div className="container">
          <div className="historias-cta-box">
            <div className="cta-icon-heart"><Heart size={36} /></div>
            <h2 className="cta-title">¿Cuál es tu historia de amor?</h2>
            <p className="cta-description">
              Cada promesa merece ser inmortalizada en una joya única diseñada exclusivamente para ti.
            </p>
            <div className="cta-action-links">
              <a 
                href="https://wa.me/523315206300?text=Hola,%20me%20gustar%C3%ADa%20platicar%20sobre%20el%20dise%C3%B1o%20de%20una%20pieza%20especial."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium gold"
              >
                <MessageCircle size={16} style={{ marginRight: '8px' }} />
                Platicar con la Diseñadora
              </a>
              <Link to="/order" className="btn-premium white">
                Solicitud en Línea
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
