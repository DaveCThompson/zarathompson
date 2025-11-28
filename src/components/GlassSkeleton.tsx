import styles from './GlassSkeleton.module.css';

interface GlassSkeletonProps {
    className?: string;
    style?: React.CSSProperties;
}

export function GlassSkeleton({ className = '', style }: GlassSkeletonProps) {
    return (
        <div
            className={`${styles.skeleton} ${className}`}
            style={style}
            aria-hidden="true"
        />
    );
}
