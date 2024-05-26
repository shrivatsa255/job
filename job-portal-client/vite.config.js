import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'src': '/src', // Map 'src' to the root of your project
    },
  },
  build: {
    sourcemap: true, // Enable source maps in the build process
  },
});
