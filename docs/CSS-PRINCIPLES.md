# High-Craft CSS Principles

This document codifies the core principles and patterns for writing CSS in the **Zara Thompson Art** project. Adhering to these guidelines is essential for maintaining the "Liquid Glass" aesthetic and ensuring a high-performance, fluid user experience.

---

### Core Principles

#### 1. Master the Box Model, Especially Positioning

The CSS Box Model is not optional knowledge. Before using `position: absolute` or `position: fixed`, you must be able to answer:

-   **What is its "positioned ancestor"?** If none exists, it will be the viewport.
-   **How will it get its width and height?** Have I provided explicit dimensions (`width`, `height`) or constraints (`top`, `right`, `bottom`, `left`)?
-   Never assume an element will "just know" its size. You must declare it.

#### 2. Diagnose, Don't Guess

When debugging a UI issue, follow this simple diagnostic process to find the root cause instead of guessing at solutions:

1.  **Isolate:** Use the browser inspector to find the exact element that is failing.
2.  **Inspect:** Analyze its "Computed" styles. Don't just look at the CSS you wrote; look at what the browser *actually rendered*. A `width: 0px` or unexpected `margin` is the key clue.
3.  **Hypothesize:** Form a hypothesis based on CSS fundamentals. "My hypothesis is the element has no width because it's absolutely positioned without horizontal constraints."
4.  **Test:** Use the browser's style editor to test your hypothesis in real-time (e.g., add `left: 0; right: 0;`). If it works, you've found the solution.

#### 3. Trust, but Verify the Final DOM

React components, UI libraries (Radix), and animation libraries (Framer Motion) can all add wrapper `divs` or change the final DOM structure. Your React code is not the final source of truth—the browser's "Elements" panel is. Always debug the final rendered HTML, not the JSX you assume is being rendered.

---

### Key Architectural Patterns

#### The OKLCH Color Engine

This project uses a dynamic color engine based on the **OKLCH** color space. This allows us to rotate the hue of the entire site programmatically while maintaining consistent perceptual lightness and chroma.

**1. The Dynamic Hue**
The core of the engine is the `--dynamic-hue` variable, which is updated by JavaScript (Jotai + `requestAnimationFrame`) in the root of the application.

```css
:root {
  --dynamic-hue: 0; /* 0 to 360 */
}
```

**2. The Palette**
All colors are derived from this single hue variable. This guarantees that the "Glass" UI always sits harmoniously on top of the background, no matter what color the background is currently cycling through.

```css
/* Example Palette */
--bg-canvas: oklch(98% 0.01 var(--dynamic-hue));
--fg-primary: oklch(20% 0.02 var(--dynamic-hue));
--fg-accent: oklch(60% 0.22 var(--dynamic-hue));
```

**The Rule:** Never hardcode a hex color for a UI element that should feel part of the theme. Use the semantic variables (`--fg-primary`, `--fg-accent`, etc.).

#### Glassmorphism & Depth

The "Liquid Glass" aesthetic relies on a specific combination of properties to create depth and texture.

**1. The Surface**
Glass surfaces are white with high transparency and a backdrop blur. This creates the "frosted" look that allows the animated background to bleed through.

```css
.glass-panel {
  background: var(--surface-glass); /* oklch(100% 0 0 / 0.6) */
  backdrop-filter: blur(10px);
  border: 1px solid var(--surface-glass-border);
}
```

**2. The Shadow**
Shadows should be subtle and colored with the current hue to blend naturally.

#### The Material Symbols Variable Font System

This project relies on a robust system to control the appearance of Material Symbols icons.

**1. The Foundation (Font Loading)**
The system depends on loading the **variable font** version of the icons.
```html
<link rel="stylesheet" href="...family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@...">
```

**2. The Golden Rule**
The `font-variation-settings` property is **atomic**—it completely overwrites any previous value. To prevent bugs where axes are accidentally reset, **every rule that sets this property must define all four axes (`FILL`, `wght`, `GRAD`, `opsz`).**

```css
/* CORRECT */
.icon:hover {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* INCORRECT (Destructive) */
.icon:hover {
  font-variation-settings: 'FILL' 1; /* Resets wght, GRAD, opsz to defaults! */
}
```

#### Typography: Brand vs. Body

We use two distinct typefaces to separate "Brand/Vibe" from "Content/Utility".

-   **Brand (`--font-brand`):** `Pacifico`. Use this for Headings (`h1`, `h2`) and the Logo. It conveys the playful, artistic personality.
-   **Body (`--font-body`):** `Geist`. Use this for all UI text, descriptions, prices, and buttons. It ensures maximum legibility and a modern, clean feel.

**Rule:** Do not mix them. Buttons should never use Pacifico. Headings should rarely use Geist unless they are purely functional (like a "Details" label).