import { useEffect, useRef } from 'react';

export function DynamicBackground() {
    const requestRef = useRef<number>(0);
    const hueRef = useRef<number>(0);

    useEffect(() => {
        // Defined inside useEffect to avoid dependency array issues
        const animate = () => {
            hueRef.current = (hueRef.current + 0.1) % 360;
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