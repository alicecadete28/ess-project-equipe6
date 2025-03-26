// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'http://localhost:3000', // URL base do seu aplicativo
    headless: true, // Executar testes em modo headless
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
});