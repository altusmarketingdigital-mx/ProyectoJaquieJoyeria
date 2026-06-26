import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['frontend/src/**/*.test.{js,jsx,ts,tsx}'],
    exclude: ['node_modules/**', 'backend/**'],
    deps: { inline: ['@vitejs/plugin-react', 'vite'] },
  },
})
