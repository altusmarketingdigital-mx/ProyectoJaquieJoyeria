import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CatalogPage from './pages/CatalogPage';
import GemasPage from './pages/GemasPage';
import AboutPage from './pages/AboutPage';
import HistoriasPage from './pages/HistoriasPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import OrderFlow from './pages/OrderFlow';
import QuotationView from './pages/QuotationView';
import DemoHome from './pages/DemoHome';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import './styles/global.css';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('jwt');
  return token ? children : <Navigate to="/login" replace />;
}

function PrivateAdminRoute({ children }) {
  const token = localStorage.getItem('jwt');
  if (!token) return <Navigate to="/login" replace />;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role === 'ADMIN' ? children : <Navigate to="/" replace />;
  } catch (e) {
    return <Navigate to="/login" replace />;
  }
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DemoHome />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/gemas" element={<GemasPage />} />
        <Route path="/our-materials" element={<Navigate to="/gemas" replace />} />
        <Route path="/acerca-de" element={<AboutPage />} />
        <Route path="/our-story" element={<Navigate to="/acerca-de" replace />} />
        <Route path="/historias" element={<HistoriasPage />} />
        <Route path="/journal" element={<Navigate to="/historias" replace />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/contact-us" element={<Navigate to="/contacto" replace />} />
        <Route
          path="/admin"
          element={
            <PrivateAdminRoute>
              <AdminDashboard />
            </PrivateAdminRoute>
          }
        />
        <Route path="/order" element={<OrderFlow />} />
        <Route path="/quotation/:orderId" element={<QuotationView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <FloatingWhatsApp />
    </>
  );
}
