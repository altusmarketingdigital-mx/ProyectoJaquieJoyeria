import React, { useState, useEffect, useMemo } from 'react';
import { Search, FileText, Download, Eye } from 'lucide-react';

export default function CertificatesModule({ openCertModal }) {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const res = await fetch('http://localhost:4000/api/admin/certificates', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setCertificates(data);
        } else {
          setError('Error al cargar los certificados');
        }
      } catch (err) {
        setError('Error de red');
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  const filteredCerts = useMemo(() => {
    return certificates.filter(cert => {
      const matchFolio = cert.orderId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCertNum = cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchModel = cert.modelo ? cert.modelo.toLowerCase().includes(searchTerm.toLowerCase()) : false;
      return matchFolio || matchCertNum || matchModel;
    });
  }, [certificates, searchTerm]);

  const viewPdf = (orderId) => {
    window.open(`http://localhost:4000/api/orders/${orderId}/certificate/pdf`, '_blank');
  };

  if (loading) return <div className="admin-content-area" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>Cargando certificados...</div>;
  if (error) return <div className="admin-content-area" style={{display:'flex', justifyContent:'center', alignItems:'center', color:'red'}}>{error}</div>;

  return (
    <div className="admin-content-area fade-in">
      <div className="admin-page-header">
        <h1>Módulo de Certificados</h1>
        <button className="btn-premium filled small" onClick={() => openCertModal(null)}>
          + Nuevo Certificado
        </button>
      </div>

      <div className="module-controls">
        <div className="search-bar" style={{ width: '100%', maxWidth: '400px' }}>
          <Search size={18} color="#aaa" />
          <input 
            type="text" 
            placeholder="Buscar por Folio, Num. Certificado o Modelo..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-table-container mt-20">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Num. Certificado</th>
              <th>Folio Pedido</th>
              <th>Fecha Emisión</th>
              <th>Modelo</th>
              <th>Material</th>
              <th style={{textAlign: 'right'}}>PDF</th>
            </tr>
          </thead>
          <tbody>
            {filteredCerts.map(cert => (
              <tr key={cert.id}>
                <td style={{fontWeight: '600', color: '#2b3b8c'}}>{cert.certificateNumber}</td>
                <td>{cert.orderId}</td>
                <td>{new Date(cert.createdAt).toLocaleDateString()}</td>
                <td>{cert.modelo || '-'}</td>
                <td>{cert.material}</td>
                <td style={{textAlign: 'right'}}>
                  <button className="btn-icon-soft" onClick={() => viewPdf(cert.orderId)} title="Ver PDF Generado">
                    <FileText size={18} color="#2b3b8c" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredCerts.length === 0 && (
              <tr>
                <td colSpan="6" style={{textAlign: 'center', padding: '40px', color: '#888'}}>
                  No se encontraron certificados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
