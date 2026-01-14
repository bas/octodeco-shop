# Octodeco Sticker Webshop — Initial Features Plan

Build a parallel-development-friendly webshop for Octodeco with landing page, product pages, cart, and checkout — leveraging the existing 20 Octocat sticker images in the fresh Next.js 16 + Tailwind v4 stack.

## Phase 1: Shared Foundation (Pre-requisite)

1. Create folder structure: `components/`, `components/ui/`, `lib/`, `types/`, `contexts/`, `hooks/`
2. Define core types in `types/index.ts`: `Product`, `CartItem`, `ShippingDetails`, `BillingDetails`
3. Create product data in `lib/products.ts` with the 20 existing Octocat sticker images
4. Add shared dependencies: `lucide-react` for icons, `zod` for validation
5. Build shared UI primitives in `components/ui/`: `Button`, `Input`, `Badge`
6. Create `Navbar` component with logo, nav links, and cart icon/badge
7. Create `CartContext` with state: items, addItem, removeItem, updateQuantity, clearCart
8. Wrap `CartProvider` in `app/layout.tsx` for global cart state
9. Add Octodeco brand colors as CSS variables in `app/globals.css`

## Phase 2: Parallel Page Development (4 streams)

```
┌─────────────────────────────────────────────────────────────┐
│                     Phase 1 Foundation                       │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
   ┌─────────┐          ┌─────────┐          ┌─────────┐
   │Stream A │          │Stream B │          │Stream D │
   │ Landing │          │Products │          │Checkout │
   │  Page   │          │  Pages  │          │  (UI)   │
   └─────────┘          └─────────┘          └─────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              ▼
                    ┌─────────────────┐
                    │    Phase 3      │
                    │   Integration   │
                    └─────────────────┘
```

### Stream A — Landing Page (`app/page.tsx`)

1. Build `HeroSection` component with Octodeco branding and CTA
2. Build `FeaturedProducts` grid showing 4-6 stickers with "Add to Cart" buttons
3. Build `Footer` component with links and branding

**Done when:** Hero displays, 6 featured products render with working "Add to Cart", footer shows

### Stream B — Product Pages (`app/products/`)

1. Create `app/products/page.tsx` with full `ProductGrid` of all stickers
2. Create `app/products/[slug]/page.tsx` for individual product detail
3. Build `ProductCard` component with image, title, price, and "Add to Cart" button

**Done when:** All 20 products display in grid, each product detail page works, "Add to Cart" functional

### Stream C — Cart UI (`components/cart/`)

> **Note:** CartContext is created in Phase 1. This stream builds the UI components.

1. Build `CartDrawer` component (slide-out panel showing cart contents)
2. Build `CartItem` component for individual items in cart
3. Build `CartSummary` component showing subtotal and checkout button
4. Connect cart icon in Navbar to toggle CartDrawer

**Done when:** Cart drawer opens/closes, shows items, quantities update, total calculates correctly

### Stream D — Checkout Page (`app/checkout/page.tsx`)

1. Create checkout form with shipping details (name, address, city, postal code, country)
2. Add billing details section with "same as shipping" toggle
3. Build `OrderSummary` component showing cart items and totals
4. Add form validation with Zod

**Done when:** Form renders, validation works, order summary shows cart contents, "Place Order" button present

## Phase 3: Refactor & Integration ✅

1. ✅ Add cart persistence to localStorage — CartContext now loads/saves to localStorage with SSR-safe handling
2. ✅ Review and consolidate duplicate code — FeaturedProducts now uses shared ProductCard component
3. ✅ Ensure consistent styling and spacing — All "Add to Cart" buttons use Button component, prices use $X.XX format
4. ✅ Loading states — Cart has `isLoaded` state for hydration handling
5. ✅ Test full user flow: browse → add to cart → checkout — All flows verified, build passes

## Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| UI Components | Build custom | Scope is small; avoids dependency overhead |
| Cart Storage | localStorage | Simple, sufficient for MVP, no backend needed |
| Product Data | Static JSON in `lib/products.ts` | 20 products, rarely changes, no CMS needed |
| Form Validation | Zod | Already planned as dependency, type-safe |
