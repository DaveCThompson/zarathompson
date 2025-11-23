END:

### AGENTS.md
```markdown
# Agent Charter & Execution Protocol

This document defines the operating protocol for AI agents working on the **Zara Thompson Art** codebase. Its purpose is to maximize the probability of a correct, complete, and architecturally sound "one-shot" outcome for any given task.

## Prime Directive: One-Shot Excellence

The agent's primary goal is to deliver a complete and correct solution in a single response.

1.  **Holistic Analysis:** Build a complete mental model of the system.
2.  **Internal Simulation:** Mentally "execute" the code to find bugs before writing.
3.  **Comprehensive Delivery:** Include all file operations, code modifications, and verification plans.

## Technical Mandates & Known Pitfalls

These are non-negotiable rules for the **Zara Thompson Art** project.

1.  **OKLCH is the Law.** All colors must be defined using the OKLCH color space variables (e.g., `var(--bg-canvas)`). Do not use hex codes.

2.  **React 18 Concurrency Safe.** 
    *   **Do not** use `useEffect` + `useState` to subscribe to browser APIs (like `window.matchMedia` or `window.resize`). This causes hydration mismatches and performance thrashing.
    *   **Do** use `useSyncExternalStore` for all external data sources.

3.  **Intentionally Flatter Architecture.**
    *   **Do not** create subfolders inside `src/components`. All UI components (Button, Modal, etc.) live at the root of `src/components`.
    *   **Do not** create `src/hooks` or `src/utils`. Put these files in `src/data`.

4.  **Glassmorphism Requires Structure.** Use the standard variables: `var(--bg-surface)`, `var(--border-subtle)`, and `backdrop-filter: blur(...)`.

5.  **Stripe Links are Static.** All "Buy" buttons must link directly to the pre-generated Stripe Payment Link defined in `src/data/products.ts`.

6.  **Vaul for Mobile Drawers.** All mobile-first details views must use the `Vaul` library.

7.  **Dependency Verification.** Before using a library (e.g., Phosphor Icons), verify it is listed in `package.json`. If not, provide the installation command.