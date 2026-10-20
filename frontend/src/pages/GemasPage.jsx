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
  ChevronRight
} from 'lucide-react';
import gemasData from '../data/gemasData.json';
import './GemasPage.css';

export default function GemasPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialGemaId = searchParams.get('piedra') || 'diamante';
  const [selectedGemaId, setSelectedGemaId] = useState(initialGemaId);
  const [activeTab, setActiveTab] = useState('Todas'); // 'Todas', 'Piedra Preciosa', 'Piedra Semi preciosa'

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const p = searchParams.get('piedra');
    if (p) setSelectedGemaId(p);
  }, [searchParams]);

  const selectedGema = gemasData.find(g => g.id === selectedGemaId) || gemasData[0];

  const handleSelectGema = (id) => {
    setSelectedGemaId(id);
    setSearchParams({ piedra: id });
    const viewer = document.getElementById('gema-viewer');
    if (viewer) {
      viewer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

      {/* Featured Gem Viewer (Ficha Técnica Interactiva) */}
      <section id="gema-viewer" className="jt-gema-viewer-section">
        <div className="container">
          <div className="gema-featured-card">
            <div className="gema-featured-image-wrap">
              <img 
                src={selectedGema.image} 
                alt={selectedGema.name} 
                className="gema-featured-image"
                onError={(e) => {
                  e.target.src = '/images/ring.png';
                }}
              />
              <span className="gema-badge">{selectedGema.type}</span>
            </div>

            <div className="gema-featured-info">
              <div className="gema-featured-header">
                <span className="gema-highlight-label">{selectedGema.highlight}</span>
                <h2 className="gema-featured-name">{selectedGema.name}</h2>
                <p className="gema-tagline">"{selectedGema.tagline}"</p>
              </div>

              <p className="gema-full-description">
                {selectedGema.description}
              </p>

              <div className="gema-specs-grid">
                <div className="gema-spec-box">
                  <div className="spec-label">Escala de Mohs</div>
                  <div className="spec-value">{selectedGema.mohs}</div>
                  <div className="spec-sub">Resistencia al rayado</div>
                </div>

                <div className="gema-spec-box">
                  <div className="spec-label">Colores Disponibles</div>
                  <div className="spec-value-colors">{selectedGema.colors}</div>
                  <div className="spec-sub">Tonalidades naturales</div>
                </div>
              </div>

              <div className="gema-featured-actions">
                <Link 
                  to={`/catalog?categoria=${encodeURIComponent(selectedGema.catalogCategory || 'Todos')}`} 
                  className="btn-premium filled"
                >
                  Ver Piezas con {selectedGema.name}
                  <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                </Link>

                <a 
                  href={`https://wa.me/523315206300?text=${encodeURIComponent(`Hola Jacqueline Tapia Joyería, deseo cotizar una joya personalizada montada con ${selectedGema.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium gold"
                >
                  <MessageCircle size={16} style={{ marginRight: '8px' }} />
                  Cotizar con {selectedGema.name}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of All Gems (Colección Completa de Gemas) */}
      <section className="jt-gemas-grid-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-eyebrow">Exploración de Gemas</span>
            <h2 className="section-heading">Selecciona una Gema para Conocer sus Detalles</h2>
            <p className="section-subheading">
              Haz click en cualquiera de las gemas para consultar su ficha técnica, dureza y piezas disponibles.
            </p>
          </div>

          <div className="gemas-cards-grid">
            {filteredGemas.map((gem) => {
              const isSelected = gem.id === selectedGemaId;
              return (
                <div 
                  key={gem.id} 
                  className={`gema-card ${isSelected ? 'active-selected' : ''}`}
                  onClick={() => handleSelectGema(gem.id)}
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
                        <span className="meta-lbl">Mohs:</span>
                        <span className="meta-val">{gem.mohs}</span>
                      </div>
                    </div>

                    <button className="gema-card-btn">
                      {isSelected ? 'Seleccionada' : 'Ver Características'}
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

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
