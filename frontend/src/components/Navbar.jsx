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
      {/* Top micro announcement bar with social buttons */}
      <div className="jt-topbar">
        <span className="topbar-announcement">Alta Joyería de Autor • Piezas personalizadas hechas a mano</span>
        <div className="topbar-socials">
          <a href="https://www.facebook.com/jacquelinetapiajoyeria" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span>Facebook</span>
          </a>
          <span className="topbar-sep">•</span>
          <a href="https://www.instagram.com/jacquelinetapiajoyeria" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>Instagram</span>
          </a>
          <span className="topbar-sep">•</span>
          <a href="https://www.tiktok.com/@jacquelinetapiajoyeria" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.11V9.93a6.38 6.38 0 0 0-.79-.05A6.34 6.34 0 0 0 3 16.22 6.34 6.34 0 0 0 9.34 22.56c3.5 0 6.34-2.84 6.34-6.34V9.05a8.28 8.28 0 0 0 4.91 1.6V7.2a4.86 4.86 0 0 1-1-.51z"/>
            </svg>
            <span>TikTok</span>
          </a>
        </div>
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
