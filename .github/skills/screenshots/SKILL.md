---
name: screenshots
description: Captures screenshots of web application pages using Playwright. Use when the user asks to take screenshots, capture page visuals, document UI states, or create design documentation. Supports full-page screenshots, element screenshots, and multiple page capture workflows.
license: MIT
metadata:
  author: octodeco
  version: "1.0"
---

# Screenshot Capture

Capture screenshots of web application pages using Playwright.

## When to Use

- User asks to "take screenshots" or "capture the UI"
- Documenting design states for review
- Creating visual documentation
- Capturing before/after comparisons
- Recording UI states for bug reports

## Prerequisites

1. **Playwright must be installed**: `npm install -D playwright`
2. **A running dev server** (or use the `webapp-testing` skill's `with_server.py` helper)

## Quick Start

For simple screenshot tasks, write a TypeScript script using Playwright:

```typescript
import { chromium } from 'playwright';

async function takeScreenshots() {
  const browser = await chromium.launch({ 
    headless: true,
    channel: 'chrome'  // Use installed Chrome for stability
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshot.png', fullPage: true });

  await browser.close();
}

takeScreenshots();
```

Run with: `npx tsx scripts/your-screenshot-script.ts`

## Screenshot Options

### Full Page Screenshot
```typescript
await page.screenshot({ path: 'full-page.png', fullPage: true });
```

### Viewport Only
```typescript
await page.screenshot({ path: 'viewport.png', fullPage: false });
```

### Element Screenshot
```typescript
const element = page.locator('.hero-section');
await element.screenshot({ path: 'hero.png' });
```

### With Quality Settings (JPEG)
```typescript
await page.screenshot({ 
  path: 'compressed.jpg', 
  type: 'jpeg',
  quality: 80 
});
```

## Multi-Page Workflow

For capturing multiple pages (e.g., documenting a complete flow):

```typescript
const pages = [
  { url: '/', name: '01-home' },
  { url: '/products', name: '02-products' },
  { url: '/products/example', name: '03-product-detail' },
  { url: '/checkout', name: '04-checkout' },
];

for (const { url, name } of pages) {
  await page.goto(`http://localhost:3000${url}`);
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: `docs/design/${name}.png`, fullPage: true });
}
```

## Tips

1. **Always wait for network idle** before capturing to ensure all assets load
2. **Close modals/drawers** with `page.keyboard.press('Escape')` before full-page shots
3. **Use a consistent viewport** (1280x800 is standard for documentation)
4. **Create output directory first**: `mkdir -p docs/design`
5. **Use `channel: 'chrome'`** in launch options to use installed Chrome for better stability

## Example Script Location

See `scripts/take-screenshots.ts` in this skill directory for a complete example that captures multiple pages of the Octodeco webshop.

Run it with:
```bash
npx tsx .github/skills/screenshots/scripts/take-screenshots.ts
```
