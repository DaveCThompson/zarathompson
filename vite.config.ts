import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GITHUB PAGES CONFIGURATION
  // Base must match your repository name exactly: /repo-name/
  base: '/zarathompson/', 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})