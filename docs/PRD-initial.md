# PRD: Zarathompson.com

### 1. Overview
**Zarathompson.com** is a high-craft, single-page fundraising platform for a Grade 7 student artist. The site allows users to purchase physical posters (for local pickup) or digital downloads. It features a playful, "Liquid Glass" aesthetic using animated OKLCH color manipulation and fluid Framer Motion transitions. The architecture is serverless, relying on GitHub Pages for hosting and Stripe Payment Links for transaction logic.

### 2. Problem & Goals
**Problem:** Zara needs a platform to sell her art to fund her future education and support BC Children's Hospital. The solution must minimize administrative overhead (no shipping logistics) while maximizing sales through engagement and high-quality presentation.

**Goals:**
*   **High Polish:** Achieve a premium feel using smooth animations and dynamic color ranges.
*   **Authenticity:** Communicate a clear "Student Fundraiser" narrative, not a corporate portfolio.
*   **Conversion:** Utilize "Tasteful Scarcity" (badges, persistent stock counters) to encourage purchases.
*   **Charity:** Transparently communicate the value proposition: **100% of proceeds** go to good causes (Portion to Hospital, Remaining to Education).

### 3. Scope & Key Initiatives
**In Scope:**
*   **Landing Page:** Hero section with dynamic OKLCH background, personal bio, and product grid.
*   **Product Interaction:** "Buy Now" flow via Stripe Payment Links.
*   **Product Details:**
    *   **Mobile:** "Vaul" Drawer (drags up from bottom).
    *   **Desktop:** Centered Modal or Expanded Card.
*   **Fulfillment Logic:**
    *   Physical items: Mandatory acknowledgment for "Pickup at Royal Oak Middle School".
    *   Digital items: Informational text "Digital files will be emailed."
*   **Custom Orders:** A "One of a Kind" product directing users to email Zara.

**Out of Scope:**
*   **Shopping Cart:** Users purchase one item configuration at a time.
*   **Shipping Calculation:** No shipping modules. Local pickup only.
*   **User Accounts:** No login/signup.

### 4. UX/UI Specification

**Visual Language: "Liquid Glass"**
*   **Background:** A CSS Variable `var(--dynamic-hue)` rotates from 0-360 over time.
*   **Foreground:** Components use "Glassmorphism" (white with opacity + backdrop blur).
*   **Typography:**
    *   **Headings:** `Pacifico` (Playful, handwritten feel).
    *   **UI/Body:** `Geist` (Clean, legible, modern sans-serif).
*   **Iconography:** Phosphor Icons.
    *   Actions: Light/Regular weight.
    *   Emphasis: Fill weight.
    *   Fun: `ArrowFatLinesRight`.

#### **A. Wireframes & Layout**

**1. The Product Grid (Home)**
*   **Interaction:** Hovering a card lifts it slightly and intensifies the shadow color.
*   **Badge:** If stock < 5, show a "Low Stock" badge.

**2. The Product Detail (Drawer/Modal)**
*   **Content:**
    *   Large Image Preview (with fallback for missing assets).
    *   Title (Pacifico).
    *   **Format Selection:** Buttons for Digital vs. Print sizes.
    *   **Guardrails:**
        *   Physical: Show "Pickup at Royal Oak MS" checkbox.
        *   Digital: Show "Email Delivery" text.
    *   **CTA:** "Buy with Stripe" (Disabled until terms agreed for physical).

#### **B. Semantic Tokens (CSS Modules)**
We will use standard CSS variables injected into the `:root` and manipulated by React state.

```css
:root {
  /* Dynamic Engine */
  --dynamic-hue: 0; /* Animated by JS */

  /* Palette */
  --bg-canvas: oklch(98% 0.01 var(--dynamic-hue));
  --surface-glass: oklch(100% 0 0 / 0.6);
  --surface-solid: oklch(100% 0 0); /* Opaque fallback */
  --fg-primary: oklch(20% 0.02 var(--dynamic-hue));
  --color-scarcity: oklch(60% 0.18 30); /* Fixed Red/Orange */
}
```

### 5. Architecture & Implementation Plan

#### **Tech Stack**
*   **Core:** React 18.3.1, Vite, TypeScript.
*   **Styling:** CSS Modules + Inline Styles. `clsx` for merging.
*   **State:** Jotai (Atomic state management).
*   **UI Primitives:** Radix UI (Tooltip, Toast, Checkbox), Vaul (Drawer).

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
```

#### **State Management (Jotai Atoms)**
1.  **`themeAtom`**: Holds the current Hue value (number).
2.  **`scarcityAtom`**: Persists "fake" stock levels per product in LocalStorage.

### 6. Risks & Mitigations

| Risk | Impact | Mitigation |
| :--- | :--- | :--- |
| **Missing Images** | Broken UI in modal. | Implement `onError` handler in `ProductDetail` to fallback to thumbnail. |
| **Transparency Artifacts** | Text hard to read in tooltips. | Use `--surface-solid` for overlay layers. |
| **Mobile Safari Address Bar** | "Bottom Drawer" is hidden. | Use `Vaul` which handles iOS viewport height natively. |