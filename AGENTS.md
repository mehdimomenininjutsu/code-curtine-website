# LUMIÈRE FABRICS — Luxury Curtain Fabric E-Commerce

## Overview
A premium, dark-gold-aurora luxury curtain fabric e-commerce landing page in Persian (Farsi) with RTL layout. Built with Vite + React + React Router. No backend — forms save to localStorage with documented integration points.

## Tech Stack
- **Framework:** Vite 5.4 + React 18 + React Router 6
- **Styling:** Single CSS file (`src/index.css`) with CSS custom properties (design tokens)
- **Fonts:** Vazirmatn (Persian body), Cormorant Garamond (display), Inter (UI) — loaded from Google Fonts
- **Images:** Unsplash (free for commercial use)
- **State:** React Context for cart and wishlist, persisted to localStorage

## Project Structure
```
src/
  main.jsx              — Entry point
  App.jsx               — Router + providers (Cart, Wishlist)
  index.css             — Complete design system (dark-gold-aurora tokens)
  data/                 — Centralized editable data (products, categories, collections, FAQ, brand, images)
  context/              — CartContext, WishlistContext (localStorage persistence)
  hooks/                — useScrollReveal (IntersectionObserver)
  components/           — All UI components (header, hero, products, collections, forms, etc.)
  pages/                — HomePage, ShopPage, ProductDetailPage
```

## Running the App
```bash
docker compose -f docker-compose.base44.yml up -d
```
- Web entry on port 3000
- `npm install` runs automatically on container start
- Vite dev server with HMR

## Sandbox Configuration
- `BASE44_PREVIEW_MODE=1` gates Vite `allowedHosts` to accept the preview proxy's Host header (`.${BASE44_SANDBOX_HOST_DOMAIN}`)
- Without the flag, Vite uses default host validation (no extra hosts allowed)
- `BASE44_SANDBOX_HOST_DOMAIN` is passed to the container via compose environment

## Key Design Decisions
- **RTL:** `dir="rtl"` on `<html>`, CSS logical properties throughout
- **Aurora:** CSS radial gradients with blur, slow keyframe animations, respects `prefers-reduced-motion`
- **Gold gradient:** Used selectively on CTAs, logo, borders, price highlights — not everywhere
- **No backend:** Forms (sample request, trade inquiry, newsletter) save to localStorage with notes about integration points
- **Checkout:** Labeled as setup-required (no payment provider configured)
- **No fabricated data:** No fake reviews, ratings, stock levels, or sale prices

## Customization
- Brand name/tagline: `src/data/brand.js`
- Products: `src/data/products.js`
- Categories: `src/data/categories.js`
- Collections: `src/data/collections.js`
- FAQ: `src/data/faq.js`
- Images: `src/data/images.js`
- Navigation: `src/data/navigation.js`
- Design tokens: `:root` in `src/index.css`
