import { useEffect, useRef } from 'react';
import { useSetAtom } from 'jotai';
import { themeAtom } from '../../store/atoms';

export function DynamicBackground() {
    const setHue = useSetAtom(themeAtom);
    const requestRef = useRef<number>(0);
    const hueRef = useRef<number>(0);

    const animate = () => {
        // Increment hue
        hueRef.current = (hueRef.current + 0.1) % 360;

        // Update global CSS variable directly for performance
        document.documentElement.style.setProperty('--dynamic-hue', hueRef.current.toFixed(1));

        // Sync with Jotai atom (throttled if needed, but here we just set it)
        // Note: Updating React state 60fps might be too much if many components subscribe.
        // Ideally, components should read the CSS variable or we throttle this.
        // For now, we'll update it every frame but components should be optimized.
        // Actually, let's NOT update the atom every frame to avoid re-renders.
        // The atom is mostly for "initial" state or if we need the value in JS logic (like Scarcity color calculation).
        // Let's update the atom every 60 frames (approx 1 sec) just to keep it somewhat fresh without killing perf.

        // For the "Liquid Glass" aesthetic, everything is CSS variable based, so we don't strictly need the atom to update 60fps.

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
