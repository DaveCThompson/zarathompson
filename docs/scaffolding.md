### Part 1: Styling Architecture Evaluation

Since you don't typically use Tailwind or SASS, choosing the right approach is critical for a "High Craft" site where you need precise control over animations and layout without fighting a framework.

Here is the evaluation of the top 3 options for this specific project:

#### Option A: Tailwind CSS
*   **Pros:** extremely fast development once learned; consistent spacing/typography tokens.
*   **Cons:** Steep learning curve if you don't know it. Integrating dynamic CSS variables (like our animated OKLCH values) into Tailwind requires complex configuration. The HTML becomes very cluttered.
*   **Verdict:** **Avoid.** For a high-craft, custom art site, Tailwind often fights against custom, fluid CSS needs.

#### Option B: SASS / SCSS
*   **Pros:** Nesting (`.card { &:hover { ... } }`) is great. Mixins help with reusable snippets.
*   **Cons:** Requires a compilation step (handled by Vite, but still). Most of SASS's best features (variables, calculations) are now native in modern CSS.
*   **Verdict:** **Unnecessary.** Native CSS has caught up.

#### Option C: CSS Modules (Recommended)
*   **Pros:**
    *   **Scoped by default:** A class named `.container` in `Footer.module.css` will never conflict with `.container` in `Hero.module.css`.
    *   **Standard Syntax:** It is just regular CSS. No new syntax to learn.
    *   **Performance:** Vite compiles this into highly optimized, tiny CSS files.
    *   **Dynamic Friendly:** Works perfectly with React inline styles for the dynamic OKLCH values.
*   **Cons:** You have to type `styles.className` instead of just `class="name"`.
*   **Verdict:** **Winner.** This is the cleanest way to build high-fidelity React apps without a framework overhead.

---

### Part 2: The Scaffolding Plan

We will use **CSS Modules** combined with **Native CSS Variables** for the theming.

#### 1. Initialization
Run these commands in your terminal to generate the project shell.

```bash
# 1. Create Vite Project
npm create vite@latest zarathompson-art -- --template react-ts

# 2. Enter Directory
cd zarathompson-art

# 3. Install Core Dependencies
# framer-motion: for layout animations
# jotai: state management
# clsx: utility for conditionally joining classNames (essential for CSS modules)
npm install framer-motion jotai clsx jotai-location

# 4. Install UI Dependencies
# vaul: the mobile drawer
# @radix-ui/react-*: accessible primitives
npm install vaul @radix-ui/react-tooltip @radix-ui/react-toast @radix-ui/react-checkbox @radix-ui/react-dialog

# 5. Install Dev Dependencies (Prettier/Linting)
npm install -D prettier eslint-config-prettier
```

#### 2. Folder Structure Creation
We will implement the "Intentionally Flatter" structure defined in the PRD.

*Run this (or create manually):*

```bash
# Create source subfolders
mkdir -p src/data
mkdir -p src/styles
mkdir -p src/components/ui
mkdir -p src/features/shop
mkdir -p src/features/theme
mkdir -p src/store

# Remove default Vite boilerplate
rm src/App.css
```

#### 3. Global CSS Setup (The OKLCH Engine)

Since we aren't using Tailwind, we need a robust `index.css` to handle our resets and variables.

**File:** `src/index.css`

```css
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Pacifico&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

:root {
  /* --- DYNAMIC ENGINE --- */
  /* This is updated by JS/Jotai */
  --dynamic-hue: 0; 

  /* --- PALETTE (OKLCH) --- */
  /* L = Lightness, C = Chroma (Intensity), H = Hue */
  
  /* Canvas: High lightness, low chroma, dynamic hue */
  --bg-canvas: oklch(98% 0.01 var(--dynamic-hue));
  
  /* Glass: Pure white with opacity */
  --surface-glass: oklch(100% 0 0 / 0.6);
  --surface-glass-border: oklch(100% 0 0 / 0.4);
  
  /* Text */
  --fg-primary: oklch(20% 0.02 var(--dynamic-hue));
  --fg-secondary: oklch(55% 0.05 var(--dynamic-hue));
  --fg-accent: oklch(60% 0.22 var(--dynamic-hue)); /* Vibrant */

  /* Status */
  --color-sale: oklch(63% 0.22 25); /* Fixed Red/Orange */
  --color-white: oklch(100% 0 0);

  /* --- TYPOGRAPHY --- */
  --font-brand: 'Pacifico', cursive;
  --font-body: 'Geist', sans-serif;

  /* --- SPACING --- */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;

  /* --- LAYOUT --- */
  --radius-md: 12px;
  --radius-lg: 24px;
  --header-height: 80px;
}

/* Reset & Base */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-body);
  background-color: var(--bg-canvas);
  color: var(--fg-primary);
  /* Smooth transition for background color changes */
  transition: background-color 0.5s ease; 
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

button {
  font-family: inherit;
  border: none;
  background: none;
  cursor: pointer;
}

/* Utility for Material Symbols */
.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 24
}
```

#### 4. Verification Component
Let's create a quick test component to verify the stack is working before we build the features.

**File:** `src/App.tsx`

```tsx
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { atom } from 'jotai';

// Temporary atom for testing
const hueAtom = atom(0);

function App() {
  const [hue, setHue] = useAtom(hueAtom);

  // Simple animation loop to test OKLCH
  useEffect(() => {
    const interval = setInterval(() => {
      setHue((h) => (h + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [setHue]);

  return (
    <div 
      style={{ 
        // This injects the dynamic value into the CSS variable
        '--dynamic-hue': hue 
      } as React.CSSProperties}
      className="min-h-screen flex flex-col items-center justify-center gap-4"
    >
      <h1 style={{ fontFamily: 'var(--font-brand)', fontSize: '3rem' }}>
        Zara Thompson Art
      </h1>
      
      <div style={{ 
        padding: '2rem', 
        background: 'var(--surface-glass)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--surface-glass-border)',
        backdropFilter: 'blur(10px)'
      }}>
        <p>Testing High Craft UI</p>
        <p style={{ color: 'var(--fg-accent)', fontWeight: 'bold' }}>
          Hue: {hue}
        </p>
      </div>
    </div>
  );
}

export default App;
```

### Next Step
Once you run `npm run dev` and confirm you see a rotating background color and the Pacifico font, we are ready to start **Task 3: Building the Data Layer and Store**.

Shall I proceed to the Data Layer?