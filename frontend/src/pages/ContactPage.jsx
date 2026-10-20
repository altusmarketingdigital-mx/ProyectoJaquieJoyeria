import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Calendar,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import './ContactPage.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    tipoJoyeria: 'Anillo de compromiso',
    mensaje: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.correo) return;

    // Build WhatsApp message as direct fall-through
    const textMsg = `Hola Jacqueline Tapia Joyería, me comunico desde la página web:%0A` +
      `• Nombre: ${encodeURIComponent(formData.nombre)}%0A` +
      `• Correo: ${encodeURIComponent(formData.correo)}%0A` +
      `• Teléfono: ${encodeURIComponent(formData.telefono || 'No especificado')}%0A` +
      `• Interés: ${encodeURIComponent(formData.tipoJoyeria)}%0A` +
      `• Mensaje: ${encodeURIComponent(formData.mensaje)}`;

    window.open(`https://wa.me/523315206300?text=${textMsg}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="jt-contact-page">
      <Navbar />

      {/* Hero Header */}
      <section className="jt-contact-hero">
        <div className="container">
          <div className="contact-hero-content text-center">
            <span className="section-eyebrow">Atención Personalizada</span>
            <h1 className="contact-hero-title">Contáctanos</h1>
            <p className="contact-hero-subtitle">
              ¡Agenda una cita en nuestras oficinas o recibe asesoría exclusiva a distancia!
            </p>
            <p className="contact-hero-desc">
              Estamos listos para escuchar tu historia, mostrarte opciones de metales nobles y gemas certificadas, 
              y comenzar a bocetar la joya de tus sueños.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="jt-contact-main-section section-spacing">
        <div className="container">
          <div className="contact-layout-grid">
            
            {/* Left: Contact Info & Office Location */}
            <div className="contact-info-panel">
              <span className="section-eyebrow">Showroom & Taller</span>
              <h2 className="contact-panel-title">Oficinas Corporativas</h2>
              <p className="contact-panel-desc">
                Visítanos en una de las zonas más exclusivas de Guadalajara para una sesión privada de diseño y selección de gemas.
              </p>

              <div className="contact-cards-stack">
                <div className="contact-card-item">
                  <div className="contact-card-icon">
                    <MapPin size={22} />
                  </div>
                  <div className="contact-card-details">
                    <h4>Dirección</h4>
                    <p>Torre Diamante, Col. Puerta de Hierro</p>
                    <span className="contact-card-sub">Zapopan / Guadalajara, Jalisco, México</span>
                  </div>
                </div>

                <div className="contact-card-item">
                  <div className="contact-card-icon">
                    <Phone size={22} />
                  </div>
                  <div className="contact-card-details">
                    <h4>Teléfono & Citas</h4>
                    <p><a href="tel:3338427017">(33) 3842-7017</a></p>
                    <span className="contact-card-sub">Atención de Lunes a Viernes</span>
                  </div>
                </div>

                <div className="contact-card-item">
                  <div className="contact-card-icon">
                    <MessageCircle size={22} />
                  </div>
                  <div className="contact-card-details">
                    <h4>WhatsApp Concierge</h4>
                    <p>
                      <a 
                        href="https://wa.me/523315206300?text=Hola%20Jacqueline%20Tapia%20Joyer%C3%ADa,%20deseo%20agendar%20una%20cita%20o%20recibir%20informaci%C3%B3n." 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        +52 (33) 1520-6300
                      </a>
                    </p>
                    <span className="contact-card-sub">Respuesta inmediata personalizada</span>
                  </div>
                </div>

                <div className="contact-card-item">
                  <div className="contact-card-icon">
                    <Mail size={22} />
                  </div>
                  <div className="contact-card-details">
                    <h4>Correo Electrónico</h4>
                    <p><a href="mailto:contacto@jacquelinetapiajoyeria.com">contacto@jacquelinetapiajoyeria.com</a></p>
                    <span className="contact-card-sub">Cotizaciones formales y proyectos</span>
                  </div>
                </div>

                <div className="contact-card-item">
                  <div className="contact-card-icon">
                    <Clock size={22} />
                  </div>
                  <div className="contact-card-details">
                    <h4>Horario de Atención</h4>
                    <p>Lunes a Viernes: 10:00 AM – 7:00 PM</p>
                    <span className="contact-card-sub">Sábados: Con previa cita agendada</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Contact & Appointment Form */}
            <div className="contact-form-panel">
              <div className="form-wrapper-card">
                <div className="form-card-header">
                  <span className="section-eyebrow">Envíanos un Mensaje</span>
                  <h3 className="form-card-title">Inicia tu Consulta</h3>
                  <p className="form-card-desc">
                    Completa el formulario y nos pondremos en contacto contigo para asesorarte o confirmar tu cita en Torre Diamante.
                  </p>
                </div>

                {submitted ? (
                  <div className="form-success-box fade-in">
                    <CheckCircle2 size={48} className="success-icon" />
                    <h3>¡Mensaje Preparado con Éxito!</h3>
                    <p>
                      Te hemos redirigido a WhatsApp para continuar la conversación directa con nuestro equipo de joyería. Si la ventana no se abrió automáticamente, haz click abajo:
                    </p>
                    <a 
                      href="https://wa.me/523315206300" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-premium gold"
                      style={{ marginTop: '16px' }}
                    >
                      Abrir WhatsApp
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="jt-custom-form">
                    <div className="form-group">
                      <label htmlFor="nombre">Tu Nombre Completo *</label>
                      <input 
                        type="text" 
                        id="nombre" 
                        name="nombre" 
                        required 
                        placeholder="Ej. Sofía Hernández"
                        value={formData.nombre}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label htmlFor="correo">Tu Correo Electrónico *</label>
                        <input 
                          type="email" 
                          id="correo" 
                          name="correo" 
                          required 
                          placeholder="tu@correo.com"
                          value={formData.correo}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="telefono">Teléfono / WhatsApp</label>
                        <input 
                          type="tel" 
                          id="telefono" 
                          name="telefono" 
                          placeholder="Ej. (33) 1234 5678"
                          value={formData.telefono}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="tipoJoyeria">Tipo de Pieza o Interés</label>
                      <select 
                        id="tipoJoyeria" 
                        name="tipoJoyeria"
                        value={formData.tipoJoyeria}
                        onChange={handleChange}
                      >
                        <option value="Anillo de compromiso">Anillo de compromiso</option>
                        <option value="Churumbela">Churumbela</option>
                        <option value="Argollas de matrimonio">Argollas de matrimonio</option>
                        <option value="Dije personalizado">Dije personalizado</option>
                        <option value="Broqueles o aretes">Broqueles o aretes</option>
                        <option value="Mancuernillas">Mancuernillas</option>
                        <option value="Selección de Gemas">Selección de Gemas / Piedras</option>
                        <option value="Cita presencial en Torre Diamante">Cita presencial en Torre Diamante</option>
                        <option value="Otro proyecto a medida">Otro proyecto a medida</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="mensaje">Tu Mensaje o Detalles de tu Idea</label>
                      <textarea 
                        id="mensaje" 
                        name="mensaje" 
                        rows="4" 
                        placeholder="Cuéntanos sobre tu idea, presupuesto estimado, fecha especial o cualquier duda que tengas..."
                        value={formData.mensaje}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <button type="submit" className="btn-premium filled form-submit-btn">
                      <Send size={16} style={{ marginRight: '8px' }} />
                      Enviar Mensaje & Agendar Cita
                    </button>

                    <p className="privacy-note">
                      * Al dar seleccionar «Enviar Mensaje» aceptas nuestra política de privacidad y confidencialidad.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Embed & Directions */}
      <section className="jt-contact-map-section">
        <div className="container">
          <div className="map-card-wrapper">
            <div className="map-header">
              <div>
                <span className="section-eyebrow">Cómo Llegar</span>
                <h3 className="map-title">Torre Diamante — Puerta de Hierro</h3>
                <p className="map-subtitle">Zapopan, Jalisco, México</p>
              </div>
              <a 
                href="https://maps.google.com/?q=Torre+Diamante+Puerta+de+Hierro+Zapopan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-premium gold"
              >
                Abrir en Google Maps
              </a>
            </div>

            <div className="map-frame-container">
              <iframe 
                title="Ubicación Jacqueline Tapia Joyería Torre Diamante"
                src="https://maps.google.com/maps?q=Torre%20Diamante%20Puerta%20de%20Hierro%20Zapopan%20Jalisco&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="380" 
                style={{ border: 0, borderRadius: '12px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
