import { defineConfig, devices } from '@playwright/test';

const PORT = 3210;
const baseURL = `http://localhost:${PORT}`;

// Smoke tests run against the dev server (no Firebase backend needed - they cover the public/client
// surface: landing, room popups, i18n, redirects, PWA, security headers). The in-game flow needs the
// Firebase emulators + an auth bypass and is intentionally out of scope here.
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL, trace: 'on-first-retry' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `npx next dev -p ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
