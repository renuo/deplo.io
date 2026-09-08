import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run build && npm run preview',
    env: { PORT: '4173' },
    port: 4173,
  },

  testDir: 'e2e',
});
