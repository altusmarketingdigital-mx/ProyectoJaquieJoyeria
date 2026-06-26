import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './OrderFlow.css';

export default function OrderFlow() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    producto: 'Anillo de Compromiso',
    material: 'Oro Amarillo 18k',
    talla: '7',
    mensaje: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    setStep(1);
  }, []);

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({
          userId: 'guest',
          productId: formData.producto,
          customization: formData,
        }),
      });

      if (res.ok) {
        setStep(4);
        setTimeout(() => {
          navigate('/');
        }, 4000);
      } else {
        alert('Error al enviar el pedido. Por favor, intenta nuevamente.');
      }
    } catch (error) {
      console.error(error);
      alert('Error de conexión con el servidor.');
    }
  };

  return (
    <div className="order-page fade-in">
      <Navbar />

      <div className="split-layout">
        <div 
          className="split-image" 
          style={{ backgroundImage: `url('/images/editorial_order.png')` }}
        ></div>
        
        <div className="split-content">
          <div className="order-container fade-in-up">
            <div className="order-header">
              <h2>Alta Joyería a Medida</h2>
              <p>Inicie su pedido de diseño personalizado.</p>
            </div>

            {step < 4 && (
              <div className="step-indicator">
                <div className={`step ${step >= 1 ? 'active' : ''}`}>I</div>
                <div className={`step ${step >= 2 ? 'active' : ''}`}>II</div>
                <div className={`step ${step >= 3 ? 'active' : ''}`}>III</div>
              </div>
            )}

            <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
              
              {step === 1 && (
                <div className="step-content fade-in">
                  <div className="form-group editorial-input">
                    <label htmlFor="nombre">Nombre Completo</label>
                    <input id="nombre" type="text" name="nombre" className="form-control" required 
                           value={formData.nombre} onChange={handleChange} placeholder="Ingrese su nombre" />
                  </div>
                  <div className="form-group editorial-input">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input id="email" type="email" name="email" className="form-control" required 
                           value={formData.email} onChange={handleChange} placeholder="correo@ejemplo.com" />
                  </div>
                  <div className="form-group editorial-input">
                    <label htmlFor="telefono">Teléfono</label>
                    <input id="telefono" type="tel" name="telefono" className="form-control" required 
                           value={formData.telefono} onChange={handleChange} placeholder="55 1234 5678" />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="step-content fade-in">
                  <div className="form-group editorial-input">
                    <label htmlFor="producto">Tipo de Joya</label>
                    <select id="producto" name="producto" className="form-control" value={formData.producto} onChange={handleChange}>
                      <option>Anillo de Compromiso</option>
                      <option>Argollas de Matrimonio</option>
                      <option>Collar / Gargantilla</option>
                      <option>Pulsera</option>
                      <option>Aretes</option>
                    </select>
                  </div>
                  <div className="form-group editorial-input">
                    <label htmlFor="material">Metal Precioso</label>
                    <select id="material" name="material" className="form-control" value={formData.material} onChange={handleChange}>
                      <option>Oro Amarillo 18k</option>
                      <option>Oro Blanco 18k</option>
                      <option>Oro Rosa 18k</option>
                      <option>Platino</option>
                    </select>
                  </div>
                  <div className="form-group editorial-input">
                    <label htmlFor="talla">Talla (Opcional)</label>
                    <input id="talla" type="text" name="talla" className="form-control" 
                           value={formData.talla} onChange={handleChange} placeholder="Ej. 7, 8, etc." />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="step-content fade-in">
                  <div className="form-group editorial-input">
                    <label htmlFor="mensaje">Detalles Adicionales</label>
                    <textarea id="mensaje" name="mensaje" className="form-control" rows="2" 
                              value={formData.mensaje} onChange={handleChange}
                              placeholder="Grabados, piedras específicas o ideas..."></textarea>
                  </div>
                  
                  <div className="summary-details">
                    <div className="summary-row">
                      <span>Pieza:</span>
                      <strong>{formData.producto} en {formData.material}</strong>
                    </div>
                    <div className="summary-row">
                      <span>A nombre de:</span>
                      <strong>{formData.nombre || 'No especificado'}</strong>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="success-message fade-in">
                  <h3 className="editorial-title" style={{textAlign: 'center', marginBottom: '20px'}}>Solicitud Enviada</h3>
                  <p style={{textAlign: 'center'}}>Sus deseos han sido recibidos. Nuestro equipo de diseño se pondrá en contacto a la brevedad.</p>
                </div>
              )}

              {step < 4 && (
                <div className="form-actions">
                  {step > 1 ? (
                    <button type="button" className="btn-secondary" onClick={handlePrev}>Regresar</button>
                  ) : (
                    <div></div>
                  )}
                  <button type="submit" className="btn-premium filled">
                    {step === 3 ? 'Solicitar Cotización' : 'Continuar'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
