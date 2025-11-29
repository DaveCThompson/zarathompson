// FILE: src/components/Avatar.tsx
import { type MouseEvent, useRef } from 'react';
import confetti from 'canvas-confetti';
import { getAssetUrl } from '@/data/assets';
import styles from './Avatar.module.css';

export function Avatar() {
    const lastConfettiTime = useRef(0);

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        const now = Date.now();
        if (now - lastConfettiTime.current < 500) return; // Throttle
        lastConfettiTime.current = now;

        // Get click position relative to viewport for confetti origin
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
            particleCount: 25,
            spread: 70,
            origin: { x, y },
            colors: ['#FFD700', '#FF69B4', '#00BFFF', '#50C878'], // Vibrant colors
            disableForReducedMotion: true,
            zIndex: 1000,
        });
    };

    return (
        <div className={styles.wrapper}>
            <div
                className={styles.container}
                onClick={handleClick}
                role="button"
                aria-label="Interactive Avatar of Zara Thompson"
            >
                <img
                    src={getAssetUrl('/assets/zara-avatar.webp')}
                    alt="Zara Thompson"
                    className={styles.image}
                    draggable={false}
                />
            </div>
        </div>
    );
}
