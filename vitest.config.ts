import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.spec.ts', 'scripts/**/*.spec.ts'],
    environment: 'node',
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
    unstubEnvs: true,
    unstubGlobals: true,
    coverage: {
      include: ['src/**/*.ts', 'scripts/**/*.ts'],
      exclude: ['**/*.spec.ts', '**/consts.ts', '**/types/**', 'scripts/*.ts'],
      reporter: ['text', 'html'],
    },
  },
});
