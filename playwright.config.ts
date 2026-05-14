import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './checks/resources',
  testMatch: '**/*.spec.ts',
  timeout: 30_000,
  fullyParallel: true,
  reporter: [['list']],
  use: {
    trace: 'retain-on-failure',
  },
});
