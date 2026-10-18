import React, { useState } from 'react';
import './FloatingWhatsApp.css';

export default function FloatingWhatsApp({ 
  phoneNumber = '523334554536', 
  defaultMessage = 'Hola, me gustaría solicitar informes sobre una pieza personalizada de Jacqueline Tapia Joyería' 
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  return (
    <div 
      className="jt-floating-whatsapp-container"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Interactive Tooltip pill */}
      <div className={`jt-whatsapp-tooltip ${showTooltip ? 'visible' : ''}`}>
        <span className="jt-tooltip-title">¿Deseas atención personalizada?</span>
        <span className="jt-tooltip-sub">Chatea con nosotros por WhatsApp</span>
      </div>

      {/* Floating Button with pulse badge */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="jt-floating-whatsapp-btn"
        aria-label="Contactar a Jacqueline Tapia Joyería por WhatsApp"
        title="Atención por WhatsApp"
      >
        <span className="jt-whatsapp-pulse-ring"></span>
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          className="jt-whatsapp-icon-svg"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.395-10.416c-5.525 0-10.003 4.478-10.003 10.003 0 1.839.497 3.563 1.365 5.048l-1.451 5.305 5.441-1.427c1.428.804 3.076 1.264 4.829 1.264 5.524 0 10.002-4.478 10.002-10.003 0-5.525-4.478-10.003-10.002-10.003z"/>
        </svg>
      </a>
    </div>
  );
}
