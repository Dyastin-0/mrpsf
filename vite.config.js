import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'chunk-react-core'
          }

          if (id.includes('react-helmet')) {
            return 'chunk-react-helmet'
          }

          if (id.includes('react-router-dom') || id.includes('react-router')) {
            return 'chunk-react-router'
          }

          if (id.includes('react-virtualized-auto-sizer')) {
            return 'chunk-react-virtualized-auto-sizer'
          }

          if (id.includes('react-virtuoso')) {
            return 'chunk-react-virtuoso'
          }

          if (
            id.includes('xterm') ||
            id.includes('xterm-addon-fit') ||
            id.includes('xterm-addon-web-links')
          ) {
            return 'chunk-xterm'
          }

          return 'chunk-vendor'
        }
      }
    }
  }
})
