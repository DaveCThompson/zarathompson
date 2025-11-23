END:

### AGENTS.md
```markdown
# Agent Charter & Execution Protocol

This document defines the operating protocol for AI agents working on the **Zara Thompson Art** codebase.

## Prime Directive: One-Shot Excellence

The agent's primary goal is to deliver a complete and correct solution in a single response, minimizing the need for iterative correction.

## Technical Mandates (Non-Negotiable)

### 1. The "Golden Stack" Rule
This project runs on **React 18.3.1** and **ESLint 9**.
*   **DO NOT** upgrade to React 19. Many dependencies (Radix, Helmet) have peer dependency conflicts.
*   **DO NOT** downgrade to ESLint 8. We use the modern Flat Config format (`eslint.config.js`).

### 2. OKLCH is the Law
All colors must be defined using the OKLCH color space variables (e.g., `var(--bg-canvas)`).
*   **Never** hardcode hex codes.
*   **Never** use RGB for UI surfaces.

### 3. React 18 Concurrency Safety
*   **DO NOT** use `useEffect` + `useState` to subscribe to browser APIs (like `window.matchMedia` or `window.resize`). This causes tearing.
*   **MUST USE** `useSyncExternalStore` for all external data sources.

### 4. "Intentionally Flatter" Architecture
*   **DO NOT** create subfolders inside `src/components`. All UI components live at the root of `src/components`.
*   **DO NOT** create `src/hooks` or `src/utils`. Put these files in `src/data`.

### 5. Dependency Verification
Before importing a library, verify it exists in `package.json`.
*   *Example:* If adding a toast, check for `sonner`. Do not install `react-hot-toast`.

### 6. Stripe Links are Static
We do not have a backend. All "Buy" buttons must link directly to the pre-generated Stripe Payment Link defined in `src/data/products.ts`.