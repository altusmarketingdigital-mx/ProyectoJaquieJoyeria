import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="jt-nav">
      <div className="jt-nav-container">
        <div className="jt-logo">
          <Link to="/">
            <h2>Gemora.</h2>
          </Link>
        </div>
        <div className="jt-nav-links">
          <Link to="/">INICIO</Link>
          <Link to="/catalog">TIENDA</Link>
          <Link to="/catalog">CATEGORÍAS</Link>
          <Link to="/catalog">PRODUCTOS</Link>
          <Link to="#">TOP DEALS</Link>
          <Link to="#">PÁGINAS</Link>
          <Link to="#">BLOG</Link>
        </div>
        <div className="jt-nav-actions">
          <button className="nav-icon-btn">
            <Search size={20} strokeWidth={1.5} />
          </button>
          
          <div className="jt-user-menu-wrapper" style={{position: 'relative'}}>
            <button 
              className="nav-icon-btn" 
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <User size={20} strokeWidth={1.5} />
            </button>
            
            {menuOpen && (
              <div className="jt-dropdown-menu fade-in-up" style={{
                position: 'absolute',
                top: '100%',
                right: '0',
                marginTop: '15px',
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                minWidth: '200px',
                zIndex: 1000
              }}>
                <Link to="/login" onClick={() => setMenuOpen(false)} style={{padding: '12px 20px', color: 'var(--color-text-primary)', textDecoration: 'none', fontSize: '0.85rem', borderBottom: '1px solid var(--color-border)', textTransform: 'uppercase', letterSpacing: '1px'}}>Iniciar Sesión</Link>
                <Link to="/order" onClick={() => setMenuOpen(false)} style={{padding: '12px 20px', color: 'var(--color-text-primary)', textDecoration: 'none', fontSize: '0.85rem', borderBottom: '1px solid var(--color-border)', textTransform: 'uppercase', letterSpacing: '1px'}}>Crear Pedido</Link>
                <Link to="/admin" onClick={() => setMenuOpen(false)} style={{padding: '12px 20px', color: 'var(--color-text-primary)', textDecoration: 'none', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px'}}>Panel Admin</Link>
              </div>
            )}
          </div>

          <button className="nav-icon-btn">
            <Heart size={20} strokeWidth={1.5} />
          </button>

          <button className="nav-icon-btn cart-btn">
            <ShoppingBag size={20} strokeWidth={1.5} />
            <span className="cart-badge">0</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
