import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Photobooth/',  // GitHub Pages repo name
  build: {
    outDir: 'docs',  // Output to docs folder for GitHub Pages
  },
})
