import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Proxy /api -> BE 8080 để tránh CORS
export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/api': 'http://localhost:8080' } },
})
