import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/anecdotes': 'http://localhost:3001',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    exclude: ['node_modules', 'dist', 'e2e-tests/**'],
  },
})
