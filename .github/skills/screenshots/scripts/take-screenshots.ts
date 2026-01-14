import { chromium } from 'playwright';

async function takeScreenshots() {
  // Configurable base URL via environment variable or command line arg
  const baseUrl = process.argv[2] || process.env.BASE_URL || 'http://localhost:3000';
  const outputDir = process.argv[3] || process.env.OUTPUT_DIR || './docs/design';

  console.log(`Using base URL: ${baseUrl}`);
  console.log(`Output directory: ${outputDir}`);

  const browser = await chromium.launch({ 
    headless: true,
    channel: 'chrome'  // Use installed Chrome
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  // Landing page
  console.log('Taking screenshot: landing page...');
  await page.goto(baseUrl);
  await page.waitForLoadState('networkidle');
  // Close cart drawer if open by pressing Escape
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${outputDir}/01-landing-page.png`, fullPage: true });

  // Products page
  console.log('Taking screenshot: products page...');
  await page.goto(`${baseUrl}/products`);
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: `${outputDir}/02-products-page.png`, fullPage: true });

  // Product detail page
  console.log('Taking screenshot: product detail page...');
  await page.goto(`${baseUrl}/products/dinotocat`);
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: `${outputDir}/03-product-detail.png`, fullPage: true });

  // Add item to cart - capture button animation
  console.log('Taking screenshot: add to cart button...');
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${outputDir}/04-add-to-cart.png`, fullPage: false });

  // Cart drawer open
  console.log('Taking screenshot: cart drawer...');
  await page.waitForTimeout(500);
  // Click the cart icon in navbar to ensure drawer is open
  await page.getByRole('button', { name: 'Open cart' }).click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${outputDir}/05-cart-drawer.png`, fullPage: false });

  // Checkout page with items
  console.log('Taking screenshot: checkout page...');
  await page.goto(`${baseUrl}/checkout`);
  await page.waitForLoadState('networkidle');
  // Close cart drawer
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${outputDir}/06-checkout-page.png`, fullPage: true });

  await browser.close();
  console.log('Screenshots saved to docs/design/');
}

takeScreenshots().catch(console.error);
