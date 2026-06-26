import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './LoginPage.css';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const endpoint = isLogin ? 'http://localhost:4000/api/auth/login' : 'http://localhost:4000/api/auth/register';
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('jwt', data.token);
        // decode token to see role
        const payload = JSON.parse(atob(data.token.split('.')[1]));
        if (payload.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/catalog');
        }
      } else {
        setError(data.error || 'Credenciales inválidas');
      }
    } catch (err) {
      setError('Error de conexión');
    }
  };

  return (
    <div className="login-page fade-in">
      <Navbar />
      
      <div className="split-layout">
        <div 
          className="split-image" 
          style={{ backgroundImage: `url('/images/editorial_login.png')` }}
        ></div>
        
        <div className="split-content">
          <div className="login-container fade-in-up" style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
            
            <div className="order-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
              <h2 className="editorial-title">Acceso Privado</h2>
              <p className="editorial-subtitle">Bienvenido de vuelta a Jacqueline Tapia.</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group editorial-input">
                <label htmlFor="email">Correo Electrónico</label>
                <input 
                  type="email" 
                  id="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="form-control"
                  placeholder="correo@ejemplo.com"
                />
              </div>
              
              <div className="form-group editorial-input">
                <label htmlFor="password">Contraseña</label>
                <input 
                  type="password" 
                  id="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="form-control"
                  placeholder="••••••••"
                />
              </div>

              {error && <div className="error-message fade-in">{error}</div>}

              <button type="submit" className="btn-premium filled" style={{ width: '100%', marginTop: '1rem' }}>
                {isLogin ? 'Ingresar' : 'Crear Cuenta'}
              </button>
            </form>

            <div className="login-toggle">
              {isLogin ? '¿No tiene una cuenta?' : '¿Ya es cliente?'}
              <button type="button" onClick={() => setIsLogin(!isLogin)} style={{
                background: 'none', border: 'none', color: 'var(--color-text-primary)', 
                fontFamily: 'var(--font-heading)', fontSize: '1rem', fontStyle: 'italic',
                cursor: 'pointer', textDecoration: 'underline', marginLeft: '10px'
              }}>
                {isLogin ? 'Regístrese aquí' : 'Inicie sesión'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
