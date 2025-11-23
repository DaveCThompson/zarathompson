# Agent Charter & Execution Protocol

This document defines the operating protocol for AI agents working on the **Zara Thompson Art** codebase. Its purpose is to maximize the probability of a correct, complete, and architecturally sound "one-shot" outcome for any given task.

## Prime Directive: One-Shot Excellence

The agent's primary goal is to deliver a complete and correct solution in a single response, minimizing the need for iterative correction. This is achieved by adhering to three pillars:

1.  **Holistic Analysis:** Before writing code, the agent must ingest and synthesize **all** provided context: the user's request, the PRD, the project `README.md`, `CSS-PRINCIPLES.md`, and all relevant existing code files. The agent must build a complete mental model of the system's current state and the desired future state.
2.  **Internal Simulation:** The agent must mentally "execute" the proposed changes and simulate their impact. This involves walking through the code paths, anticipating cascading effects (e.g., how changing a component's structure will affect its CSS), and pre-emptively identifying potential bugs, race conditions, or architectural violations.
3.  **Comprehensive Delivery:** A "one-shot" response is not just code. It is a complete solution package, including all necessary file operations, code modifications, documentation updates, and a strategic verification plan.

## Standard Execution Algorithm (Internal)

For any non-trivial task (e.g., implementing a PRD feature), the agent must follow this internal thought process *before* generating the final output:

1.  **Ingestion & Synthesis:**
    *   Read and fully comprehend the entire user request and all context files.
    *   Identify the core problem statement and the key success criteria ("Definition of Done").
    *   Cross-reference the request with the architectural principles in `README.md`.

2.  **Impact Analysis & Dependency Mapping:**
    *   Create a definitive list of all files that will be **Created, Read, Updated, or Deleted (CRUD)**.
    *   Map the dependencies. For example: "Updating the `ProductDetail` component will require changes in `scarcityAtom` and `products.ts`." This prevents leaving dependent files in a broken state.

3.  **Virtual Refactoring (The Mental Walkthrough):**
    *   Simulate the changes in the most critical files first.
    *   **Example Simulation:** *"I will add a new product variant. I need to ensure the Stripe Link is valid and the `isDigital` flag is correctly set so the UI hides the pickup checkbox."*
    *   **Example Simulation:** *"I am modifying the global hue animation. I must ensure that `requestAnimationFrame` or the `useEffect` cleanup is handled correctly to prevent memory leaks."*
    *   This is the most critical step. The agent must act as its own QA engineer, actively trying to "break" its own plan.

4.  **Code Generation & Self-Correction:**
    *   Generate the full code for all modified files.
    *   Perform a final pass over the generated code, checking it against the **Technical Mandates** listed below. This is a fast, final check for common, known errors.

## Technical Mandates & Known Pitfalls

These are non-negotiable rules for the **Zara Thompson Art** project. Violating them will result in rework.

1.  **OKLCH is the Law.** All colors must be defined using the OKLCH color space variables (e.g., `var(--bg-canvas)`, `var(--fg-primary)`). Do not use hex codes or RGB values directly in components unless absolutely necessary for a specific, isolated reason. The "Liquid Glass" aesthetic depends on the dynamic hue engine.

2.  **Glassmorphism Requires Structure.** When creating a glass panel, you must use the standard variables: `background: var(--surface-glass)`, `border: 1px solid var(--surface-glass-border)`, and `backdrop-filter: blur(...)`. Do not invent new glass styles.

3.  **Vaul for Mobile Drawers.** All mobile-first details views (like Product Details) must use the `Vaul` library. Do not build custom bottom sheets. Ensure the drawer handles iOS viewport height issues correctly.

4.  **Stripe Links are Static.** We do not have a backend checkout. All "Buy" buttons must link directly to the pre-generated Stripe Payment Link defined in `src/data/products.ts`. Ensure the correct link is selected based on the user's variant choice.

5.  **Jotai for Global State.** Use Jotai atoms for all global state (Hue, Scarcity, etc.). Do not use React Context unless it is for a strictly scoped subtree (like a compound component).

6.  **"Intentionally Flatter" Architecture.** Do not over-engineer the folder structure. Feature code goes in `src/features/feature-name`. Shared UI goes in `src/components/ui`. Data definitions go in `src/data`. Do not create deep nested directories like `src/features/shop/components/atoms/buttons`. Keep it flat and readable.

7.  **Material Symbols Configuration.** When using `Material Symbols`, always ensure the `font-variation-settings` are correctly applied if you are overriding the defaults. Remember that `font-variation-settings` is atomic—setting one axis resets the others.

8.  **Accessibility First.** All interactive elements must have proper `aria-labels` and focus states. The "High Craft" feel includes accessibility.