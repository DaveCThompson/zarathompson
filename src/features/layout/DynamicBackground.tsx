import { useEffect, useRef } from 'react';

export function DynamicBackground() {
    const requestRef = useRef<number>(0);
    const hueRef = useRef<number>(0);

    const animate = () => {
        // Increment hue
        hueRef.current = (hueRef.current + 0.1) % 360;

        // Update global CSS variable directly for performance
        document.documentElement.style.setProperty('--dynamic-hue', hueRef.current.toFixed(1));

        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
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