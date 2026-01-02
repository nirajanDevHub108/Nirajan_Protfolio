import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',         // Only look for E2E tests in the tests folder
  testIgnore: '**/src/**',    // Explicitly ignore Jest unit tests in src/
  
  webServer: {
    command: 'npx serve -s build -l 3000',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI, // true locally, false in Jenkins
    timeout: 120 * 1000,
  },
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  // Configure projects for cross-browser coverage
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
