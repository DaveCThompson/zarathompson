// FILE: src/features/shop/ProductCard.tsx
import { useState } from 'react';
import type { Product } from '@/data/products';
import { ScarcityCounter } from './ScarcityCounter';
import { getAssetUrl } from '@/data/assets';
import styles from './ProductCard.module.css';
import { ArrowRight } from '@phosphor-icons/react';
import { useAtomValue } from 'jotai';
import { scarcityAtom } from '@/data/atoms';
import { GlassSkeleton } from '@/components/GlassSkeleton';
import { Badge } from '@/components/Badge';

interface ProductCardProps {
    product: Product;
    onClick: (product: Product) => void;
    priority?: boolean;
}

export function ProductCard({ product, onClick, priority = false }: ProductCardProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const stockMap = useAtomValue(scarcityAtom);
    const stock = stockMap[product.id];

    // Low stock threshold matches atoms.ts logic (1-5)
    const isLowStock = stock !== undefined && stock <= 5;

    // Deterministic badge text based on product ID
    const badgeText = product.id.charCodeAt(0) % 2 === 0 ? 'HOT' : 'SELLING FAST';

    return (
        <button
            type="button"
            className={styles.card}
            onClick={() => onClick(product)}
            aria-label={`View details for ${product.title}`}
        >
            <div className={styles.imageContainer}>
                {/* Skeleton Overlay - Fades out when loaded */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: isLoaded ? 0 : 1,
                        transition: 'opacity 0.5s ease',
                        pointerEvents: 'none',
                        zIndex: 1
                    }}
                >
                    <GlassSkeleton />
                </div>

                <img
                    src={getAssetUrl(product.image)}
                    alt=""
                    className={`${styles.image} ${!isLoaded ? styles.imageLoading : ''}`}
                    loading={priority ? "eager" : "lazy"}
                    decoding={priority ? "auto" : "async"}
                    fetchPriority={priority ? "high" : "auto"}
                    onLoad={() => setIsLoaded(true)}
                />

                {isLowStock && (
                    <div className={styles.badgeOverlay} style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        zIndex: 20
                    }}>
                        <Badge variant="sale">{badgeText}</Badge>
                    </div>
                )}

                <div className={`${styles.badgeContainer} no-select`}>
                    <ScarcityCounter productId={product.id} compact />
                </div>
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{product.title}</h3>
                <div className={styles.footer}>
                    <span className={styles.price}>From ${product.basePrice.toFixed(2)}</span>
                    <div className={styles.action}>
                        <span className={`${styles.actionText} no-select`}>View</span>
                        <ArrowRight size={20} weight="duotone" />
                    </div>
                </div>
            </div>
        </button>
    );
}