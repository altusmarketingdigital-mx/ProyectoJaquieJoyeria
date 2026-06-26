import React, { useState } from 'react';
import './ErrorToast.css';

export default function ErrorToast({ message }) {
  const [visible, setVisible] = useState(true);

  if (!visible || !message) return null;

  return (
    <div className="error-toast" role="alert">
      <span>{message}</span>
      <button className="close-btn" onClick={() => setVisible(false)} aria-label="Cerrar">
        ×
      </button>
    </div>
  );
}
