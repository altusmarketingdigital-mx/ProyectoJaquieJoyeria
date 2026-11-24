import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Sparkles, 
  Heart, 
  Hexagon, 
  Diamond, 
  ShieldCheck, 
  MessageCircle, 
  ArrowRight,
  Gem,
  CheckCircle2
} from 'lucide-react';
import './AboutPage.css';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="jt-about-page">
      <Navbar />

      {/* Hero Section */}
      <section className="jt-about-hero">
        <div className="container">
          <div className="about-hero-content text-center">
            <span className="section-eyebrow">Nuestra Historia & Esencia</span>
            <h1 className="about-hero-title">Emociones que Brillan</h1>
            <p className="about-hero-statement">
              “Mi pasión es plasmar en una pieza las historias de amor más bellas.”
            </p>
            <span className="about-founder-signature">— J. Jacqueline Tapia</span>
          </div>
        </div>
      </section>

      {/* Main Story & Philosophy Section */}
      <section className="jt-about-story-section section-spacing">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-media">
              <div className="about-image-wrapper">
                <img 
                  src="/images/especiales_coleccion/abeja.png" 
                  alt="Anillo Colección Abeja Jacqueline Tapia" 
                  className="about-primary-image"
                />
                <div className="about-badge-card">
                  <div className="badge-logo-container">
                    <img 
                      src="/images/logo.png" 
                      alt="Abeja Jacqueline Tapia" 
                      className="badge-logo-img" 
                    />
                  </div>
                  <div className="badge-text">
                    <strong>Símbolo de Dedicación</strong>
                    <span>Trabajo minucioso y la creación de algo extraordinario</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-story-text">
              <span className="section-eyebrow">Cada historia de amor merece</span>
              <h2 className="section-heading">una pieza que la haga inolvidable.</h2>
              
              <p className="story-paragraph">
                Creemos que cada historia de amor merece convertirse en algo extraordinario.
              </p>

              <p className="story-paragraph">
                Desde hace más de 10 años, creamos joyería de alta gama con piedras preciosas y semipreciosas, diseñando cada pieza de manera personalizada junto a nuestros clientes.
              </p>

              <p className="story-paragraph">
                Te acompañamos en cada detalle: desde la elección de las gemas, el oro y los materiales, hasta dar forma a un diseño que refleje tu esencia.
              </p>

              <p className="story-paragraph" style={{ fontWeight: 600, color: 'var(--color-text-navy, #051F34)', fontSize: '1.05rem', marginTop: '1rem' }}>
                No solo creamos joyas, damos forma a historias que merecen perdurar.
              </p>

              <div className="about-pillars-mini">
                <div className="pillar-item">
                  <CheckCircle2 size={20} className="pillar-icon-check" />
                  <div>
                    <h4>Orfebrería de Alta Precisión</h4>
                    <p>Modelado 3D y detallado artesanal en oro 14K amarillo, blanco y rosa.</p>
                  </div>
                </div>

                <div className="pillar-item">
                  <CheckCircle2 size={20} className="pillar-icon-check" />
                  <div>
                    <h4>Gemas con Certificación</h4>
                    <p>Diamantes naturales y gemas preciosas con altos estándares de pureza y corte.</p>
                  </div>
                </div>

                <div className="pillar-item">
                  <CheckCircle2 size={20} className="pillar-icon-check" />
                  <div>
                    <h4>Diseño 100% Personalizado</h4>
                    <p>Tu historia esculpida en metal noble, adaptada a tu presupuesto y estilo.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Bee Symbolism & Atelier Values */}
      <section className="jt-about-values-section bg-subtle section-spacing">
        <div className="container">
          <div className="section-header-center">
            <span className="section-eyebrow">Nuestros Valores</span>
            <h2 className="section-heading">La esencia de nuestra creación</h2>
            <p className="section-subheading">
              Inspirados en la naturaleza y en la orfebrería de autor, cada creación refleja nuestro compromiso inquebrantable con la excelencia.
            </p>
          </div>

          <div className="about-values-grid">
            <div className="value-card">
              <div className="value-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <h3>Pasión por crear</h3>
              <p>
                Cada historia merece una pieza especial. Transformamos emociones, promesas y momentos importantes en joyas con significado.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon"><Hexagon size={28} strokeWidth={1.5} /></div>
              <h3>Maestría y precisión</h3>
              <p>
                Como la abeja en su laboriosa creación, cuidamos cada detalle con dedicación, precisión y maestría artesanal.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon"><Diamond size={28} strokeWidth={1.5} /></div>
              <h3>Belleza y exclusividad</h3>
              <p>
                Seleccionamos cuidadosamente oro, piedras preciosas y semipreciosas para crear combinaciones únicas y diseños extraordinarios.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon"><ShieldCheck size={28} strokeWidth={1.5} /></div>
              <h3>Confianza y compromiso</h3>
              <p>
                Te acompañamos en cada etapa del proceso, ofreciendo asesoría personalizada, transparencia y respaldo en cada creación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Creation Process Overview */}
      <section className="jt-about-process-section section-spacing">
        <div className="container">
          <div className="section-header-center">
            <span className="section-eyebrow">Paso a Paso</span>
            <h2 className="section-heading">Cómo Creamos tu Pieza Única</h2>
            <p className="section-subheading">
              Un viaje colaborativo donde tú eres parte activa en el nacimiento de tu joya.
            </p>
          </div>

          <div className="process-steps-grid">
            <div className="process-step-item">
              <div className="step-number">01</div>
              <h4>Inspiración & Consulta</h4>
              <p>Platicamos sobre tu historia, preferencias de metal, gema predilecta y presupuesto ideal.</p>
            </div>

            <div className="process-step-item">
              <div className="step-number">02</div>
              <h4>Diseño y Render 3D</h4>
              <p>Modelamos tu joya en software especializado para que visualices proporciones exactas antes de fundir.</p>
            </div>

            <div className="process-step-item">
              <div className="step-number">03</div>
              <h4>Orfebrería & Engaste</h4>
              <p>Nuestros artesanos funden el oro, detallan a mano cada uña y engastan las piedras con máxima firmeza.</p>
            </div>

            <div className="process-step-item">
              <div className="step-number">04</div>
              <h4>Pulido & Entrega</h4>
              <p>Acabado espejo de alta joyería, estuche de presentación de lujo y entrega personalizada en Guadalajara o con envío asegurado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="jt-about-cta-section">
        <div className="container">
          <div className="about-cta-card">
            <div className="cta-content">
              <span className="section-eyebrow-light">Comienza Hoy</span>
              <h2 className="cta-title">¿Listo para contar tu propia historia en oro y diamantes?</h2>
              <p className="cta-desc">
                Permítenos diseñar contigo la pieza que celebrará ese momento inolvidable.
              </p>
              <div className="cta-buttons">
                <a 
                  href="https://wa.me/523338427017?text=Hola%20Jacqueline%20Tapia%20Joyer%C3%ADa,%20me%20gustar%C3%ADa%20iniciar%20un%20dise%C3%B1o%20personalizado." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-premium gold"
                >
                  <MessageCircle size={16} style={{ marginRight: '8px' }} />
                  Contactar por WhatsApp
                </a>
                <Link to="/catalog" className="btn-premium white">
                  Explorar Catálogo
                  <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
