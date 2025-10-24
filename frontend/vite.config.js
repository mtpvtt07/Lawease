import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// We have removed the '@tailwindcss/vite' plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], // We have removed tailwindcss() from this array
})