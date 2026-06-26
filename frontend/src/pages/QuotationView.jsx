import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './QuotationView.css';

export default function QuotationView() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/orders/${orderId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setOrder(data);
        } else {
          setError("Error fetching order");
        }
      } catch (err) {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const acceptQuotation = () => {
    alert('¡Cotización aceptada! Nos pondremos en contacto para el pago.');
    navigate('/');
  };

  const requestAdjustment = () => {
    alert('Solicitud de ajuste enviada. Un asesor se comunicará pronto.');
  };

  if (loading) return <div className="loading" style={{height:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>Cargando...</div>;
  if (error) return <div className="error" style={{height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', color:'red'}}>{error}</div>;

  return (
    <div className="quotation-page">
      <Navbar />

      <div className="invoice-container">
        <div className="invoice-header">
          <div className="brand-section">
            <h2>Jacqueline Tapia</h2>
            <p>FINE JEWELRY</p>
          </div>
          <div className="meta-section">
            <h3>COTIZACIÓN</h3>
            <p><strong>Folio:</strong> #{orderId || 'JT-0924'}</p>
            <p><strong>Fecha:</strong> {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="invoice-client">
          <h4>Datos del Cliente</h4>
          <p><strong>Nombre:</strong> Ana García</p>
          <p><strong>Correo:</strong> ana@ejemplo.com</p>
          <p><strong>Teléfono:</strong> 55 1234 5678</p>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Descripción del Diseño</th>
              <th style={{textAlign: 'right'}}>Precio Estimado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="item-name">Anillo de Compromiso - Diseño a Medida</div>
                <div className="item-desc">
                  Material: Oro Amarillo 18k<br/>
                  Talla: 7<br/>
                  Detalles: Diamante central corte brillante (0.5 ct), montura clásica de 6 uñas.
                </div>
              </td>
              <td className="item-price" style={{textAlign: 'right', verticalAlign: 'top'}}>$ 28,500.00 MXN</td>
            </tr>
            <tr>
              <td>
                <div className="item-name">Servicio de Grabado</div>
                <div className="item-desc">Interior de la banda: "A & B 2026"</div>
              </td>
              <td className="item-price" style={{textAlign: 'right', verticalAlign: 'top'}}>$ 500.00 MXN</td>
            </tr>
          </tbody>
        </table>

        <div className="invoice-totals">
          <div className="total-row">
            <span>Subtotal:</span>
            <span>$ 29,000.00 MXN</span>
          </div>
          <div className="total-row">
            <span>IVA (16%):</span>
            <span>$ 4,640.00 MXN</span>
          </div>
          <div className="total-row grand">
            <span>Total:</span>
            <span className="amount">$ 33,640.00 MXN</span>
          </div>
        </div>

        <div className="invoice-actions">
          <button className="btn-secondary" onClick={requestAdjustment}>Solicitar Ajuste</button>
          <button className="btn-premium filled" onClick={acceptQuotation}>Aceptar y Continuar</button>
        </div>
      </div>
    </div>
  );
}
