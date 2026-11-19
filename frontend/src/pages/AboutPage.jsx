import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Sparkles, 
  Heart, 
  Award, 
  Compass, 
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
                  <span className="badge-symbol">🐝</span>
                  <div className="badge-text">
                    <strong>Símbolo de Dedicación</strong>
                    <span>Trabajo minucioso y la creación de algo extraordinario</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-story-text">
              <span className="section-eyebrow">Cada historia de amor merece una pieza que la haga inolvidable</span>
              <h2 className="section-heading">Creemos que cada historia de amor merece convertirse en algo extraordinario.</h2>
              
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
                    <h4>Diseño a la Medida</h4>
                    <p>Modelado 3D y detallado artesanal en oro 14K.</p>
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
                    <h4>Oro 14K Garantizado</h4>
                    <p>Metales nobles certificados y aleaciones de la más alta calidad orfebre.</p>
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
            <h2 className="section-heading">El Alma de Nuestro Taller</h2>
            <p className="section-subheading">
              Inspirados en la naturaleza y en la orfebrería de autor, cada creación refleja nuestro compromiso inquebrantable con la excelencia.
            </p>
          </div>

          <div className="about-values-grid">
            <div className="value-card">
              <div className="value-icon"><Heart size={30} /></div>
              <h3>Pasión por el Amor</h3>
              <p>
                Convertimos promesas, aniversarios y compromisos en joyas que conservan la emoción del primer día a lo largo de los años.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon"><Compass size={30} /></div>
              <h3>Minucia y Detalle</h3>
              <p>
                Tal como la abeja labra su colmena con exactitud geométrica, nuestros maestros joyeros cuidan cada milímetro y engaste.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon"><Award size={30} /></div>
              <h3>Metales y Gemas Nobles</h3>
              <p>
                Utilizamos exclusivamente oro auténtico y gemas seleccionadas por su brillo, color y durabilidad probada en el tiempo.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon"><ShieldCheck size={30} /></div>
              <h3>Garantía y Confianza</h3>
              <p>
                Asesoría cercana y transparente de principio a fin, entregando certificados gemológicos y respaldo total en cada entrega.
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
                  href="https://wa.me/523315206300?text=Hola%20Jacqueline%20Tapia%20Joyer%C3%ADa,%20me%20gustar%C3%ADa%20iniciar%20un%20dise%C3%B1o%20personalizado." 
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
