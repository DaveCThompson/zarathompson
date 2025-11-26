import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import styles from './Tooltip.module.css';
import type { ReactNode } from 'react';

interface TooltipProps {
    children: ReactNode;
    content: ReactNode;
}

export function Tooltip({ children, content }: TooltipProps) {
    return (
        <TooltipPrimitive.Provider>
            <TooltipPrimitive.Root delayDuration={200}>
                <TooltipPrimitive.Trigger asChild>
                    {children}
                </TooltipPrimitive.Trigger>
                <TooltipPrimitive.Portal>
                    <TooltipPrimitive.Content className={styles.content} sideOffset={5}>
                        {content}
                        <TooltipPrimitive.Arrow className={styles.arrow} />
                    </TooltipPrimitive.Content>
                </TooltipPrimitive.Portal>
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    );
}
