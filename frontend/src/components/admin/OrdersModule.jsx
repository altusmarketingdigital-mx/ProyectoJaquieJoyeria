import React, { useState, useMemo } from 'react';
import { Eye, Award, Search, Filter } from 'lucide-react';

export default function OrdersModule({ orders, viewOrder, openCertModal, getStatusBadge }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            order.client.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  return (
    <div className="admin-content-area fade-in">
      <div className="admin-page-header">
        <h1>Gestión de Pedidos</h1>
        <button className="btn-premium filled small">+ Nuevo Pedido</button>
      </div>

      <div className="module-controls">
        <div className="search-bar">
          <Search size={18} color="#aaa" />
          <input 
            type="text" 
            placeholder="Buscar por folio o cliente..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-dropdown">
          <Filter size={18} color="#aaa" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">Todos los Estados</option>
            <option value="pending">Pendiente</option>
            <option value="processing">En Producción</option>
            <option value="completed">Completado</option>
          </select>
        </div>
      </div>

      <div className="admin-table-container mt-20">
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
            {filteredOrders.map(order => (
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
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="7" style={{textAlign: 'center', padding: '40px', color: '#888'}}>
                  No se encontraron pedidos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
