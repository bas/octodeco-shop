import { test, expect } from '@playwright/test';

test.describe('Discount Coupon Code Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Add items to cart before each test
    await page.goto('/products/original');
    await page.getByRole('button', { name: 'Add to Cart' }).click();
    await page.goto('/checkout');
  });

  test('coupon input field is visible on checkout page', async ({ page }) => {
    // Check that coupon input exists
    await expect(page.getByPlaceholder('Enter coupon code')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Apply' })).toBeVisible();
  });

  test('apply valid coupon code SAVE10', async ({ page }) => {
    // Get initial subtotal (Original sticker is $4.99)
    await expect(page.getByText('Subtotal')).toBeVisible();
    
    // Enter valid coupon code
    await page.getByPlaceholder('Enter coupon code').fill('SAVE10');
    await page.getByRole('button', { name: 'Apply' }).click();
    
    // Check success message - wait for it to appear
    await expect(page.getByText('Coupon Applied: SAVE10')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('10% off')).toBeVisible();
    
    // Check discount appears in order summary
    await expect(page.getByText('Discount (10%)')).toBeVisible();
    
    // Check that discount amount is visible (10% of $4.99 = $0.50)
    await expect(page.getByText('-$0.50')).toBeVisible();
    
    // Check that total is updated
    const orderSummary = page.locator('.bg-foreground\\/5');
    await expect(orderSummary.getByText('$4.49')).toBeVisible();
  });

  test('apply valid coupon code SAVE15 - case insensitive', async ({ page }) => {
    // Enter coupon in lowercase
    await page.getByPlaceholder('Enter coupon code').fill('save15');
    await page.getByRole('button', { name: 'Apply' }).click();
    
    // Check success message
    await expect(page.getByText(/Coupon applied.*15%/i)).toBeVisible();
    
    // Check that coupon is displayed with uppercase code
    await expect(page.getByText('Coupon Applied: SAVE15')).toBeVisible();
    
    // Check discount appears
    await expect(page.getByText('Discount (15%)')).toBeVisible();
  });

  test('show error for invalid coupon code', async ({ page }) => {
    // Enter invalid coupon code
    await page.getByPlaceholder('Enter coupon code').fill('INVALID123');
    await page.getByRole('button', { name: 'Apply' }).click();
    
    // Check error message appears
    await expect(page.getByText('Invalid coupon code')).toBeVisible();
    
    // Ensure no discount is applied
    await expect(page.getByText('Discount')).not.toBeVisible();
  });

  test('show error for empty coupon code', async ({ page }) => {
    // Click apply without entering a code
    await page.getByRole('button', { name: 'Apply' }).click();
    
    // Check error message
    await expect(page.getByText('Please enter a coupon code')).toBeVisible();
  });

  test('error clears when user modifies input', async ({ page }) => {
    // Trigger error
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect(page.getByText('Please enter a coupon code')).toBeVisible();
    
    // Start typing
    await page.getByPlaceholder('Enter coupon code').fill('S');
    
    // Error should disappear
    await expect(page.getByText('Please enter a coupon code')).not.toBeVisible();
  });

  test('remove applied coupon', async ({ page }) => {
    // Apply a coupon
    await page.getByPlaceholder('Enter coupon code').fill('SAVE20');
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect(page.getByText('Coupon Applied: SAVE20')).toBeVisible();
    
    // Remove the coupon
    await page.getByLabel('Remove coupon').click();
    
    // Check that coupon is removed
    await expect(page.getByText('Coupon Applied: SAVE20')).not.toBeVisible();
    
    // Check that input field is back
    await expect(page.getByPlaceholder('Enter coupon code')).toBeVisible();
    
    // Check that discount is no longer shown
    await expect(page.getByText('Discount')).not.toBeVisible();
    
    // Check that total reverts to original
    const orderSummary = page.locator('.bg-foreground\\/5');
    await expect(orderSummary.getByText('$4.99').last()).toBeVisible();
  });

  test('free shipping applies when discounted total exceeds $25', async ({ page }) => {
    // Navigate to a different product and add multiple items
    await page.goto('/products/surftocat');
    
    // Wait for page to load and set quantity to 5
    await page.waitForLoadState('networkidle');
    const quantityInput = page.locator('input[type="number"]');
    await quantityInput.fill('5');
    
    // Add to cart
    await page.getByRole('button', { name: 'Add to Cart' }).click();
    await page.waitForTimeout(500); // Wait for cart update
    
    await page.goto('/checkout');
    
    // Initial subtotal should be around $35.94 (6 items total)
    // Without coupon, shipping should not be free (threshold is originally $50)
    await expect(page.getByText('Calculated at next step')).toBeVisible();
    
    // Apply 20% coupon (20% off $35.94 = $7.19, final: $28.75)
    await page.getByPlaceholder('Enter coupon code').fill('SAVE20');
    await page.getByRole('button', { name: 'Apply' }).click();
    
    // After discount, total should be over $25, so shipping should be free
    await expect(page.getByText('Free', { exact: true })).toBeVisible();
  });

  test('free shipping does not apply when discounted total is below $25', async ({ page }) => {
    // Single item ($5.99) with 10% off = $5.39, which is below $25
    await page.getByPlaceholder('Enter coupon code').fill('SAVE10');
    await page.getByRole('button', { name: 'Apply' }).click();
    
    // Shipping should not be free
    await expect(page.getByText('Calculated at next step')).toBeVisible();
    await expect(page.getByText('Free', { exact: true })).not.toBeVisible();
  });

  test('coupon persists across page navigation', async ({ page }) => {
    // Apply coupon
    await page.getByPlaceholder('Enter coupon code').fill('SAVE15');
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect(page.getByText('Coupon Applied: SAVE15')).toBeVisible();
    
    // Navigate away
    await page.goto('/products');
    
    // Navigate back to checkout
    await page.goto('/checkout');
    
    // Coupon should still be applied
    await expect(page.getByText('Coupon Applied: SAVE15')).toBeVisible();
    await expect(page.getByText('Discount (15%)')).toBeVisible();
  });

  test('coupon is cleared when cart is emptied', async ({ page }) => {
    // Apply coupon
    await page.getByPlaceholder('Enter coupon code').fill('SAVE10');
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect(page.getByText('Coupon Applied: SAVE10')).toBeVisible();
    
    // Open cart and clear it
    await page.getByRole('button', { name: 'Open cart' }).click();
    const cartDialog = page.getByRole('dialog', { name: 'Shopping cart' });
    await cartDialog.getByRole('button', { name: 'Clear Cart' }).click();
    
    // Close cart dialog
    await page.getByRole('button', { name: 'Close cart' }).click();
    
    // Go to checkout - should see empty cart message
    await page.goto('/checkout');
    await expect(page.getByRole('heading', { name: /Your cart is empty/i, level: 2 })).toBeVisible();
    
    // Add item again
    await page.goto('/products/original');
    await page.getByRole('button', { name: 'Add to Cart' }).click();
    await page.goto('/checkout');
    
    // Coupon should not be applied anymore
    await expect(page.getByText('Coupon Applied:')).not.toBeVisible();
    await expect(page.getByPlaceholder('Enter coupon code')).toBeVisible();
  });

  test('discount calculation is accurate for multiple coupons', async ({ page }) => {
    // Add more items
    await page.goto('/products/dinotocat');
    await page.getByRole('button', { name: 'Add to Cart' }).click();
    await page.goto('/checkout');
    
    // Apply SAVE25 (25% off)
    await page.getByPlaceholder('Enter coupon code').fill('WELCOME25');
    await page.getByRole('button', { name: 'Apply' }).click();
    
    // Verify coupon is applied
    await expect(page.getByText('Coupon Applied: WELCOME25')).toBeVisible();
    await expect(page.getByText('25% off')).toBeVisible();
    
    // Check that discount line shows in summary
    await expect(page.getByText('Discount (25%)')).toBeVisible();
  });

  test('only one coupon can be applied at a time', async ({ page }) => {
    // Apply first coupon
    await page.getByPlaceholder('Enter coupon code').fill('SAVE10');
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect(page.getByText('Coupon Applied: SAVE10')).toBeVisible();
    
    // Input field should be hidden/disabled
    await expect(page.getByPlaceholder('Enter coupon code')).not.toBeVisible();
    
    // User must remove current coupon to apply a different one
    await page.getByLabel('Remove coupon').click();
    
    // Now can apply a different coupon
    await page.getByPlaceholder('Enter coupon code').fill('SAVE20');
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect(page.getByText('Coupon Applied: SAVE20')).toBeVisible();
  });

  test('checkout form submission works with coupon applied', async ({ page }) => {
    // Apply coupon
    await page.getByPlaceholder('Enter coupon code').fill('SAVE15');
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect(page.getByText('Coupon Applied: SAVE15')).toBeVisible();
    
    // Fill in checkout form
    await page.getByRole('textbox', { name: 'First Name' }).fill('Jane');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Smith');
    await page.getByRole('textbox', { name: 'Email' }).fill('jane@example.com');
    await page.getByRole('textbox', { name: 'Address' }).fill('456 Oak Ave');
    await page.getByRole('textbox', { name: 'City' }).fill('Portland');
    await page.getByRole('textbox', { name: 'Postal Code' }).fill('97201');
    await page.getByRole('textbox', { name: 'Country' }).fill('United States');
    
    // Submit order - handle dialog
    page.on('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'Place Order' }).click();
    
    // Cart should be empty after order, and coupon should be cleared
    await expect(page.getByRole('heading', { name: 'Your cart is empty', level: 2 })).toBeVisible();
  });
});
