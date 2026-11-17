import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X, Gem, ArrowRight } from 'lucide-react';
import catalogData from '../data/catalogData.json';
import gemasData from '../data/gemasData.json';
import './GlobalSearchModal.css';

export default function GlobalSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ pieces: [], gems: [] });
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults({ pieces: [], gems: [] });
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Dynamic filter
  useEffect(() => {
    const q = query.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (!q || q.length < 2) {
      setResults({ pieces: [], gems: [] });
      return;
    }

    // Match gems
    const matchedGems = gemasData.filter(g => {
      const gName = g.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const gType = g.type.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const gColors = (g.colors || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return gName.includes(q) || gType.includes(q) || gColors.includes(q);
    });

    // Match catalog pieces
    const matchedPieces = catalogData.filter(p => {
      const pName = p.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const pCat = p.category.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const pMat = (p.material || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const pGem = (p.gemstone || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return pName.includes(q) || pCat.includes(q) || pMat.includes(q) || pGem.includes(q);
    });

    setResults({
      gems: matchedGems.slice(0, 4),
      pieces: matchedPieces.slice(0, 12)
    });
  }, [query]);

  if (!isOpen) return null;

  const totalResults = results.gems.length + results.pieces.length;

  return (
    <div className="jt-search-overlay" onClick={onClose}>
      <div 
        className="jt-search-modal fade-in-up" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="jt-search-input-box">
          <Search size={22} className="search-icon-left" />
          <input
            ref={inputRef}
            type="text"
            className="jt-search-input"
            placeholder="Buscar por gema, material o pieza (ej. Diamante, Esmeralda, Oro 14K, Churumbela)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className="jt-search-clear-btn" onClick={() => setQuery('')}>
              <X size={18} />
            </button>
          )}
          <button className="jt-search-close-btn" onClick={onClose} aria-label="Cerrar buscador">
            ESC
          </button>
        </div>

        {/* Quick Suggestion Pills when empty */}
        {!query && (
          <div className="jt-search-suggestions">
            <span className="suggestions-label">Búsquedas sugeridas:</span>
            <div className="suggestions-pills">
              {['Diamante', 'Esmeralda', 'Zafiro', 'Anillos de compromiso', 'Churumbelas', 'Argollas', 'Oro 14K'].map((tag) => (
                <button 
                  key={tag} 
                  className="search-tag-pill" 
                  onClick={() => setQuery(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div className="jt-search-results-area">
            {totalResults === 0 ? (
              <div className="jt-search-empty">
                <p>No se encontraron resultados para "<strong>{query}</strong>".</p>
                <span>Prueba buscando términos como "Diamante", "Esmeralda", "Churumbela" o "Argollas".</span>
              </div>
            ) : (
              <div className="jt-search-results-scroll">
                
                {/* Gems Section */}
                {results.gems.length > 0 && (
                  <div className="jt-results-group">
                    <span className="results-group-heading">
                      <Gem size={15} style={{ marginRight: '6px' }} />
                      Gemas & Piedras Disponibles ({results.gems.length})
                    </span>
                    <div className="gem-results-grid">
                      {results.gems.map(gem => (
                        <Link 
                          key={gem.id} 
                          to={`/gemas?gema=${encodeURIComponent(gem.id)}`}
                          onClick={onClose}
                          className="gem-search-card"
                        >
                          <img src={gem.image} alt={gem.name} />
                          <div className="gem-card-info">
                            <h4>{gem.name}</h4>
                            <span className="gem-type-sub">{gem.type} • Mohs: {gem.mohs}</span>
                          </div>
                          <ArrowRight size={16} className="arrow-go" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Finished Pieces Section */}
                {results.pieces.length > 0 && (
                  <div className="jt-results-group">
                    <span className="results-group-heading">
                      Piezas de Joyería en Catálogo ({results.pieces.length})
                    </span>
                    <div className="pieces-results-grid">
                      {results.pieces.map(piece => {
                        const whatsappMsg = `Hola Jacqueline Tapia Joyería, encontré en el buscador la pieza "${piece.name}" y deseo solicitar información/cotización.`;
                        const whatsappUrl = `https://wa.me/523338427017?text=${encodeURIComponent(whatsappMsg)}`;

                        return (
                          <div key={piece.id} className="piece-search-item">
                            <div className="piece-search-thumb">
                              <img src={piece.image} alt={piece.name} loading="lazy" />
                            </div>
                            <div className="piece-search-details">
                              <span className="piece-cat">{piece.category}</span>
                              <h4 className="piece-name">{piece.name}</h4>
                              <p className="piece-spec">{piece.material} {piece.gemstone ? `• ${piece.gemstone}` : ''}</p>
                              <a 
                                href={whatsappUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn-search-quote"
                                onClick={onClose}
                              >
                                Cotización personalizada
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
