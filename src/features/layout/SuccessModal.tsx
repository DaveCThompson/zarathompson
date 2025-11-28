// FILE: src/features/layout/SuccessModal.tsx
import { Modal } from '@/components/Modal';
import { Drawer } from '@/components/Drawer';
import { Button } from '@/components/Button';
import { Heart, EnvelopeSimple } from '@phosphor-icons/react';
import { useMediaQuery } from '@/data/useMediaQuery';

interface SuccessModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SuccessModal({ open, onOpenChange }: SuccessModalProps) {
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const content = (
        <div style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ 
                display: 'inline-flex', 
                padding: '1rem', 
                borderRadius: '50%', 
                background: 'var(--glass-surface)',
                border: '1px solid var(--glass-border)',
                marginBottom: '1.5rem',
                color: 'var(--color-scarcity)'
            }}>
                <Heart size={48} weight="fill" />
            </div>
            
            <h2 style={{ 
                fontFamily: 'var(--font-brand)', 
                fontSize: '2.5rem', 
                marginBottom: '1rem',
                color: 'var(--fg-primary)'
            }}>
                Thank You!
            </h2>
            
            <p style={{ 
                fontFamily: 'var(--font-body)', 
                color: 'var(--fg-secondary)', 
                fontSize: '1.1rem',
                lineHeight: '1.6',
                marginBottom: '2rem'
            }}>
                Your support means the world to me. 100% of the proceeds will go towards my education fund and BC Children's Hospital.
            </p>

            <div style={{ 
                background: 'var(--glass-surface)', 
                padding: '1.5rem', 
                borderRadius: '16px',
                border: '1px solid var(--glass-border)',
                marginBottom: '2rem',
                textAlign: 'left'
            }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <EnvelopeSimple size={24} /> What happens next?
                </h3>
                <ul style={{ paddingLeft: '1.5rem', color: 'var(--fg-secondary)', lineHeight: '1.5' }}>
                    <li style={{ marginBottom: '0.5rem' }}><strong>Digital:</strong> Check your email for the download link.</li>
                    <li><strong>Prints:</strong> We will notify you when your print is ready for pickup at the school.</li>
                </ul>
            </div>

            <Button onClick={() => onOpenChange(false)} style={{ width: '100%' }}>
                Back to Art
            </Button>
        </div>
    );

    if (isDesktop) {
        return (
            <Modal open={open} onOpenChange={onOpenChange}>
                {content}
            </Modal>
        );
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            {content}
        </Drawer>
    );
}