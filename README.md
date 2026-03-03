# Logiteria Commerce Storefront Starter

A production-ready Next.js 15 starter template for building custom storefronts on [Logiteria Commerce](https://logiteria.com). Clone, configure your store URL, and start selling.

Built with `@logiteria/commerce-sdk`, Tailwind CSS 4, and React 19.

## Quick Start

### 1. Clone and install

```bash
# Clone the starter
git clone https://github.com/logiteria/storefront-starter.git my-store
cd my-store

# Install dependencies
npm install
# or
pnpm install
```

### 2. Configure

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_STORE_URL=https://your-store.lumocomm.com
```

### 3. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description | Data Strategy |
|-------|-------------|---------------|
| `/` | Home page with featured products and collections | ISR (60s) |
| `/shop` | Product listing with search and filters | Client-side |
| `/product/[slug]` | Product detail with images and variants | Dynamic SSR |
| `/collections` | Collections grid | ISR (300s) |
| `/collections/[slug]` | Collection with products | Dynamic SSR |
| `/cart` | Shopping cart | Client-side (Zustand) |
| `/checkout` | Checkout flow (address, shipping, payment) | Client-side |
| `/checkout/success` | Order confirmation | Client-side |
| `/auth/login` | Sign in | Client-side |
| `/auth/register` | Create account | Client-side |
| `/account` | Account dashboard | Client-side |
| `/account/orders` | Order history | Client-side |
| `/account/addresses` | Address book | Client-side |

## Components

### Layout
- `Header` — Logo, navigation, search, cart icon, auth status
- `Footer` — Links, copyright
- `MobileNav` — Slide-out mobile menu

### Product
- `ProductCard` — Card with image, name, price, sale badge
- `ProductGrid` — Responsive grid layout
- `ProductImages` — Main image + thumbnail gallery
- `AddToCartButton` — Quantity selector + add to cart

### Cart
- `CartDrawer` — Slide-out cart panel
- `CartItem` — Line item with quantity controls
- `CartSummary` — Subtotal, shipping, tax, total

### Checkout
- `CheckoutForm` — Multi-step checkout flow
- `AddressForm` — Reusable address input form

### Shared
- `Price` — Formatted price with currency, sale price
- `Badge` — Status labels (sale, out of stock)
- `Breadcrumb` — Navigation breadcrumbs
- `Pagination` — Page navigation
- `SearchBar` — Search input with debounced results

## Project Structure

```
app/
  layout.tsx              # Root layout with CommerceProvider
  page.tsx                # Home page
  shop/page.tsx           # Product listing
  product/[slug]/page.tsx # Product detail
  collections/            # Collection pages
  cart/page.tsx            # Cart
  checkout/               # Checkout flow
  auth/                   # Login, register
  account/                # Account pages
  not-found.tsx           # 404 page
  error.tsx               # Error boundary
components/
  layout/                 # Header, Footer, MobileNav
  product/                # ProductCard, ProductGrid, ProductImages, AddToCartButton
  cart/                   # CartDrawer, CartItem, CartSummary
  checkout/               # CheckoutForm, AddressForm
  shared/                 # Price, Badge, Breadcrumb, Pagination, SearchBar
lib/
  commerce.ts             # SDK config from env vars
  utils.ts                # cn(), formatPrice()
styles/
  globals.css             # Tailwind + CSS custom properties
```

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_STORE_URL` | Yes | Your Logiteria Commerce instance URL |

### API Proxying

The starter uses Next.js rewrites to proxy API calls from the browser:

```typescript
// next.config.ts
async rewrites() {
  return [
    {
      source: '/api/v1/:path*',
      destination: `${process.env.NEXT_PUBLIC_STORE_URL}/api/v1/:path*`,
    },
  ]
}
```

This avoids CORS issues — browser requests go to `/api/v1/...` on the same origin, and Next.js forwards them to your Commerce backend.

### Theming

All colors use CSS custom properties in `styles/globals.css`. Modify these to match your brand:

```css
:root {
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-accent: #f59e0b;
  --color-surface: #ffffff;
  --color-surface-elevated: #f8fafc;
  --color-text: #0f172a;
  --color-text-muted: #64748b;
  --color-border: #e2e8f0;
  --color-error: #ef4444;
  --color-success: #22c55e;
  --radius: 0.5rem;
}
```

Dark mode is automatic via `prefers-color-scheme: dark` with a separate set of variables.

## Customization

### Adding a new page

1. Create `app/your-page/page.tsx`
2. For static data, use fetchers from `@logiteria/commerce-sdk/next`
3. For client-side data, use hooks from `@logiteria/commerce-sdk/react`

### Modifying the cart

The cart uses Zustand with localStorage persistence. State is managed by the SDK's `useCart()` hook:

```tsx
import { useCart } from '@logiteria/commerce-sdk/react'

function MyComponent() {
  const {
    items,          // CartItem[]
    itemCount,      // Total items
    subtotal,       // Subtotal in cents
    total,          // Grand total in cents
    addItem,        // Add product to cart
    removeItem,     // Remove by item ID
    updateQuantity, // Change quantity
    applyCoupon,    // Apply discount code
    removeCoupon,   // Remove discount
    clear,          // Empty cart
  } = useCart()
}
```

### Adding authentication guards

Wrap account pages with an auth check:

```tsx
'use client'
import { useAuth } from '@logiteria/commerce-sdk/react'
import { redirect } from 'next/navigation'

export default function AccountLayout({ children }) {
  const { isAuthenticated, initialized } = useAuth()

  if (!initialized) return <div>Loading...</div>
  if (!isAuthenticated) redirect('/auth/login?redirect=/account')

  return <>{children}</>
}
```

## Deployment

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable
vercel env add NEXT_PUBLIC_STORE_URL
```

### Netlify

```bash
npm run build
```

Set `NEXT_PUBLIC_STORE_URL` in Netlify's environment variables. Build command: `npm run build`, publish directory: `.next`.

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
ENV PORT=3000
CMD ["node", "server.js"]
```

## Monorepo Usage

When developing inside the Logiteria Commerce monorepo:

```json
{
  "dependencies": {
    "@logiteria/commerce-sdk": "workspace:*"
  }
}
```

The `pnpm-workspace.yaml` at the repo root links `packages/*` automatically.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run lint` | Run Next.js linter |

## Tech Stack

- **Next.js 15** — App Router, ISR, Server Components
- **React 19** — Client Components with hooks
- **TypeScript 5** — Full type safety
- **Tailwind CSS 4** — Utility-first styling
- **Zustand 5** — Client-side state (cart, auth)
- **@logiteria/commerce-sdk** — API client + React hooks

## Limitations

- **HTTP only** — Next.js rewrites proxy HTTP requests. WebSocket/SSE (live cart sync, order tracking) require direct connection to the store URL.
- **Client-side auth** — Auth state is managed client-side via the SDK. For server-side auth, use `createServerClient()` from `@logiteria/commerce-sdk/next`.

## License

MIT
