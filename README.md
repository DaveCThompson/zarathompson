# Zara Thompson Art

**Zarathompson.com** is a high-craft, single-page e-commerce portfolio for a student artist. It features a playful, "Liquid Glass" aesthetic using animated OKLCH color manipulation and fluid Framer Motion transitions.

The site allows users to purchase physical posters (for local pickup) or digital downloads, with proceeds split between Zara's education fund and a local charity.

---

## 1. Core Architecture

### Tech Stack
-   **Framework:** React 18 + Vite + TypeScript
-   **Styling:** CSS Modules (Structure) + Inline Styles (Dynamic Variables)
-   **State:** Jotai (Atomic State)
-   **Animation:** Framer Motion
-   **UI Primitives:** Radix UI + Vaul (Drawer)
-   **Payments:** Stripe Payment Links (No backend)

### Key Features
-   **Dynamic OKLCH Engine:** The entire site's color palette rotates through a hue cycle (`0-360`) over time. All UI elements derive their color from this single source of truth.
-   **Scarcity Engine:** A client-side simulation (persisted via LocalStorage) that tracks "fake" stock levels to encourage conversion.
-   **Intentionally Flatter:** The project structure is kept shallow to maximize readability and maintainability.

---

## 2. Directory Structure

This project follows a feature-based, flat architecture.

-   **/src/data**: The single source of truth for data and global state.
    -   `products.ts`: Product definitions and Stripe links.
    -   `atoms.ts`: Global Jotai atoms (Hue, Scarcity).
-   **/src/features**: Smart, domain-specific components.
    -   `shop/`: Product grid, cards, details, and scarcity logic.
    -   `theme/`: Background animation logic.
-   **/src/components/ui**: Dumb, reusable UI primitives (Button, Badge, Drawer).
-   **/src/styles**: Shared CSS modules and design tokens.

---

## 3. Development Protocols

### Styling
We use **CSS Modules** for component-scoped styles and **Native CSS Variables** for the theming engine.
-   **Do not use Tailwind.**
-   **Do not use SASS.**
-   **Do use `clsx`** for conditional class names.

### State Management
We use **Jotai** for all global state.
-   **`themeAtom`**: Controls the global hue.
-   **`scarcityAtom`**: Persists stock levels.

### Mobile First
The "Product Details" view is implemented as a **Drawer (Vaul)** on mobile and a **Modal** on desktop. This ensures a native-like feel on iOS devices.

---

## 4. Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```