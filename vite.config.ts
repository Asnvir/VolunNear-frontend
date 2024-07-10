import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

const port = parseInt(process.env.VITE_FRONTEND_PORT || '3000', 10); // Provide a default value and convert to number

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port,
  },
});
