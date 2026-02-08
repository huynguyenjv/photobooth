import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/photobooth/',  // GitHub Pages repo name (lowercase)
  build: {
    outDir: 'docs',  // Output to docs folder for GitHub Pages
  },
})
