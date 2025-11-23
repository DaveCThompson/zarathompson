// FILE: src/components/Drawer.tsx
import { Drawer as VaulDrawer } from 'vaul';
import styles from './Drawer.module.css';

interface DrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
    trigger?: React.ReactNode;
}

/**
 * MOBILE DRAWER
 * Uses 'vaul' library to emulate native iOS bottom sheet behavior.
 * This component is primarily used on mobile breakpoints.
 */
export function Drawer({ open, onOpenChange, children, trigger }: DrawerProps) {
    return (
        <VaulDrawer.Root open={open} onOpenChange={onOpenChange}>
            {trigger && <VaulDrawer.Trigger asChild>{trigger}</VaulDrawer.Trigger>}
            <VaulDrawer.Portal>
                <VaulDrawer.Overlay className={styles.overlay} />
                <VaulDrawer.Content className={styles.content}>
                    <div className={styles.handle} />
                    <div className={styles.body}>
                        {children}
                    </div>
                </VaulDrawer.Content>
            </VaulDrawer.Portal>
        </VaulDrawer.Root>
    );
}