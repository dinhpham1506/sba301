import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Proxy /api sang BE để khỏi CORS. SỬA cổng BE nếu khác 8080
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, proxy: { "/api": "http://localhost:8080" } },
});