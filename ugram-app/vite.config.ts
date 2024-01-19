/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  // https://vitejs.dev/config/
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // See https://vitejs.dev/guide/env-and-mode.html#env-files
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    plugins: [svgr(), react()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './test/setup.js',
    },
    server: {
      watch: {
        usePolling: true,
      },
      host: true, // needed for the Docker Container port mapping to work
      strictPort: true,
    },
  };
});
