import * as Dialog from '@radix-ui/react-dialog';
import { X } from '@phosphor-icons/react';
import styles from './Modal.module.css';

interface ModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
    trigger?: React.ReactNode;
}

export function Modal({ open, onOpenChange, children, trigger }: ModalProps) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
            <Dialog.Portal>
                <Dialog.Overlay className={styles.overlay} />
                <Dialog.Content className={styles.content}>
                    <div className={styles.body}>
                        {children}
                    </div>
                    <Dialog.Close asChild>
                        <button className={styles.closeButton} aria-label="Close">
                            <X weight="duotone" />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
