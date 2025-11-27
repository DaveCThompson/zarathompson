// FILE: src/features/layout/DynamicBackground.tsx

/**
 * PERFORMANCE CRITICAL:
 * This component drives the global color cycle.
 * 
 * It previously used requestAnimationFrame, but now relies on CSS keyframes
 * to prevent main-thread blocking and style recalculations.
 */
export function DynamicBackground() {
    // No-op: Animation is now handled via CSS keyframes in index.css
    // to prevent main-thread blocking and style recalculations.

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: -1,
                background: 'var(--bg-canvas)',
                transition: 'background-color 0.5s ease'
            }}
        />
    );
}