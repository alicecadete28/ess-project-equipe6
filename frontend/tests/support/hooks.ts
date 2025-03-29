import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { ICustomWorld } from './custom-world';


Before(async function (this: ICustomWorld) {
  this.context = await chromium.launchPersistentContext('', {
    headless: true,
  });
  this.page = await this.context.newPage();
});

After(async function (this: ICustomWorld) {
  if (this.page) {
    // Reload the page
    await this.page.reload()

    // Optional: wait for the page to be fully loaded
    await this.page.waitForLoadState("networkidle")
  }
})