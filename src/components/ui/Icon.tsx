import type { CSSProperties } from 'react';

interface IconProps {
    name: string;
    className?: string;
    fill?: boolean;
    weight?: number;
    grade?: number;
    size?: number;
    style?: CSSProperties;
}

export function Icon({
    name,
    className,
    fill = false,
    weight = 400,
    grade = 0,
    size = 24,
    style
}: IconProps) {
    return (
        <span
            className={`material-symbols-rounded ${className || ''}`}
            style={{
                fontSize: `${size}px`,
                fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${size}`,
                ...style
            }}
        >
            {name}
        </span>
    );
}
