/// <reference types="vitest/config" />

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: 'src',
      outDir: 'dist/types',
      tsconfigPath: './tsconfig.lib.json',
      insertTypesEntry: true,
      copyDtsFiles: true,
      rollupTypes: true,
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.ts',
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    typecheck: {
      tsconfig: './tsconfig.test.json',
    },
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: 'coverage',
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
      exclude: [
        '**/{.turbo,coverage,dist,node_modules}/**',
        'src/**/*.d.ts',
        'src/**/index.{js,jsx,ts,tsx}',
        'src/**/*.{test,spec}.{js,jsx,ts,tsx}',
        'src/**/*.stories.{ts,tsx}',
        'src/**/*.mock.{js,ts}',
        '**/{vite,eslint}.config.{js,ts}',
        'src/setupTests.ts',
      ],
    },
  },
});
