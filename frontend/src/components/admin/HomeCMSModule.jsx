import React, { useState } from 'react';
import { Save, Eye, RefreshCw, Layout, Image as ImageIcon, Type, Sparkles } from 'lucide-react';
import { getHomeConfig, saveHomeConfig, initialHomeConfig } from '../../services/homeConfig';

export default function HomeCMSModule() {
  const [config, setConfig] = useState(getHomeConfig());
  const [activeTab, setActiveTab] = useState('hero');
  const [notification, setNotification] = useState('');

  const handleChange = (section, key, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleToggle = (section) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        enabled: !prev[section].enabled
      }
    }));
  };

  const handleSave = () => {
    const success = saveHomeConfig(config);
    if (success) {
      setNotification('¡Contenido del Inicio actualizado correctamente!');
      setTimeout(() => setNotification(''), 4000);
    } else {
      alert('Error al guardar la configuración');
    }
  };

  const handleReset = () => {
    if (window.confirm('¿Deseas restaurar los textos e imágenes predeterminados del Inicio?')) {
      setConfig(initialHomeConfig);
      saveHomeConfig(initialHomeConfig);
      setNotification('Valores predeterminados restaurados');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  return (
    <div className="admin-content-area fade-in">
      <div className="admin-page-header">
        <div>
          <h1>Administración de Página de Inicio</h1>
          <p style={{ color: '#666', marginTop: '5px' }}>
            Edita textos, banners, botones y visibilidad de las secciones del Inicio oficial de Jacqueline Tapia.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-secondary" onClick={handleReset} style={{ padding: '8px 16px', background: '#eee', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <RefreshCw size={14} /> Restaurar
          </button>
          <a href="/" target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '8px 16px', background: '#e3dbd4', color: '#051f34', textDecoration: 'none', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Eye size={14} /> Ver en Vivo
          </a>
          <button className="btn-premium filled small" onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Save size={14} /> Guardar Cambios
          </button>
        </div>
      </div>

      {notification && (
        <div style={{ padding: '12px 20px', background: '#d4edda', color: '#155724', border: '1px solid #c3e6cb', borderRadius: '4px', marginBottom: '20px' }}>
          {notification}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid #ddd', marginBottom: '25px', overflowX: 'auto', paddingBottom: '5px' }}>
        {[
          { id: 'hero', label: '1. Banner Hero' },
          { id: 'brandPresentation', label: '2. Filosofía Jacqueline Tapia' },
          { id: 'categories', label: '3. Categorías' },
          { id: 'fineJewelry', label: '4. Joyería Fina & Gemas' },
          { id: 'favorites', label: '5. Favoritos del Mes' },
          { id: 'personalization', label: '6. Personalización' },
          { id: 'designPhilosophy', label: '7. Compromiso' },
          { id: 'stories', label: '8. Historias' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 18px',
              background: activeTab === tab.id ? '#051F34' : '#fff',
              color: activeTab === tab.id ? '#fff' : '#444',
              border: '1px solid #ddd',
              borderRadius: '4px 4px 0 0',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '0.85rem',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Hero Tab */}
      {activeTab === 'hero' && (
        <div className="settings-card" style={{ background: '#fff', padding: '25px', border: '1px solid #eee' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3><Layout size={18} /> Banner Principal (Hero)</h3>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={config.hero.enabled} onChange={() => handleToggle('hero')} />
              <span>Sección Visible</span>
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Etiqueta Superior (Tagline)</label>
              <input type="text" className="setting-input" value={config.hero.tagline} onChange={e => handleChange('hero', 'tagline', e.target.value)} style={{ width: '100%', padding: '10px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Título Principal</label>
              <input type="text" className="setting-input" value={config.hero.title} onChange={e => handleChange('hero', 'title', e.target.value)} style={{ width: '100%', padding: '10px' }} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Descripción / Subtítulo</label>
              <textarea rows="3" className="setting-input" value={config.hero.subtitle} onChange={e => handleChange('hero', 'subtitle', e.target.value)} style={{ width: '100%', padding: '10px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Texto Botón Principal</label>
              <input type="text" className="setting-input" value={config.hero.buttonText} onChange={e => handleChange('hero', 'buttonText', e.target.value)} style={{ width: '100%', padding: '10px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Enlace Botón Principal</label>
              <input type="text" className="setting-input" value={config.hero.buttonLink} onChange={e => handleChange('hero', 'buttonLink', e.target.value)} style={{ width: '100%', padding: '10px' }} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>URL Imagen de Fondo (Hero)</label>
              <input type="text" className="setting-input" value={config.hero.backgroundImage} onChange={e => handleChange('hero', 'backgroundImage', e.target.value)} style={{ width: '100%', padding: '10px' }} />
            </div>
          </div>
        </div>
      )}

      {/* Brand Presentation Tab */}
      {activeTab === 'brandPresentation' && (
        <div className="settings-card" style={{ background: '#fff', padding: '25px', border: '1px solid #eee' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3><Type size={18} /> Presentación de la Marca</h3>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={config.brandPresentation.enabled} onChange={() => handleToggle('brandPresentation')} />
              <span>Sección Visible</span>
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Título</label>
              <input type="text" className="setting-input" value={config.brandPresentation.title} onChange={e => handleChange('brandPresentation', 'title', e.target.value)} style={{ width: '100%', padding: '10px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Frase Destacada (Quote)</label>
              <input type="text" className="setting-input" value={config.brandPresentation.quote} onChange={e => handleChange('brandPresentation', 'quote', e.target.value)} style={{ width: '100%', padding: '10px' }} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Texto Narrativo</label>
              <textarea rows="3" className="setting-input" value={config.brandPresentation.text} onChange={e => handleChange('brandPresentation', 'text', e.target.value)} style={{ width: '100%', padding: '10px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Texto del Botón</label>
              <input type="text" className="setting-input" value={config.brandPresentation.buttonText} onChange={e => handleChange('brandPresentation', 'buttonText', e.target.value)} style={{ width: '100%', padding: '10px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>URL Fotografía Jacqueline Tapia</label>
              <input type="text" className="setting-input" value={config.brandPresentation.image} onChange={e => handleChange('brandPresentation', 'image', e.target.value)} style={{ width: '100%', padding: '10px' }} />
            </div>
          </div>
        </div>
      )}

      {/* Fine Jewelry Tab */}
      {activeTab === 'fineJewelry' && (
        <div className="settings-card" style={{ background: '#fff', padding: '25px', border: '1px solid #eee' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3><Sparkles size={18} /> Bloque Joyería Fina & Gemas</h3>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={config.fineJewelry.enabled} onChange={() => handleToggle('fineJewelry')} />
              <span>Sección Visible</span>
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Título</label>
              <input type="text" className="setting-input" value={config.fineJewelry.title} onChange={e => handleChange('fineJewelry', 'title', e.target.value)} style={{ width: '100%', padding: '10px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Subtítulo</label>
              <input type="text" className="setting-input" value={config.fineJewelry.subtitle} onChange={e => handleChange('fineJewelry', 'subtitle', e.target.value)} style={{ width: '100%', padding: '10px' }} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Descripción</label>
              <textarea rows="3" className="setting-input" value={config.fineJewelry.description} onChange={e => handleChange('fineJewelry', 'description', e.target.value)} style={{ width: '100%', padding: '10px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Texto Botón</label>
              <input type="text" className="setting-input" value={config.fineJewelry.buttonText} onChange={e => handleChange('fineJewelry', 'buttonText', e.target.value)} style={{ width: '100%', padding: '10px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Enlace Botón</label>
              <input type="text" className="setting-input" value={config.fineJewelry.buttonLink} onChange={e => handleChange('fineJewelry', 'buttonLink', e.target.value)} style={{ width: '100%', padding: '10px' }} />
            </div>
          </div>
        </div>
      )}

      {/* Personalization Tab */}
      {activeTab === 'personalization' && (
        <div className="settings-card" style={{ background: '#fff', padding: '25px', border: '1px solid #eee' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3><Type size={18} /> Sección de Personalización</h3>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={config.personalization.enabled} onChange={() => handleToggle('personalization')} />
              <span>Sección Visible</span>
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Título</label>
              <input type="text" className="setting-input" value={config.personalization.title} onChange={e => handleChange('personalization', 'title', e.target.value)} style={{ width: '100%', padding: '10px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Subtítulo</label>
              <input type="text" className="setting-input" value={config.personalization.subtitle} onChange={e => handleChange('personalization', 'subtitle', e.target.value)} style={{ width: '100%', padding: '10px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Texto Botón</label>
              <input type="text" className="setting-input" value={config.personalization.buttonText} onChange={e => handleChange('personalization', 'buttonText', e.target.value)} style={{ width: '100%', padding: '10px' }} />
            </div>
          </div>
        </div>
      )}

      {/* Other tabs fallback */}
      {['categories', 'favorites', 'designPhilosophy', 'stories'].includes(activeTab) && (
        <div className="settings-card" style={{ background: '#fff', padding: '25px', border: '1px solid #eee' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ textTransform: 'capitalize' }}><Layout size={18} /> Configuración de {activeTab}</h3>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={config[activeTab]?.enabled ?? true} onChange={() => handleToggle(activeTab)} />
              <span>Sección Visible</span>
            </label>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Título</label>
              <input type="text" className="setting-input" value={config[activeTab]?.title || ''} onChange={e => handleChange(activeTab, 'title', e.target.value)} style={{ width: '100%', padding: '10px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Subtítulo o Tagline</label>
              <input type="text" className="setting-input" value={config[activeTab]?.tagline || config[activeTab]?.subtitle || ''} onChange={e => handleChange(activeTab, config[activeTab]?.tagline !== undefined ? 'tagline' : 'subtitle', e.target.value)} style={{ width: '100%', padding: '10px' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
