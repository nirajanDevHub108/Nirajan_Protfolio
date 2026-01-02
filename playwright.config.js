import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Run your build server before starting the tests
  webServer: {
    command: 'npx serve -s build -l 3000', // Command to start server
    url: 'http://localhost:3000',          // URL to wait for before starting tests
    reuseExistingServer: !process.env.CI,  // Use existing server locally, fresh in CI
    timeout: 120 * 1000,                   // Wait up to 2 mins for slow CI builds
  },
  use: {
    baseURL: 'http://localhost:3000',      // Base URL for page.goto('/')
  },
});
