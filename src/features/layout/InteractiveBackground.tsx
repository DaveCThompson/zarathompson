// FILE: src/features/layout/InteractiveBackground.tsx
import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useTime } from 'framer-motion';

export function InteractiveBackground() {
    // 1. Mouse/Touch Input
    const inputX = useMotionValue(0.5);
    const inputY = useMotionValue(0.5);

    // 2. Time for Ambient Animation (Replaces CSS Keyframes to stop flickering)
    const time = useTime();

    // 3. Physics Config
    const springConfig = { stiffness: 40, damping: 20, mass: 1.5 };
    const smoothX = useSpring(inputX, springConfig);
    const smoothY = useSpring(inputY, springConfig);

    // 4. Transforms
    // We combine the Mouse Spring + Time Sine Wave for ultra-smooth composite motion
    
    // Blob 1: Cyan (Deep Layer)
    const x1 = useTransform(smoothX, [0, 1], [150, -150]);
    const y1 = useTransform(smoothY, [0, 1], [100, -100]);
    // Ambient drift calculation:
    const rotate1 = useTransform(time, t => Math.sin(t / 5000) * 20);
    const scale1 = useTransform(time, t => 1 + Math.sin(t / 4000) * 0.1);

    // Blob 2: Pink (Middle Layer)
    const x2 = useTransform(smoothX, [0, 1], [-100, 100]);
    const y2 = useTransform(smoothY, [0, 1], [-150, 150]);
    const driftX2 = useTransform(time, t => Math.sin(t / 6000) * 50);
    const scale2 = useTransform(time, t => 1.1 + Math.cos(t / 4000) * 0.15);

    // Blob 3: Violet (Near Layer)
    const x3 = useTransform(smoothX, [0, 1], [50, -50]);
    const y3 = useTransform(smoothY, [0, 1], [50, -50]);
    const rotate3 = useTransform(time, t => Math.sin(t / 7000) * -15);
    const scale3 = useTransform(time, t => 0.9 + Math.sin(t / 3000) * 0.1);

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            inputX.set(e.clientX / window.innerWidth);
            inputY.set(e.clientY / window.innerHeight);
        };

        const handleTouch = (e: TouchEvent) => {
            if (e.touches[0]) {
                inputX.set(e.touches[0].clientX / window.innerWidth);
                inputY.set(e.touches[0].clientY / window.innerHeight);
            }
        };

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', handleTouch);
        
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchmove', handleTouch);
        };
    }, [inputX, inputY]);

    const blobContainer = {
        position: 'fixed' as const,
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none' as const,
        zIndex: -1,
    };

    const blobCommon = {
        borderRadius: '50%',
        filter: 'blur(80px)', 
        opacity: 0.6,
        position: 'absolute' as const,
        // Crucial: Use the class for GPU hacks
    };

    return (
        <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: -1, pointerEvents: 'none' }}>
            
            {/* BLOB 1 */}
            <motion.div style={{ ...blobContainer, x: x1, y: y1 }}>
                <motion.div
                    className="blob-layer"
                    style={{
                        ...blobCommon,
                        top: '-10%',
                        left: '-10%',
                        width: '60vw',
                        height: '60vw',
                        background: 'var(--orb-1)',
                        rotate: rotate1,
                        scale: scale1
                    }}
                />
            </motion.div>
            
            {/* BLOB 2 */}
            <motion.div style={{ ...blobContainer, x: x2, y: y2 }}>
                <motion.div
                    className="blob-layer"
                    style={{
                        ...blobCommon,
                        bottom: '-10%',
                        right: '-10%',
                        width: '70vw',
                        height: '70vw',
                        background: 'var(--orb-2)',
                        x: driftX2, // Add ambient drift to position
                        scale: scale2
                    }}
                />
            </motion.div>

            {/* BLOB 3 */}
            <motion.div style={{ ...blobContainer, x: x3, y: y3 }}>
                <motion.div
                    className="blob-layer"
                    style={{
                        ...blobCommon,
                        top: '40%',
                        left: '40%',
                        width: '50vw',
                        height: '50vw',
                        background: 'var(--orb-3)',
                        rotate: rotate3,
                        scale: scale3
                    }}
                />
            </motion.div>
        </div>
    );
}