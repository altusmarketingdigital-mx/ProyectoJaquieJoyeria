import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorToast from '../components/ErrorToast';

const buttonStyle = {
  background: "linear-gradient(135deg, hsl(45, 80%, 65%), hsl(55, 85%, 70%))",
  border: "none",
  borderRadius: "8px",
  color: "#fff",
  padding: "0.5rem 1rem",
  cursor: "pointer",
  fontWeight: "600",
  fontFamily: "'Outfit', sans-serif",
  marginRight: "0.5rem",
};

export default function QuotationView() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`${API_URL}/api/orders/${orderId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        });
        if (!res.ok) throw new Error('Failed to load order');
        const data = await res.json();
        setOrder(data);
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const downloadPdf = () => {
    // open PDF in new tab
    const pdfUrl = `${API_URL}/api/orders/${orderId}/quotation/pdf?token=${localStorage.getItem('jwt')}`;
    window.open(pdfUrl, '_blank');
  };

  const acceptQuotation = () => {
    alert('Cotización aceptada (placeholder)');
    // In a full implementation you would call an endpoint to update order status
    navigate('/catalog');
  };

  const requestAdjustment = () => {
    alert('Solicitar ajuste (placeholder)');
    // Could open a modal to send a message to admin
  };

  if (loading) return <LoadingSpinner />;

  if (!order) return <div>No se encontró la orden.</div>;

  const { quotation } = order;

  return (
    <div style={{ padding: '2rem', fontFamily: "'Outfit', sans-serif" }}>
      <h2>Cotización para tu pedido</h2>
      {quotation ? (
        <div>
          <p><strong>Título:</strong> {quotation.title}</p>
          <p><strong>Descripción:</strong> {quotation.description}</p>
          <p><strong>Precio:</strong> {quotation.price} {quotation.currency}</p>
          <button style={buttonStyle} onClick={downloadPdf}>Descargar PDF</button>
          <button style={buttonStyle} onClick={acceptQuotation}>Aceptar</button>
          <button style={buttonStyle} onClick={requestAdjustment}>Solicitar ajuste</button>
        </div>
      ) : (
        <p>Aún no hay cotización disponible. Por favor, espera a que el administrador la genere.</p>
      )}
      <ErrorToast message={error} onClose={() => setError('')} />
    </div>
  );
}
