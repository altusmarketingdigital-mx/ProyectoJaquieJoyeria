import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  SlidersHorizontal, 
  MessageCircle, 
  Award,
  Layers,
  ChevronRight,
  X
} from 'lucide-react';
import gemasData from '../data/gemasData.json';
import './GemasPage.css';

export default function GemasPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalGema, setModalGema] = useState(null);
  const [activeTab, setActiveTab] = useState('Todas'); // 'Todas', 'Piedra Preciosa', 'Piedra Semi preciosa'

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Close modal with ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setModalGema(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (modalGema) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalGema]);

  const handleOpenModal = (gem) => {
    setModalGema(gem);
  };

  const handleCloseModal = () => {
    setModalGema(null);
  };

  const filteredGemas = activeTab === 'Todas'
    ? gemasData
    : gemasData.filter(g => g.type === activeTab);

  const preciosas = gemasData.filter(g => g.type === 'Piedra Preciosa');
  const semiPreciosas = gemasData.filter(g => g.type === 'Piedra Semi preciosa');

  return (
    <div className="jt-gemas-page">
      <Navbar />

      {/* Header Banner */}
      <section className="jt-gemas-hero">
        <div className="container">
          <div className="gemas-hero-content text-center">
            <span className="section-eyebrow">Guía de Materiales & Gemología</span>
            <h1 className="gemas-hero-title">Nuestras Gemas</h1>
            <p className="gemas-hero-desc">
              Cada piedra cuenta una historia geológica única. Conoce la pureza, dureza, colores y virtudes 
              de las piedras preciosas y semipreciosas seleccionadas artesanalmente para cada una de nuestras piezas.
            </p>

            <div className="gemas-filter-tabs">
              <button 
                className={`gemas-tab ${activeTab === 'Todas' ? 'active' : ''}`}
                onClick={() => setActiveTab('Todas')}
              >
                Todas las Gemas ({gemasData.length})
              </button>
              <button 
                className={`gemas-tab ${activeTab === 'Piedra Preciosa' ? 'active' : ''}`}
                onClick={() => setActiveTab('Piedra Preciosa')}
              >
                Piedras Preciosas ({preciosas.length})
              </button>
              <button 
                className={`gemas-tab ${activeTab === 'Piedra Semi preciosa' ? 'active' : ''}`}
                onClick={() => setActiveTab('Piedra Semi preciosa')}
              >
                Piedras Semipreciosas ({semiPreciosas.length})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of All Gems (Colección Completa de Gemas) */}
      <section className="jt-gemas-grid-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-eyebrow">Exploración de Gemas</span>
            <h2 className="section-heading">Selecciona una Gema para Conocer sus Características</h2>
            <p className="section-subheading">
              Haz click en "Ver Características" en cualquiera de las gemas para abrir su ficha técnica completa, dureza y piezas disponibles en pantalla emergente.
            </p>
          </div>

          <div className="gemas-cards-grid">
            {filteredGemas.map((gem) => {
              return (
                <div 
                  key={gem.id} 
                  className="gema-card"
                  onClick={() => handleOpenModal(gem)}
                >
                  <div className="gema-card-img-wrap">
                    <img 
                      src={gem.image} 
                      alt={gem.name} 
                      className="gema-card-img"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = '/images/ring.png';
                      }}
                    />
                    <span className="gema-card-pill">{gem.type}</span>
                  </div>

                  <div className="gema-card-body">
                    <h3 className="gema-card-title">{gem.name}</h3>
                    <p className="gema-card-tagline">{gem.tagline}</p>
                    
                    <div className="gema-card-meta">
                      <div className="gema-meta-item">
                        <span className="meta-lbl">Escala Mohs:</span>
                        <span className="meta-val">{gem.mohs}</span>
                      </div>
                    </div>

                    <button 
                      className="gema-card-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal(gem);
                      }}
                    >
                      Ver Características
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MODAL EMERGENTE DE CARACTERÍSTICAS DE LA GEMA */}
      {modalGema && (
        <div className="gema-modal-overlay" onClick={handleCloseModal}>
          <div 
            className="gema-modal-dialog fade-in-up" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button 
              className="gema-modal-close" 
              onClick={handleCloseModal}
              aria-label="Cerrar ventana"
            >
              <X size={22} />
            </button>

            <div className="gema-modal-content">
              <div className="gema-modal-media">
                <img 
                  src={modalGema.image} 
                  alt={modalGema.name} 
                  className="gema-modal-image"
                  onError={(e) => {
                    e.target.src = '/images/ring.png';
                  }}
                />
                <span className="gema-badge">{modalGema.type}</span>
              </div>

              <div className="gema-modal-info">
                <div className="gema-featured-header">
                  <span className="gema-highlight-label">{modalGema.highlight}</span>
                  <h2 className="gema-modal-title">{modalGema.name}</h2>
                  <p className="gema-tagline">"{modalGema.tagline}"</p>
                </div>

                <p className="gema-full-description">
                  {modalGema.description}
                </p>

                <div className="gema-specs-grid">
                  <div className="gema-spec-box">
                    <div className="spec-label">Escala de Mohs</div>
                    <div className="spec-value">{modalGema.mohs}</div>
                    <div className="spec-sub">Resistencia y dureza al rayado</div>
                  </div>

                  <div className="gema-spec-box">
                    <div className="spec-label">Colores Disponibles</div>
                    <div className="spec-value-colors">{modalGema.colors}</div>
                    <div className="spec-sub">Tonalidades y matices naturales</div>
                  </div>
                </div>

                <div className="gema-featured-actions">
                  <Link 
                    to={`/catalog?categoria=${encodeURIComponent(modalGema.catalogCategory || 'Todos')}`} 
                    className="btn-premium filled"
                    onClick={handleCloseModal}
                  >
                    Ver Piezas con {modalGema.name}
                    <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                  </Link>

                  <a 
                    href={`https://wa.me/523315206300?text=${encodeURIComponent(`Hola Jacqueline Tapia Joyería, deseo cotizar una joya personalizada montada con ${modalGema.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-premium gold"
                  >
                    <MessageCircle size={16} style={{ marginRight: '8px' }} />
                    Cotizar con {modalGema.name}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Orfebrería y Compromiso de Autenticidad */}
      <section className="jt-gemas-commitment-section">
        <div className="container">
          <div className="commitment-card">
            <div className="commitment-text">
              <span className="section-eyebrow-light">Garantía de Origen</span>
              <h2 className="commitment-title">Autenticidad y Calidad Certificada</h2>
              <p className="commitment-desc">
                En Jacqueline Tapia Joyería seleccionamos cada gema por su color, pureza y corte superior.
                Trabajamos con diamantes con certificación internacional y gemas naturales de la más alta gama, 
                garantizando piezas que trascienden generaciones.
              </p>
              <div className="commitment-badges">
                <div className="badge-item">
                  <ShieldCheck size={20} />
                  <span>Gemas 100% Auténticas</span>
                </div>
                <div className="badge-item">
                  <Award size={20} />
                  <span>Certificación Gemológica</span>
                </div>
                <div className="badge-item">
                  <Sparkles size={20} />
                  <span>Montaje de Precisión</span>
                </div>
              </div>
            </div>

            <div className="commitment-action">
              <a 
                href="https://wa.me/523315206300?text=Hola,%20quisiera%20asesor%C3%ADa%20personalizada%20sobre%20las%20gemas%20para%20un%20dise%C3%B1o%20especial."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium gold"
              >
                <MessageCircle size={18} style={{ marginRight: '8px' }} />
                Asesoría con un Gemólogo
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
