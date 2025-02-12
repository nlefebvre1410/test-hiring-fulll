import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/__tests__/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/algo/**/*.ts'],
      exclude: ['src/algo/**/*.test.ts', 'src/algo/**/*.spec.ts'],
    },
  },
});
