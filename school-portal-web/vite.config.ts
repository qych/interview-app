import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
const env = require('./env.json');

export default defineConfig({
  server: {
    host: 'localhost',
    port: env.server.port,
    strictPort: true
  },

  preview: {
    host: 'localhost',
    port: env.server.port,
    strictPort: true
  },

  plugins: [
    react(),
    nodePolyfills({
      exclude: ['fs', 'child_process']
    }),
    {
      ...checker({ typescript: true }),
      apply: 'serve'
    }
  ],

  resolve: {
    dedupe: ['react'],
    preserveSymlinks: true
  },

  optimizeDeps: {
    force: true,
    include: [
      'school-portal-common'
    ]
  },

  build: {
    outDir: 'build',
    emptyOutDir: true,
    commonjsOptions: {
      include: [
        /node_modules/,
        /school-portal-common/
      ]
    }
  }
})
