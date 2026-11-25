import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Các thư viện dùng chung React của project, tránh lỗi Invalid hook call.
    dedupe: ['react', 'react-dom'],
  },
  server: {
    port: 5173, // đề bắt chạy ở http://localhost:5173/
    strictPort: true,
    proxy: {
      // ĐỔI CỔNG BACKEND tại đây nếu đề thi dùng cổng khác.
      '/api': { target: 'http://localhost:8080', changeOrigin: true },
    },
  },
})
