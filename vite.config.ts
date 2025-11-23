import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // CRITICAL: Replace 'zarathompson' with your exact GitHub Repository name.
  // If your repo is https://github.com/DaveCThompson/my-art, this should be '/my-art/'
  base: '/zarathompson/', 
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})