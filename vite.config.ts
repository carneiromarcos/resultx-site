import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const page = (file: string) => fileURLToPath(new URL(file, import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Duas páginas. privacidade.html tem conteúdo estático e bootstrap de consentimento e o Cloudflare
      // Pages a serve em /privacidade.
      input: {
        main: page('./index.html'),
        privacidade: page('./privacidade.html'),
      },
    },
  },
})
