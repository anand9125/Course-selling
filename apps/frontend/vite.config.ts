import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'mui-vendor': ['@mui/material', '@mui/icons-material'],
          'lodash': ['lodash'],
          // Use the alias instead of a relative path:
          'utils': ['@utils/helpers'],
        },
      },
    },
  },
});
