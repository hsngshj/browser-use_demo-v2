import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 環境変数で本番/開発を切り替え
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    minify: isProduction ? 'terser' : false,
    sourcemap: !isProduction,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['lucide-react']
        }
      }
    }
  },
  server: !isProduction ? {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  } : undefined
});
