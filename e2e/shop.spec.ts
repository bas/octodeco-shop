import { test, expect } from '@playwright/test';

test.describe('Octodeco Shop', () => {
  test('landing page loads with hero and featured products', async ({ page }) => {
    await page.goto('/');
    
    // Check hero section
    await expect(page.getByRole('heading', { name: /Decorate Your World/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /View Featured Stickers/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Shop All Stickers/i })).toBeVisible();
    
    // Check featured products section
    await expect(page.getByRole('heading', { name: 'Featured Stickers' })).toBeVisible();
    
    // Should have 4 featured products
    const productCards = page.locator('[href^="/products/"]').filter({ has: page.getByRole('button', { name: 'Add to Cart' }) });
    await expect(productCards).toHaveCount(4);
  });

  test('products page shows all 20 stickers', async ({ page }) => {
    await page.goto('/products');
    
    await expect(page.getByRole('heading', { name: 'All Stickers' })).toBeVisible();
    
    // Should have 20 products
    const productCards = page.locator('[href^="/products/"]').filter({ has: page.getByRole('button', { name: 'Add to Cart' }) });
    await expect(productCards).toHaveCount(20);
  });

  test('product detail page shows product info', async ({ page }) => {
    await page.goto('/products/dinotocat');
    
    await expect(page.getByRole('heading', { name: 'Dinotocat', level: 1 })).toBeVisible();
    await expect(page.getByText('$5.99')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add to Cart' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Increase quantity' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Back to products/i })).toBeVisible();
  });

  test('add to cart flow works', async ({ page }) => {
    await page.goto('/products/original');
    
    // Add to cart
    await page.getByRole('button', { name: 'Add to Cart' }).click();
    
    // Check cart badge updates
    const cartBadge = page.locator('button[aria-label="Open cart"]').locator('span, div').filter({ hasText: '1' });
    await expect(cartBadge).toBeVisible();
    
    // Button should change to "Added to Cart!"
    await expect(page.getByRole('button', { name: /Added to Cart/i })).toBeVisible();
  });

  test('cart drawer shows items and totals', async ({ page }) => {
    await page.goto('/products/surftocat');
    
    // Increase quantity to 2
    await page.getByRole('button', { name: 'Increase quantity' }).click();
    
    // Add to cart
    await page.getByRole('button', { name: 'Add to Cart' }).click();
    
    // Open cart drawer
    await page.getByRole('button', { name: 'Open cart' }).click();
    
    // Check cart contents - use dialog container to avoid ambiguity
    const cartDialog = page.getByRole('dialog', { name: 'Shopping cart' });
    await expect(cartDialog.getByRole('heading', { name: 'Surftocat' })).toBeVisible();
    // Check the subtotal text specifically (use exact: false to match the text context)
    await expect(cartDialog.getByText('Subtotal').locator('..').getByText('$11.98')).toBeVisible(); // 2 x $5.99
    
    // Check checkout button is enabled
    await expect(cartDialog.getByRole('button', { name: 'Proceed to Checkout' })).toBeEnabled();
  });

  test('checkout form validates required fields', async ({ page }) => {
    // Add item to cart first
    await page.goto('/products/original');
    await page.getByRole('button', { name: 'Add to Cart' }).click();
    
    // Go to checkout
    await page.goto('/checkout');
    
    // Try to submit empty form
    await page.getByRole('button', { name: 'Place Order' }).click();
    
    // Check validation errors appear
    await expect(page.getByText('First name is required')).toBeVisible();
    await expect(page.getByText('Last name is required')).toBeVisible();
    await expect(page.getByText('Please enter a valid email')).toBeVisible();
    await expect(page.getByText('Address is required')).toBeVisible();
    await expect(page.getByText('City is required')).toBeVisible();
  });

  test('checkout form submits successfully', async ({ page }) => {
    // Add item to cart
    await page.goto('/products/original');
    await page.getByRole('button', { name: 'Add to Cart' }).click();
    
    // Go to checkout
    await page.goto('/checkout');
    
    // Fill in form
    await page.getByRole('textbox', { name: 'First Name' }).fill('John');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Doe');
    await page.getByRole('textbox', { name: 'Email' }).fill('john@example.com');
    await page.getByRole('textbox', { name: 'Address' }).fill('123 Main St');
    await page.getByRole('textbox', { name: 'City' }).fill('Seattle');
    await page.getByRole('textbox', { name: 'Postal Code' }).fill('98101');
    await page.getByRole('textbox', { name: 'Country' }).fill('United States');
    
    // Submit - listen for dialog
    page.on('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'Place Order' }).click();
    
    // Cart should be empty after order - target the main checkout page heading (h2, not the h3 in cart drawer)
    await expect(page.getByRole('heading', { name: 'Your cart is empty', level: 2 })).toBeVisible();
  });

  test('empty cart shows message on checkout', async ({ page }) => {
    await page.goto('/checkout');
    
    // Target the h2 heading on the checkout page specifically (not the h3 in cart drawer)
    await expect(page.getByRole('heading', { name: /Your cart is empty/i, level: 2 })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Browse Products' })).toBeVisible();
  });

  test('navigation works correctly', async ({ page }) => {
    await page.goto('/');
    
    // Click Stickers link in navigation (use exact match and first to target navbar link)
    await page.getByRole('link', { name: 'Stickers', exact: true }).first().click();
    await expect(page).toHaveURL('/products');
    
    // Click Home link (use first() to target navbar link, not footer)
    await page.getByRole('link', { name: 'Home' }).first().click();
    await expect(page).toHaveURL('/');
    
    // Click logo
    await page.getByRole('link', { name: 'Octodeco' }).first().click();
    await expect(page).toHaveURL('/');
  });
});
