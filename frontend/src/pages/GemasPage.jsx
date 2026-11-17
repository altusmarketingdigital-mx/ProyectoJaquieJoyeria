import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  MessageCircle, 
  Award, 
  ChevronRight, 
  X,
  Layers,
  Compass,
  CheckCircle2,
  Gem,
  ShoppingBag,
  Info
} from 'lucide-react';
import gemasData from '../data/gemasData.json';
import looseStonesData from '../data/looseStonesData.json';
import catalogData from '../data/catalogData.json';
import './GemasPage.css';

export default function GemasPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalGema, setModalGema] = useState(null);
  const [activeTab, setActiveTab] = useState('Todas'); // 'Todas', 'Piedra Preciosa', 'Piedra Semi preciosa'
  
  // Modal internal view tab: 'stones' (default, piedras disponibles) or 'pieces' (piezas terminadas)
  const [modalView, setModalView] = useState('stones'); 
  const [selectedStone, setSelectedStone] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Check URL query param to open modal directly (e.g. /gemas?gema=diamante)
  useEffect(() => {
    const gemParam = searchParams.get('gema');
    if (gemParam) {
      const found = gemasData.find(g => g.id.toLowerCase() === gemParam.toLowerCase());
      if (found) {
        handleOpenModal(found);
      }
    }
  }, [searchParams]);

  // Close modal with ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleCloseModal();
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
    setModalView('stones'); // Always default to available loose stones as requested!
    setSelectedStone(null);
  };

  const handleCloseModal = () => {
    setModalGema(null);
    setSelectedStone(null);
    if (searchParams.get('gema')) {
      searchParams.delete('gema');
      setSearchParams(searchParams);
    }
  };

  const filteredGemas = activeTab === 'Todas'
    ? gemasData
    : gemasData.filter(g => g.type === activeTab);

  const preciosas = gemasData.filter(g => g.type === 'Piedra Preciosa');
  const semiPreciosas = gemasData.filter(g => g.type === 'Piedra Semi preciosa');

  // Compute loose stones and matching finished pieces for currently opened gema
  const currentLooseStones = modalGema ? (looseStonesData[modalGema.id] || []) : [];
  
  const currentFinishedPieces = modalGema 
    ? catalogData.filter(piece => {
        const normGemName = modalGema.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const normPieceGem = (piece.gemstone || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const normPieceName = (piece.name || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return normPieceGem.includes(normGemName) || normPieceName.includes(normGemName);
      })
    : [];

  return (
    <div className="jt-gemas-page">
      <Navbar />

      {/* Header Banner */}
      <section className="jt-gemas-hero">
        <div className="container">
          <div className="gemas-hero-content text-center">
            <span className="section-eyebrow">Guía de Materiales & Gemología Orfebre</span>
            <h1 className="gemas-hero-title">Nuestras Gemas</h1>
            <p className="gemas-hero-desc">
              Cada piedra cuenta una historia geológica irrepetible. Explora nuestro inventario de piedras 
              preciosas y semipreciosas sueltas para confeccionar tu joya exclusiva sobre medida, o descubre 
              piezas terminadas de nuestra colección.
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

      {/* Grid of All Gems */}
      <section className="jt-gemas-grid-section">
        <div className="container">
          <div className="gemas-cards-grid">
            {filteredGemas.map((gem) => {
              const stonesCount = looseStonesData[gem.id] ? looseStonesData[gem.id].length : 0;
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
                    <span className="gema-stock-tag">
                      <Gem size={12} style={{ marginRight: '4px' }} />
                      {stonesCount} {stonesCount === 1 ? 'piedra disponible' : 'piedras disponibles'}
                    </span>
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
                      <span>Ver Piedras Disponibles</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MODAL EMERGENTE MEJORADO: PIEDRAS SUELTAS DISPONIBLES & PIEZAS */}
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
              <X size={20} />
            </button>

            {/* Modal Header Bar with Dual Views: Piedras Disponibles vs Colección Terminada */}
            <div className="modal-header-hero">
              <div className="modal-gem-identity">
                <span className="modal-pill">{modalGema.type} • {modalGema.highlight}</span>
                <h2 className="modal-title-main">{modalGema.name}</h2>
                <p className="modal-subtitle-tag">"{modalGema.tagline}"</p>
              </div>

              {/* View Switcher Tabs */}
              <div className="modal-nav-tabs">
                <button 
                  className={`modal-nav-tab ${modalView === 'stones' ? 'active' : ''}`}
                  onClick={() => setModalView('stones')}
                >
                  <Gem size={16} />
                  <span>Piedras Disponibles ({currentLooseStones.length})</span>
                </button>
                <button 
                  className={`modal-nav-tab ${modalView === 'pieces' ? 'active' : ''}`}
                  onClick={() => setModalView('pieces')}
                >
                  <ShoppingBag size={16} />
                  <span>Ver Piezas Terminadas ({currentFinishedPieces.length})</span>
                </button>
              </div>
            </div>

            {/* VIEW 1: PIEDRAS SUELTAS DISPONIBLES PARA FABRICAR A MEDIDA */}
            {modalView === 'stones' && (
              <div className="modal-view-container fade-in">
                <div className="modal-intro-bar">
                  <div className="intro-badge-icon">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h4 className="intro-title">Selección de Gemas Sueltas para Fabricación a Medida</h4>
                    <p className="intro-desc">
                      Elige una de las piedras actualmente disponibles en nuestro taller orfebre para iniciar tu diseño personalizado. Cada gema cuenta con autenticidad garantizada y proporciones ideales para engastes exclusivos.
                    </p>
                  </div>
                </div>

                <div className="loose-stones-grid">
                  {currentLooseStones.map((stone) => {
                    const isSelected = selectedStone?.id === stone.id;
                    const whatsappStoneMsg = `Hola Jacqueline Tapia Joyería, me interesa la piedra disponible "${stone.name}" (${stone.cut}, ${stone.carat}, ${stone.color}) para iniciar el diseño de una joya personalizada.`;

                    return (
                      <div 
                        key={stone.id} 
                        className={`loose-stone-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedStone(stone)}
                      >
                        <div className="stone-card-top">
                          <div className="stone-thumb-wrapper">
                            <img src={stone.image} alt={stone.name} className="stone-thumb" />
                            <span className="stone-status-chip">
                              <CheckCircle2 size={12} />
                              {stone.status}
                            </span>
                          </div>

                          <div className="stone-primary-info">
                            <span className="stone-cut-badge">{stone.cut}</span>
                            <h3 className="stone-card-title">{stone.name}</h3>
                            <div className="stone-quick-specs">
                              <div className="qspec">
                                <span className="qlabel">Peso / Medida:</span>
                                <strong className="qval">{stone.carat}</strong>
                              </div>
                              <div className="qspec">
                                <span className="qlabel">Color:</span>
                                <strong className="qval">{stone.color}</strong>
                              </div>
                              <div className="qspec">
                                <span className="qlabel">Claridad / Pureza:</span>
                                <strong className="qval">{stone.clarity}</strong>
                              </div>
                              <div className="qspec">
                                <span className="qlabel">Dimensiones:</span>
                                <strong className="qval">{stone.dimensions}</strong>
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="stone-card-desc">{stone.description}</p>

                        <div className="stone-origin-box">
                          <span className="origin-lbl">Origen y Certificación:</span>
                          <span className="origin-val">{stone.origin} • {stone.certification}</span>
                        </div>

                        <div className="stone-card-footer">
                          <a 
                            href={`https://wa.me/523315206300?text=${encodeURIComponent(whatsappStoneMsg)}`}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-stone-quote"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MessageCircle size={16} />
                            Apartar y Cotizar Diseño con Esta Gema
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Technical Characteristics Box (Collapsible / Bottom Overview) */}
                <div className="gem-technical-summary">
                  <div className="tech-summary-header">
                    <Info size={18} />
                    <span>Ficha Gemológica General: {modalGema.name}</span>
                  </div>
                  <div className="tech-summary-content">
                    <p className="tech-desc">{modalGema.description}</p>
                    <div className="tech-pills-row">
                      <div className="tech-pill">
                        <strong>Dureza Mohs:</strong> {modalGema.mohs}
                      </div>
                      <div className="tech-pill">
                        <strong>Gama de Colores:</strong> {modalGema.colors}
                      </div>
                      <div className="tech-pill">
                        <strong>Garantía:</strong> Taller Orfebre Certificado JT
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Alternate Action */}
                <div className="modal-bottom-alternative">
                  <span>¿Prefieres ver modelos ya montados?</span>
                  <button 
                    className="link-switch-view"
                    onClick={() => setModalView('pieces')}
                  >
                    Explorar {currentFinishedPieces.length} piezas terminadas con {modalGema.name} →
                  </button>
                </div>
              </div>
            )}

            {/* VIEW 2: PIEZAS TERMINADAS EN CATÁLOGO */}
            {modalView === 'pieces' && (
              <div className="modal-view-container fade-in">
                <div className="modal-intro-bar pieces-mode">
                  <div className="intro-badge-icon">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <h4 className="intro-title">Piezas Terminadas con {modalGema.name}</h4>
                    <p className="intro-desc">
                      Descubre joyas de nuestro catálogo oficial montadas artesanalmente con {modalGema.name}. Puedes solicitar cualquier pieza con variaciones en metal (oro blanco, amarillo o rosa de 14K/18K).
                    </p>
                  </div>
                </div>

                {currentFinishedPieces.length > 0 ? (
                  <div className="finished-pieces-grid">
                    {currentFinishedPieces.map((piece) => (
                      <div key={piece.id} className="finished-piece-card">
                        <div className="piece-img-wrap">
                          <img src={piece.image} alt={piece.name} loading="lazy" />
                          <span className="piece-cat-badge">{piece.category}</span>
                        </div>
                        <div className="piece-info-box">
                          <h4 className="piece-title">{piece.name}</h4>
                          <p className="piece-meta">{piece.material} • {piece.gemstone}</p>
                          <div className="piece-actions">
                            <a 
                              href={`https://wa.me/523315206300?text=${encodeURIComponent(`Hola Jacqueline Tapia Joyería, deseo cotizar la pieza "${piece.name}" montada con ${modalGema.name}.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-piece-quote"
                            >
                              <MessageCircle size={14} />
                              Cotizar Pieza
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-pieces-card">
                    <Gem size={32} />
                    <h3>Diseño Exclusivo a Medida</h3>
                    <p>Actualmente no hay piezas pre-diseñadas en catálogo para entrega inmediata con {modalGema.name}, pero contamos con piedras disponibles en taller para diseñar tu anillo, dije o aretes desde cero.</p>
                    <button 
                      className="btn-premium filled small"
                      onClick={() => setModalView('stones')}
                      style={{ marginTop: '1rem' }}
                    >
                      Ver Piedras Sueltas Disponibles
                    </button>
                  </div>
                )}

                {/* Bottom Switch to Stones */}
                <div className="modal-bottom-alternative">
                  <span>¿Buscas una piedra suelta para un diseño personalizado?</span>
                  <button 
                    className="link-switch-view"
                    onClick={() => setModalView('stones')}
                  >
                    ← Ver inventario de piedras disponibles ({currentLooseStones.length})
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Orfebrería y Compromiso de Autenticidad */}
      <section className="jt-gemas-commitment-section">
        <div className="container">
          <div className="commitment-card">
            <div className="commitment-text">
              <span className="section-eyebrow-light">Garantía de Origen & Taller Orfebre</span>
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

      <Footer />
    </div>
  );
}
