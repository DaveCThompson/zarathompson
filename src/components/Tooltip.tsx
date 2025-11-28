// FILE: src/components/Tooltip.tsx
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { useState } from 'react';
import styles from './Tooltip.module.css';
import type { ReactNode } from 'react';

interface TooltipProps {
    children: ReactNode;
    content: ReactNode;
}

export function Tooltip({ children, content }: TooltipProps) {
    const [open, setOpen] = useState(false);

    return (
        <TooltipPrimitive.Provider>
            <TooltipPrimitive.Root 
                delayDuration={0} 
                open={open} 
                onOpenChange={setOpen}
            >
                <TooltipPrimitive.Trigger 
                    asChild 
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpen(true);
                    }}
                    onFocus={() => setOpen(true)}
                >
                    {children}
                </TooltipPrimitive.Trigger>
                <TooltipPrimitive.Portal>
                    <TooltipPrimitive.Content 
                        className={styles.content} 
                        sideOffset={5}
                        onPointerDownOutside={() => setOpen(false)}
                        onEscapeKeyDown={() => setOpen(false)}
                    >
                        {content}
                        <TooltipPrimitive.Arrow className={styles.arrow} />
                    </TooltipPrimitive.Content>
                </TooltipPrimitive.Portal>
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    );
}