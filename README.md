# Zara Thompson | Art for Education

**Zarathompson.com** is a high-craft, single-page fundraising platform for a Grade 7 student artist. The site allows users to purchase physical posters (for local school pickup) or digital downloads to support **BC Children's Hospital** and the artist's education fund.

It features a playful, "Liquid Glass" aesthetic using animated OKLCH color manipulation and fluid Framer Motion transitions.

---

## 1. Core Architecture

### Tech Stack ("The Modern Standard")
*   **Framework:** React 18.3.1 (Stable) + Vite 5.4
*   **Language:** TypeScript 5.5
*   **Linting:** ESLint 9 (Flat Config)
*   **Styling:** CSS Modules + Native CSS Variables (OKLCH Engine)
*   **State:** Jotai (Atomic State)
*   **Animation:** Framer Motion
*   **Icons:** Phosphor Icons
*   **Deployment:** GitHub Pages

### Key Features
*   **Dynamic OKLCH Engine:** The entire site's color palette rotates through a hue cycle (`0-360`) at 60fps. All UI elements derive their color from this single source of truth.
*   **Charity Transparency:** Integrated tooltips and copy clarify the "100% of proceeds" allocation (Children's Health + Education).
*   **Scarcity Engine:** A client-side simulation (persisted via LocalStorage) that generates deterministic "low stock" alerts to drive conversion.
*   **Local Fulfillment Logic:** Smart UI that toggles between "School Pickup" acknowledgments (for prints) and "Email Delivery" notices (for digital).

---

## 2. Directory Structure

This project follows a feature-based, flat architecture ("Intentionally Flatter").

*   **/src/data**: The central hub for all logic, data, and hooks.
    *   `products.ts`: Product definitions and Stripe links.
    *   `atoms.ts`: Global Jotai atoms.
    *   `useMediaQuery.ts`: React 18 safe responsive logic.
*   **/src/features**: Smart, domain-specific components.
    *   `shop/`: Product grid, cards, details.
    *   `layout/`: Header, Footer, Background animation.
*   **/src/components**: Flat directory for dumb, reusable UI primitives (Button, Badge, Modal).
*   **/src/styles**: Shared CSS modules and design tokens.

---

## 3. Development Protocols

### Styling
We use **CSS Modules** for component-scoped styles and **Native CSS Variables** for the theming engine.
*   **Do not use Tailwind.**
*   **Do not use SASS.**
*   **Do use `clsx`** for conditional class names.

### State Management
We use **Jotai** for all global state.
*   **`themeAtom`**: Controls the global hue.
*   **`scarcityAtom`**: Persists stock levels.

### React 18 Concurrency
We strictly adhere to React 18 patterns.
*   Use `useSyncExternalStore` for browser APIs (resize, matchMedia).
*   Avoid `useEffect` for state updates to prevent hydration mismatches.

---

## 4. Deployment

This project is configured for **GitHub Pages**.

```bash
# Build and Deploy
npm run deploy