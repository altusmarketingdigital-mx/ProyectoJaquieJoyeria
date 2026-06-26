import React, { useState, useEffect } from 'react';

const CatalogModule = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    material: '',
    gemstone: '',
    priceBase: '',
    imageUrl: ''
  });

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/catalog', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        material: product.material,
        gemstone: product.gemstone || '',
        priceBase: product.priceBase,
        imageUrl: product.imageUrl || ''
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        category: '',
        material: '',
        gemstone: '',
        priceBase: '',
        imageUrl: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    // Ensure priceBase is a number for Prisma Decimal
    const payload = { ...formData, priceBase: parseFloat(formData.priceBase) };

    const url = editingProduct ? `/api/admin/catalog/${editingProduct.id}` : '/api/admin/catalog';
    const method = editingProduct ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        handleCloseModal();
        fetchProducts();
      } else {
        alert('Error guardando el producto');
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este producto?')) return;
    const token = localStorage.getItem('token');
    
    try {
      const res = await fetch(`/api/admin/catalog/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="admin-content-area" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>Cargando catálogo...</div>;

  return (
    <div className="admin-content-area fade-in catalog-module">
      <div className="admin-page-header">
        <div>
          <h1>Catálogo de Joyas</h1>
          <p style={{color: '#666', marginTop: '5px'}}>Administra las joyas prediseñadas de tu tienda</p>
        </div>
        <button className="btn-premium filled small" onClick={() => handleOpenModal()}>
          + Nuevo Producto
        </button>
      </div>

      <div className="catalog-grid">
        {products.map(product => (
          <div key={product.id} className="catalog-card">
            <div className="catalog-img-wrapper">
              <img 
                src={product.imageUrl || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&auto=format&fit=crop&q=60'} 
                alt={product.name} 
                className="catalog-img" 
              />
              <div className="catalog-actions">
                <button className="btn-icon edit" onClick={() => handleOpenModal(product)}>✏️</button>
                <button className="btn-icon delete" onClick={() => handleDelete(product.id)}>🗑️</button>
              </div>
            </div>
            <div className="catalog-info">
              <span className="catalog-category">{product.category}</span>
              <h3 className="catalog-name">{product.name}</h3>
              <p className="catalog-material">{product.material} {product.gemstone && `• ${product.gemstone}`}</p>
              <div className="catalog-price">
                ${parseFloat(product.priceBase).toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="empty-state" style={{gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#888'}}>
            No hay productos registrados en el catálogo.
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content catalog-modal">
            <button className="close-btn" onClick={handleCloseModal}>×</button>
            <h2>{editingProduct ? 'Editar Producto' : 'Añadir al Catálogo'}</h2>
            <form onSubmit={handleSubmit} className="catalog-form" style={{marginTop: '20px'}}>
              
              <div className="form-group" style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: '500', color: '#555', fontSize: '0.85rem'}}>Nombre del Modelo</label>
                <input type="text" name="name" className="glass-input" value={formData.name} onChange={handleChange} required placeholder="Ej. Anillo Solitario Diamante" style={{width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc'}} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label style={{display: 'block', marginBottom: '5px', fontWeight: '500', color: '#555', fontSize: '0.85rem'}}>Categoría</label>
                  <select name="category" className="glass-input" value={formData.category} onChange={handleChange} required style={{width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc'}}>
                    <option value="">Selecciona...</option>
                    <option value="Anillo">Anillo</option>
                    <option value="Collar">Collar</option>
                    <option value="Aretes">Aretes</option>
                    <option value="Pulsera">Pulsera</option>
                    <option value="Reloj">Reloj</option>
                  </select>
                </div>
                <div className="form-group">
                  <label style={{display: 'block', marginBottom: '5px', fontWeight: '500', color: '#555', fontSize: '0.85rem'}}>Material (Metal)</label>
                  <input type="text" name="material" className="glass-input" value={formData.material} onChange={handleChange} required placeholder="Ej. Oro Blanco 18K" style={{width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc'}} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label style={{display: 'block', marginBottom: '5px', fontWeight: '500', color: '#555', fontSize: '0.85rem'}}>Piedra (Opcional)</label>
                  <input type="text" name="gemstone" className="glass-input" value={formData.gemstone} onChange={handleChange} placeholder="Ej. Zafiro Azul" style={{width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc'}} />
                </div>
                <div className="form-group">
                  <label style={{display: 'block', marginBottom: '5px', fontWeight: '500', color: '#555', fontSize: '0.85rem'}}>Precio Base (MXN)</label>
                  <input type="number" name="priceBase" className="glass-input" value={formData.priceBase} onChange={handleChange} required step="0.01" min="0" style={{width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc'}} />
                </div>
              </div>

              <div className="form-group" style={{marginBottom: '20px'}}>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: '500', color: '#555', fontSize: '0.85rem'}}>URL de la Imagen</label>
                <input type="url" name="imageUrl" className="glass-input" value={formData.imageUrl} onChange={handleChange} placeholder="https://ejemplo.com/imagen.jpg" style={{width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc'}} />
              </div>

              <div className="form-actions" style={{display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
                <button type="button" className="btn-secondary" onClick={handleCloseModal} style={{padding: '10px 20px', border: 'none', background: '#eee', borderRadius: '6px', cursor: 'pointer'}}>Cancelar</button>
                <button type="submit" className="btn-premium filled small" style={{padding: '10px 20px'}}>{editingProduct ? 'Actualizar' : 'Guardar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogModule;
