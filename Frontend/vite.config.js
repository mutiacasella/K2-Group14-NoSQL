import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5050,
    proxy: {
      '/store': 'https://twinklybackend-production.up.railway.app',
      '/user': 'https://twinklybackend-production.up.railway.app',
      '/item': 'https://twinklybackend-production.up.railway.app',
      '/transaction': 'https://twinklybackend-production.up.railway.app',
      '/affirmation': 'https://twinklybackend-production.up.railway.app',

    },
  },
})
