# OctoDeco Shop 🐙

A demo e-commerce webshop for Octocat stickers, built with Next.js 16 and Tailwind CSS v4.

## Features

- 🛍️ **Product Catalog** — Browse 20 unique Octocat sticker designs
- 🛒 **Shopping Cart** — Add items, adjust quantities, persistent localStorage
- 📦 **Checkout Flow** — Shipping & billing forms with Zod validation
- 📱 **Responsive Design** — Works on desktop and mobile
- ⚡ **Server Components** — Fast initial page loads with Next.js App Router

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com)
- **Icons:** [Lucide React](https://lucide.dev)
- **Validation:** [Zod](https://zod.dev)
- **Testing:** [Playwright](https://playwright.dev)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the shop.

## Project Structure

```
app/
├── page.tsx              # Home page with hero & featured products
├── products/
│   ├── page.tsx          # All products grid
│   └── [slug]/page.tsx   # Individual product detail
└── checkout/page.tsx     # Checkout form

components/
├── ui/                   # Reusable UI primitives (Button, Input, Badge)
├── cart/                 # Cart drawer and cart item components
└── checkout/             # Checkout form components
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## License

MIT
