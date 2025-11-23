# High-Craft CSS Principles

This document codifies the core principles and patterns for writing CSS in the **Zara Thompson Art** project.

---

### Core Principles

#### 1. Master the Box Model
Before using `position: absolute`, define the positioning context (parent) and explicit dimensions. Never assume an element will "just know" its size.

#### 2. Diagnose, Don't Guess
Use the browser inspector to find the computed styles. Isolate the failing element before writing new CSS.

---

### Key Architectural Patterns

#### The OKLCH Color Engine

All colors are derived from a single hue variable `var(--dynamic-hue)`.

**Core Palette:**
*   `--bg-canvas`: Main background. Cycles hue, keeps lightness high.
*   `--fg-primary`: Main text color. Dark, readable, tinted with hue.
*   `--fg-accent`: Bright accent color for calls to action.

**Derived Surface Variables (Critical for Glassmorphism):**
*   `--bg-surface`: `oklch(100% 0 0 / 0.6)` - The main glass panel background.
*   `--bg-subtle`: `oklch(96% 0.01 H)` - For skeleton states and secondary areas.
*   `--border-subtle`: `oklch(100% 0 0 / 0.4)` - The glass edge.
*   `--bg-hover`: `oklch(100% 0 0 / 0.1)` - Interactive hover states.

**The Rule:** Always use these variables. Never hardcode colors.

#### The "Liquid Glass" Recipe

To create a glass panel, use this standard combination:

```css
.glass-panel {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px); /* Safari support */
}