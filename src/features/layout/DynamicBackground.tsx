// FILE: src/features/layout/DynamicBackground.tsx
import { useEffect, useRef } from 'react';

/**
 * PERFORMANCE CRITICAL:
 * This component drives the global color cycle.
 * 
 * It bypasses React state entirely and writes directly to the DOM 
 * via CSS variables using requestAnimationFrame.
 * 
 * Why? Triggering a React re-render 60 times a second for the root 
 * color variable would force the entire application to reconcile, 
 * causing massive performance degradation on mobile.
 */
export function DynamicBackground() {
    const requestRef = useRef<number>(0);
    const hueRef = useRef<number>(0);

    useEffect(() => {
        const animate = () => {
            // Increment hue (Speed: 0.1 per frame)
            hueRef.current = (hueRef.current + 0.1) % 360;

            // Direct DOM manipulation for 60fps performance
            document.documentElement.style.setProperty('--dynamic-hue', hueRef.current.toFixed(1));

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

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