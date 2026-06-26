import React, { useState, useEffect } from 'react';
import { Search, Mail, Calendar, Hash } from 'lucide-react';

export default function ClientsModule() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const res = await fetch('http://localhost:4000/api/admin/clients', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setClients(data);
        } else {
          setError('Error al cargar clientes');
        }
      } catch (err) {
        setError('Error de red');
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const filteredClients = clients.filter(c => c.email.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) return <div className="admin-content-area" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>Cargando clientes...</div>;
  if (error) return <div className="admin-content-area" style={{display:'flex', justifyContent:'center', alignItems:'center', color:'red'}}>{error}</div>;

  return (
    <div className="admin-content-area fade-in">
      <div className="admin-page-header">
        <h1>Directorio de Clientes</h1>
        <button className="btn-premium filled small">+ Nuevo Cliente</button>
      </div>

      <div className="module-controls">
        <div className="search-bar" style={{ width: '100%', maxWidth: '400px' }}>
          <Search size={18} color="#aaa" />
          <input 
            type="text" 
            placeholder="Buscar cliente por correo..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="clients-grid mt-20">
        {filteredClients.map(client => (
          <div key={client.id} className="client-card">
            <div className="client-avatar">{client.email.charAt(0).toUpperCase()}</div>
            <div className="client-info">
              <h3>{client.email.split('@')[0]}</h3>
              <p><Mail size={14} /> {client.email}</p>
              <div className="client-stats">
                <span><Calendar size={14} /> {new Date(client.createdAt).toLocaleDateString()}</span>
                <span className="orders-badge"><Hash size={14} /> {client.totalOrders} Pedidos</span>
              </div>
            </div>
            <button className="btn-icon-soft mt-10">Ver Perfil</button>
          </div>
        ))}
        {filteredClients.length === 0 && (
           <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#888'}}>
             No se encontraron clientes.
           </div>
        )}
      </div>
    </div>
  );
}
