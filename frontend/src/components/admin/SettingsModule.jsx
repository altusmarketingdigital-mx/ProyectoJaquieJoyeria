import React, { useState } from 'react';
import { Save, Bell, Shield, Moon, Monitor, CreditCard } from 'lucide-react';

export default function SettingsModule() {
  const [saving, setSaving] = useState(false);
  
  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('Configuración guardada exitosamente');
    }, 1000);
  };

  return (
    <div className="admin-content-area fade-in">
      <div className="admin-page-header">
        <h1>Configuración de la Tienda</h1>
        <button className="btn-premium filled small" onClick={handleSave} disabled={saving}>
          <Save size={16} style={{marginRight: '8px'}} />
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>

      <div className="settings-grid mt-20">
        
        <div className="settings-section">
          <h3><Monitor size={18} /> Apariencia y Tienda</h3>
          <div className="settings-card">
            <div className="setting-item">
              <div>
                <h4>Nombre de la Tienda</h4>
                <p>El nombre visible para tus clientes.</p>
              </div>
              <input type="text" className="setting-input" defaultValue="Jacqueline Tapia Joyería" />
            </div>
            <div className="setting-item">
              <div>
                <h4>Modo Oscuro</h4>
                <p>Activar el tema oscuro en el panel.</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3><Bell size={18} /> Notificaciones</h3>
          <div className="settings-card">
            <div className="setting-item">
              <div>
                <h4>Alertas de Nuevos Pedidos</h4>
                <p>Recibir un correo cuando haya un nuevo pedido.</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div>
                <h4>Correo de Notificaciones</h4>
              </div>
              <input type="email" className="setting-input" defaultValue="admin@example.com" />
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3><Shield size={18} /> Seguridad</h3>
          <div className="settings-card">
            <div className="setting-item">
              <div>
                <h4>Autenticación en Dos Pasos (2FA)</h4>
                <p>Mayor seguridad para tu cuenta de administrador.</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item" style={{ borderBottom: 'none' }}>
              <button className="btn-premium outline small">Cambiar Contraseña</button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
