Here is the fully updated **Product Requirements Document (PRD)** & **Architecture Specification**. This document serves as the single source of truth for the development phase.

---

# PRD: Zarathompson.com

### 1. Overview
**Zarathompson.com** is a high-craft, single-page e-commerce portfolio for a student artist. The site allows users to purchase physical posters (for local pickup) or digital downloads. It features a playful, "Liquid Glass" aesthetic using animated OKLCH color manipulation and fluid Framer Motion transitions. The architecture is serverless, relying on GitHub Pages for hosting and Stripe Payment Links for transaction logic.

### 2. Problem & Goals
**Problem:** Zara needs a platform to sell her art to fund her education and support a local charity. The solution must minimize administrative overhead (no shipping logistics) while maximizing sales through engagement and high-quality presentation.

**Goals:**
*   **High Polish:** Achieve a premium feel using smooth animations and dynamic color ranges.
*   **Conversion:** Utilize "Tasteful Scarcity" (Option A: subtle badges, persistent stock counters) to encourage purchases.
*   **Simplicity:** Zero-backend architecture.
*   **Charity:** Transparently communicate the value proposition: **50% to Children's Hospital, 50% to Zara's Education Fund.**

### 3. Scope & Key Initiatives
**In Scope:**
*   **Landing Page:** Hero section with dynamic OKLCH background, value props, and product grid.
*   **Product Interaction:** "Buy Now" flow via Stripe Payment Links.
*   **Product Details:**
    *   **Mobile:** "Vaul" Drawer (drags up from bottom).
    *   **Desktop:** Centered Modal or Expanded Card.
*   **Scarcity Engine:** Client-side logic (Jotai + LocalStorage) to persist "fake" stock levels per user session.
*   **Fulfillment Logic:**
    *   Physical items: Mandatory checkbox for "Pickup at Royal Oak Middle School".
    *   Digital items: Instant access (via Stripe success message).
*   **Custom Orders:** A $15 "One of a Kind" product that directs users to email Zara after purchase.

**Out of Scope:**
*   **Shopping Cart:** Users purchase one item configuration at a time.
*   **Shipping Calculation:** No shipping modules. Local pickup only.
*   **User Accounts:** No login/signup.

### 4. UX/UI Specification

**Visual Language: "Liquid Glass"**
*   **Background:** A CSS Variable `var(--dynamic-hue)` rotates from 0-360 over time. The background color is a very light, high-lightness version of this hue.
*   **Foreground:** Components use "Glassmorphism" (white with opacity + backdrop blur) to sit on top of the shifting colors.
*   **Typography:**
    *   **Headings:** `Pacifico` (Playful, handwritten feel).
    *   **UI/Body:** `Geist` (Clean, legible, modern sans-serif).

#### **A. Wireframes & Layout**

**1. The Product Grid (Home)**
*   **Interaction:** Hovering a card lifts it slightly (`y: -8px`) and intensifies the shadow color based on the current `var(--dynamic-hue)`.
*   **Badge:** If stock < 3, show a "Low Stock" badge using `var(--color-sale)`.

**2. The Product Detail (Drawer/Modal)**
*   **Content:**
    *   Large Image Preview.
    *   Title (Pacifico).
    *   **Format Selection (Radio Group):**
        *   Digital Download ($2.00)
        *   5x7 Print ($3.00)
        *   10x8 Print ($6.00)
        *   21x33 Print ($35.00)
    *   **Guardrails:**
        *   If a Physical Print is selected: Show Checkbox `[ ] I agree to pick up at Royal Oak MS`.
        *   If Digital is selected: Hide Checkbox.
    *   **CTA:** "Buy with Stripe" (Disabled until checkbox is checked for physical items).

#### **B. Semantic Tokens (CSS Modules)**
We will use standard CSS variables injected into the `:root` and manipulated by React state.

```css
:root {
  /* Dynamic Engine */
  --dynamic-hue: 0; /* Animated by JS */

  /* Palette */
  --bg-canvas: oklch(98% 0.01 var(--dynamic-hue));
  --surface-glass: oklch(100% 0 0 / 0.6);
  --fg-primary: oklch(20% 0.02 var(--dynamic-hue));
  --fg-accent: oklch(60% 0.22 var(--dynamic-hue));
  --color-sale: oklch(63% 0.22 25); /* Fixed Red/Orange */

  /* Fonts */
  --font-brand: 'Pacifico', cursive;
  --font-body: 'Geist', sans-serif;
}
```

### 5. Architecture & Implementation Plan

#### **Tech Stack**
*   **Core:** React 18, Vite, TypeScript.
*   **Styling:** CSS Modules (for structure) + Inline Styles (for dynamic variables). `clsx` for class merging.
*   **Animation:** Framer Motion (layout transitions).
*   **State:** Jotai (Atomic state management).
*   **UI Primitives:** Radix UI (Tooltip, Toast, Checkbox), Vaul (Drawer).
*   **Icons:** Google Material Symbols (via webfont).

#### **Data Model (`src/data/products.ts`)**
We map every combination to a specific Stripe Payment Link.

```typescript
export interface ProductVariant {
  id: string;
  label: string; // e.g., "5x7 Print"
  price: number;
  isDigital: boolean;
  stripeLink: string; // The pre-generated Stripe Payment Link
}

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string; // Path to asset
  basePrice: number; // Display price ("From $2.00")
  variants: ProductVariant[];
}
```

#### **State Management (Jotai Atoms)**
1.  **`themeAtom`**: Holds the current Hue value (number).
2.  **`scarcityAtom`** (`atomWithStorage`):
    *   Key: `zara_stock_v1`
    *   Value: `Record<string, number>` (ProductId -> Remaining Stock).
    *   Logic: On init, if key doesn't exist, generate random int (1-5) for each product.
3.  **`cartAtom`**: *Not used (Direct Buy flow).*

### 6. File Manifest & Structure

**Directory: `src/`**
*   `main.tsx` `[REFERENCE]`
*   `App.tsx` `[MODIFIED]` (Contains the Layout and Background animator)
*   `index.css` `[MODIFIED]` (Global variables, resets, font imports)

**Directory: `src/data/`**
*   `products.ts` `[NEW]` (Product data & Stripe links)
*   `config.ts` `[NEW]` (Site constants)

**Directory: `src/styles/`**
*   `typography.module.css` `[NEW]` (Shared text styles)
*   `layout.module.css` `[NEW]` (Shared containers)

**Directory: `src/components/ui/`** (Dumb components)
*   `Button.tsx` / `Button.module.css` `[NEW]`
*   `Icon.tsx` `[NEW]` (Material Symbol wrapper)
*   `Badge.tsx` / `Badge.module.css` `[NEW]` (For "Low Stock")
*   `Checkbox.tsx` `[NEW]` (Radix wrapper)
*   `Drawer.tsx` `[NEW]` (Vaul wrapper)

**Directory: `src/features/shop/`** (Smart components)
*   `ProductGrid.tsx` / `ProductGrid.module.css` `[NEW]`
*   `ProductCard.tsx` / `ProductCard.module.css` `[NEW]`
*   `ProductDetail.tsx` / `ProductDetail.module.css` `[NEW]` (The complex logic for selecting size/link)
*   `ScarcityCounter.tsx` `[NEW]` (Logic for "X left")

**Directory: `src/features/layout/`**
*   `Header.tsx` `[NEW]`
*   `Footer.tsx` `[NEW]`
*   `DynamicBackground.tsx` `[NEW]`

**Directory: `src/store/`**
*   `atoms.ts` `[NEW]`

### 7. Risks & Mitigations

| Risk | Impact | Mitigation |
| :--- | :--- | :--- |
| **CSS Specificity Issues** | Styles breaking across components. | Strict use of CSS Modules. No global CSS classes except for utility resets. |
| **Stripe Link Maintenance** | Changing prices breaks links. | Centralize links in `products.ts`. Use descriptive names in Stripe Dashboard. |
| **Mobile Safari Address Bar** | "Bottom Drawer" is hidden by UI. | Use `Vaul` which handles iOS viewport height issues natively. |
| **Asset Loading** | Large images slow down "High Craft" feel. | Use `.webp` format for posters. Implement a blur-up placeholder strategy. |

### 8. Definition of Done
1.  **Visuals:** Background cycles smoothly in OKLCH. Pacifico font loads correctly.
2.  **Navigation:** User can view all 4 posters + Custom option.
3.  **Purchase Flow:**
    *   Select Poster -> Select 5x7 -> Check Pickup Box -> Click Buy -> Redirects to Stripe ($3.00).
    *   Select Poster -> Select Digital -> Click Buy -> Redirects to Stripe ($2.00).
4.  **Scarcity:** Refreshing the page preserves the "Stock Remaining" number.
5.  **Responsiveness:** Drawer works flawlessly on Mobile; Modal works on Desktop.
6.  **Deployment:** Live on GitHub Pages.