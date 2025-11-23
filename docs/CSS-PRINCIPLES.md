# High-Craft CSS Principles

This document codifies the core principles and patterns for writing CSS in the **Zara Thompson Art** project.

---

### Core Principles

#### 1. Master the Box Model
Before using `position: absolute`, define the positioning context (parent) and explicit dimensions. Never assume an element will "just know" its size.

#### 2. Diagnose, Don't Guess
Use the browser inspector to find the computed styles. Isolate the failing element before writing new CSS.

#### 3. Trust, but Verify the Final DOM
React components and libraries like Radix often inject wrapper divs. Style against the rendered DOM, not the JSX.

---

### Key Architectural Patterns

#### The OKLCH Color Engine

All colors are derived from a single hue variable `var(--dynamic-hue)`.

**Core Palette:**
*   `--bg-canvas`: Main background. Cycles hue, keeps lightness high.
*   `--fg-primary`: Main text color. Dark, readable, tinted with hue.
*   `--fg-accent`: Bright accent color for calls to action.

**Derived Surface Variables (Critical for Glassmorphism):**
*   `--bg-surface`: The glass background color `oklch(100% 0 0 / 0.6)`.
*   `--bg-subtle`: A slightly opaque white for secondary backgrounds.
*   `--border-subtle`: The semi-transparent border `oklch(100% 0 0 / 0.4)`.
*   `--bg-hover`: Hover state background `oklch(100% 0 0 / 0.1)`.

**The Rule:** Never hardcode a hex color. Always use these variables to ensure the "Liquid Glass" effect works on top of the changing background.

#### Typography: Brand vs. Body

*   **Brand (`--font-brand`):** `Pacifico`. Use for Headings and Logo.
*   **Body (`--font-body`):** `Geist`. Use for UI text, prices, and buttons.

**Rule:** Buttons never use Pacifico.