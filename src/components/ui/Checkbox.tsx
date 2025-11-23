import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from '@phosphor-icons/react';
import styles from './Checkbox.module.css';

interface CheckboxProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    id?: string;
    label?: string;
    className?: string;
}

export function Checkbox({ checked, onCheckedChange, id, label, className }: CheckboxProps) {
    return (
        <div className={`${styles.container} ${className || ''}`}>
            <CheckboxPrimitive.Root
                className={styles.root}
                checked={checked}
                onCheckedChange={onCheckedChange}
                id={id}
            >
                <CheckboxPrimitive.Indicator className={styles.indicator}>
                    <Check size={16} weight="duotone" />
                </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
            {label && (
                <label className={styles.label} htmlFor={id}>
                    {label}
                </label>
            )}
        </div>
    );
}
