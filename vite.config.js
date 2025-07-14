import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    server: {
    port: 5174, // 👈 Explicitly set the frontend port
  },
  plugins: [react(),  tailwindcss()],
})
