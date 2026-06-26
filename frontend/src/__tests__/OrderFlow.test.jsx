import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

import OrderFlow from '../pages/OrderFlow';

describe('OrderFlow', () => {
  test('renders multi-step form and navigates through steps', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true });
    
    render(
      <BrowserRouter>
        <OrderFlow />
      </BrowserRouter>
    );

    // Step 1
    expect(screen.getByText(/Alta Joyería a Medida/i)).toBeInTheDocument();
    
    const nameInput = screen.getByLabelText(/Nombre Completo/i);
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    
    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    const phoneInput = screen.getByLabelText(/Teléfono/i);
    fireEvent.change(phoneInput, { target: { value: '5512345678' } });

    const nextBtn1 = screen.getByText(/Continuar/i);
    fireEvent.click(nextBtn1);

    // Step 2
    expect(screen.getByLabelText(/Tipo de Joya/i)).toBeInTheDocument();
    
    const nextBtn2 = screen.getByText(/Continuar/i);
    fireEvent.click(nextBtn2);

    // Step 3
    expect(screen.getByText(/Detalles Adicionales/i)).toBeInTheDocument();
    const submitBtn = screen.getByText(/Solicitar Cotización/i);
    fireEvent.click(submitBtn);

    // Step 4 (Success)
    expect(await screen.findByText(/Solicitud Enviada/i)).toBeInTheDocument();
  });
});
