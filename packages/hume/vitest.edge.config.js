import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'edge-runtime',
<<<<<<< HEAD
=======
    globals: true,
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
    include: ['**/*.test.ts', '**/*.test.tsx'],
  },
});
