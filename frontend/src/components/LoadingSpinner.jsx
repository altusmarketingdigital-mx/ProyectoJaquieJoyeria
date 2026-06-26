import React from 'react';
import './LoadingSpinner.css'; // CSS file provides premium gold accent and animation

export default function LoadingSpinner() {
  return (
    <div className="loading-spinner" aria-label="Cargando...">
      <div className="spinner" />
    </div>
  );
}
