import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Menu, X, ChevronRight, Gem } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Acerca de', path: '/#acerca-de' },
    { name: 'Catálogo', path: '/catalog' },
    { name: 'Gemas', path: '/#gemas' },
    { name: 'Historias', path: '/#historias' },
    { name: 'Contacto', path: '/#contacto' },
  ];

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    if (path.includes('#')) {
      const hash = path.substring(path.indexOf('#'));
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isActive = (itemPath) => {
    if (itemPath === '/') {
      return location.pathname === '/' && !location.hash;
    }
    if (itemPath.includes('#')) {
      return location.hash === itemPath.substring(itemPath.indexOf('#'));
    }
    return location.pathname.startsWith(itemPath);
  };

  return (
    <header className="jt-navbar-header">
      {/* Top micro announcement bar */}
      <div className="jt-topbar">
        <span>Alta Joyería de Autor • Piezas personalizadas hechas a mano</span>
      </div>

      <nav className="jt-main-nav">
        <div className="jt-nav-container">
          
          {/* Mobile hamburger button */}
          <button 
            className="jt-mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Official Brand Logo */}
          <div className="jt-brand-logo">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="jt-logo-monogram">JT</span>
              <div className="jt-logo-text">
                <span className="jt-logo-name">JACQUELINE TAPIA</span>
                <span className="jt-logo-tagline">JOYERÍA FINA</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="jt-nav-menu">
            {navItems.map((item) => (
              <li key={item.name} className="jt-nav-item">
                <Link
                  to={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`jt-nav-link ${isActive(item.path) ? 'active' : ''}`}
                >
                  {item.name}
                  {isActive(item.path) && <span className="active-dot" />}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Action Icons & User Menu */}
          <div className="jt-nav-actions">
            <Link to="/order" className="btn-nav-custom d-none-mobile">
              <Gem size={14} style={{ marginRight: '6px' }} />
              <span>Diseño a Medida</span>
            </Link>

            <div className="jt-user-menu-wrapper">
              <button 
                className="jt-action-icon-btn" 
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                aria-label="Cuenta de usuario"
              >
                <User size={20} strokeWidth={1.5} />
              </button>

              {userDropdownOpen && (
                <div className="jt-user-dropdown fade-in-up">
                  <div className="dropdown-header">
                    <span>Área Privada</span>
                  </div>
                  <Link to="/login" onClick={() => setUserDropdownOpen(false)}>
                    Iniciar Sesión
                  </Link>
                  <Link to="/order" onClick={() => setUserDropdownOpen(false)}>
                    Solicitar Pieza Única
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link to="/admin" onClick={() => setUserDropdownOpen(false)}>
                    Panel Administrativo
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="jt-mobile-drawer fade-in">
            <ul className="jt-mobile-list">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    onClick={() => handleNavClick(item.path)}
                    className={`jt-mobile-link ${isActive(item.path) ? 'active' : ''}`}
                  >
                    <span>{item.name}</span>
                    <ChevronRight size={16} />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="jt-mobile-footer-actions">
              <Link to="/order" onClick={() => setMobileMenuOpen(false)} className="btn-premium filled" style={{ width: '100%', textAlign: 'center' }}>
                Crear Pieza a Medida
              </Link>
              <div className="jt-mobile-secondary-links">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Iniciar Sesión</Link>
                <span>•</span>
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>Panel Admin</Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
