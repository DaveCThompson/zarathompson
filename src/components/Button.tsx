// FILE: src/components/Button.tsx
import { type ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

/**
 * BASE BUTTON COMPONENT
 * Wraps native HTML button with design system styles.
 * Note: Uses type-only import for props to satisfy verbatimModuleSyntax.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={`${styles.button} ${styles[variant]} ${styles[size]} ${className || ''}`}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';