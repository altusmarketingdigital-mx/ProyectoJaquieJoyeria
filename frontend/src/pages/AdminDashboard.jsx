import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Gem, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  Eye, 
  Award,
  TrendingUp,
  UserPlus
} from 'lucide-react';
import './AdminDashboard.css';

import OrdersModule from '../components/admin/OrdersModule';
import ClientsModule from '../components/admin/ClientsModule';
import SettingsModule from '../components/admin/SettingsModule';
import CertificatesModule from '../components/admin/CertificatesModule';
import CatalogModule from '../components/admin/CatalogModule';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [showCertModal, setShowCertModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [certData, setCertData] = useState({ 
    orderId: '', 
    modelo: '',
    material: '', 
    weight: '', 
    carat: '',
    pureza: '',
    color: '',
    corte: '',
    piedraNatural: '',
    imagenJoyaUrl: '',
    gemDetails: '' 
  });

  const [currentView, setCurrentView] = useState('dashboard');
  
  // (Effect and other functions remain the same)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) {
          navigate('/login');
          return;
        }
        
        const res = await fetch('http://localhost:4000/api/orders', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        } else {
          setError("Error fetching orders");
        }
      } catch (err) {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/login');
  };

  const viewOrder = (id) => {
    navigate(`/quotation/${id.replace('JT-', '')}`);
  };

  const openCertModal = (orderId) => {
    setSelectedOrder(orderId);
    setCertData({ 
      orderId: '', 
      modelo: '',
      material: '', 
      weight: '', 
      carat: '',
      pureza: '',
      color: '',
      corte: '',
      piedraNatural: '',
      imagenJoyaUrl: '',
      gemDetails: '' 
    });
    setShowCertModal(true);
  };

  const handleCertGenerate = async (e) => {
    e.preventDefault();
    const targetOrderId = selectedOrder || certData.orderId;
    if (!targetOrderId) {
      alert('Por favor ingrese el Folio del Pedido');
      return;
    }
    
    try {
      const token = localStorage.getItem('jwt');
      const res = await fetch(`http://localhost:4000/api/orders/${targetOrderId}/certificate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(certData)
      });
      if (res.ok) {
        alert('Certificado generado exitosamente');
        setShowCertModal(false);
        window.open(`http://localhost:4000/api/orders/${targetOrderId}/certificate/pdf`, '_blank');
      } else {
        alert('Error al generar el certificado. Verifique que el Folio sea correcto.');
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <span className="status-badge status-pending">Pendiente</span>;
      case 'processing': return <span className="status-badge status-processing">En Producción</span>;
      case 'completed': return <span className="status-badge status-completed">Completado</span>;
      default: return <span className="status-badge">{status}</span>;
    }
  };

  if (loading) return <div className="loading" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando...</div>;
  if (error) return <div className="error" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'red' }}>{error}</div>;

  const renderContent = () => {
    if (currentView === 'pedidos') {
      return <OrdersModule orders={orders} viewOrder={viewOrder} openCertModal={openCertModal} getStatusBadge={getStatusBadge} />;
    }
    if (currentView === 'clientes') {
      return <ClientsModule />;
    }
    if (currentView === 'catalogo') {
      return <CatalogModule />;
    }
    if (currentView === 'certificados') {
      return <CertificatesModule openCertModal={openCertModal} />;
    }
    if (currentView === 'ajustes') {
      return <SettingsModule />;
    }

    // Default dashboard view
    return (
      <div className="admin-content-area">
        <div className="admin-page-header">
          <h1>Resumen General</h1>
          <button className="btn-premium filled small">+ Nuevo Pedido</button>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">Ventas del Mes</span>
              <div className="stat-icon"><TrendingUp size={20} /></div>
            </div>
            <div className="stat-value">$119,140</div>
            <div className="stat-trend trend-up">↑ 12% vs mes anterior</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">Pedidos Activos</span>
              <div className="stat-icon"><ShoppingBag size={20} /></div>
            </div>
            <div className="stat-value">{orders.length}</div>
            <div className="stat-trend trend-up">↑ 2 nuevos hoy</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">Nuevos Clientes</span>
              <div className="stat-icon"><UserPlus size={20} /></div>
            </div>
            <div className="stat-value">12</div>
            <div className="stat-trend trend-down">↓ 3% vs mes anterior</div>
          </div>
        </div>

        <h3 className="section-title">Pedidos Recientes</h3>
        
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Folio</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Artículo</th>
                <th>Total</th>
                <th>Estado</th>
                <th style={{textAlign: 'right'}}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td style={{fontWeight: '600'}}>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.client}</td>
                  <td>{order.item}</td>
                  <td style={{fontWeight: '500'}}>{order.total}</td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td style={{textAlign: 'right'}}>
                    <div className="action-buttons" style={{justifyContent: 'flex-end'}}>
                      <button className="btn-icon-soft" onClick={() => viewOrder(order.id)} title="Ver Detalles">
                        <Eye size={18} />
                      </button>
                      <button className="btn-icon-soft" onClick={() => openCertModal(order.id)} title="Generar Certificado">
                        <Award size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="7" style={{textAlign: 'center', padding: '40px', color: '#888'}}>
                    No hay pedidos recientes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-layout">
      
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-brand">JT</h2>
          <span className="sidebar-subtitle">Admin Panel</span>
        </div>
        
        <nav className="sidebar-nav">
          <div className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentView('dashboard')}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </div>
          <div className={`nav-item ${currentView === 'pedidos' ? 'active' : ''}`} onClick={() => setCurrentView('pedidos')}>
            <ShoppingBag size={20} />
            <span>Pedidos</span>
          </div>
          <div className={`nav-item ${currentView === 'clientes' ? 'active' : ''}`} onClick={() => setCurrentView('clientes')}>
            <Users size={20} />
            <span>Clientes</span>
          </div>
          <div className={`nav-item ${currentView === 'catalogo' ? 'active' : ''}`} onClick={() => setCurrentView('catalogo')}>
            <Gem size={20} />
            <span>Catálogo</span>
          </div>
          <div className={`nav-item ${currentView === 'certificados' ? 'active' : ''}`} onClick={() => setCurrentView('certificados')}>
            <Award size={20} />
            <span>Certificados</span>
          </div>
          <div className={`nav-item ${currentView === 'ajustes' ? 'active' : ''}`} onClick={() => setCurrentView('ajustes')}>
            <Settings size={20} />
            <span>Ajustes</span>
          </div>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        
        {/* TOPBAR */}
        <header className="admin-topbar">
          <div className="topbar-search">
            <Search size={18} color="#aaa" />
            <input type="text" placeholder="Buscar pedidos, clientes..." />
          </div>
          <div className="topbar-actions">
            <Bell size={20} color="#555" style={{ cursor: 'pointer' }} />
            <div className="profile-avatar">A</div>
          </div>
        </header>

        {/* CONTENT AREA */}
        {renderContent()}
      </main>

      {/* CERTIFICATE MODAL */}
      {showCertModal && (
        <div className="modal-overlay" style={{ overflowY: 'auto', padding: '20px 0' }}>
          <div className="modal-content-glass" style={{ maxWidth: '600px', margin: 'auto' }}>
            <h3 style={{marginBottom: '5px'}}>Certificado de Joyería</h3>
            <p style={{marginBottom: '20px', color: '#666', fontSize: '0.9rem'}}>Ingrese las características exactas para la tarjeta de autenticidad.</p>
            
            <form onSubmit={handleCertGenerate}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                {selectedOrder === null && (
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '500', color: '#555' }}>Folio del Pedido</label>
                    <input type="text" className="glass-input" value={certData.orderId} onChange={e => setCertData({...certData, orderId: e.target.value})} placeholder="Ej. d98dfcb2-..." required />
                  </div>
                )}
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '500', color: '#555' }}>Modelo</label>
                  <input type="text" className="glass-input" value={certData.modelo} onChange={e => setCertData({...certData, modelo: e.target.value})} placeholder="Ej. Anillo Topacio" required />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '500', color: '#555' }}>Material</label>
                  <input type="text" className="glass-input" value={certData.material} onChange={e => setCertData({...certData, material: e.target.value})} placeholder="Ej. Oro de 18K" required />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '500', color: '#555' }}>Peso Total (grms)</label>
                  <input type="number" step="0.001" className="glass-input" value={certData.weight} onChange={e => setCertData({...certData, weight: e.target.value})} placeholder="Ej. 0.906" required />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '500', color: '#555' }}>Piedra Natural</label>
                  <input type="text" className="glass-input" value={certData.piedraNatural} onChange={e => setCertData({...certData, piedraNatural: e.target.value})} placeholder="Ej. Topacio / Zafiro" />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '500', color: '#555' }}>Carat (CT)</label>
                  <input type="text" className="glass-input" value={certData.carat} onChange={e => setCertData({...certData, carat: e.target.value})} placeholder="Ej. 6.77" />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '500', color: '#555' }}>Corte</label>
                  <input type="text" className="glass-input" value={certData.corte} onChange={e => setCertData({...certData, corte: e.target.value})} placeholder="Ej. CABUCHON" />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '500', color: '#555' }}>Color</label>
                  <input type="text" className="glass-input" value={certData.color} onChange={e => setCertData({...certData, color: e.target.value})} placeholder="Ej. Azul Profundo" />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '500', color: '#555' }}>Pureza</label>
                  <input type="text" className="glass-input" value={certData.pureza} onChange={e => setCertData({...certData, pureza: e.target.value})} placeholder="Ej. VS1" />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '500', color: '#555' }}>URL de Imagen de la Joya</label>
                  <input type="url" className="glass-input" value={certData.imagenJoyaUrl} onChange={e => setCertData({...certData, imagenJoyaUrl: e.target.value})} placeholder="https://ejemplo.com/anillo.png" />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button type="button" onClick={() => setShowCertModal(false)} className="btn-secondary" style={{padding: '10px 20px', border: 'none'}}>Cancelar</button>
                <button type="submit" className="btn-premium filled small" style={{padding: '10px 25px'}}>Generar PDF</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
