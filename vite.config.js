import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  base: '/company/',
  plugins: [
    react(), 
    tailwindcss(),
    sitemap({
        hostname: 'https://skyaccount.perahara.lk',
        dynamicRoutes: ['/', '/about', '/services', '/projects', '/contact'],
        basePath: '/company'
    })
  ],
  build: {
    // Optimization: Manual chunking for heavy libraries
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'ui-vendor': ['framer-motion', 'lucide-react', 'lenis'],
        },
      },
    },
    cssCodeSplit: true,
    assetsInlineLimit: 4096, // Inline small assets under 4kb
  },
  esbuild: {
    // Drop logs and debugger in production builds for performance
    drop: ['console', 'debugger'],
  },
})
