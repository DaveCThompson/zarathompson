// FILE: src/features/shop/ProductCard.tsx
import type { Product } from '@/data/products';
import { ScarcityCounter } from './ScarcityCounter';
import { getAssetUrl } from '@/data/assets';
import styles from './ProductCard.module.css';
import { ArrowRight } from '@phosphor-icons/react';
import { useAtomValue } from 'jotai';
import { scarcityAtom } from '@/data/atoms';

interface ProductCardProps {
    product: Product;
    onClick: (product: Product) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
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
                <img
                    src={getAssetUrl(product.image)}
                    alt=""
                    className={styles.image}
                    loading="lazy"
                    decoding="async"
                />

                {isLowStock && (
                    <div className={styles.badgeOverlay} style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'var(--color-scarcity)',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '12px', /* Concentric: 24px card radius - 12px margin */
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        zIndex: 20,
                        letterSpacing: '0.05em'
                    }}>
                        {badgeText}
                    </div>
                )}

                <div className={styles.badgeContainer}>
                    <ScarcityCounter productId={product.id} compact />
                </div>
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{product.title}</h3>
                <div className={styles.footer}>
                    <span className={styles.price}>From ${product.basePrice.toFixed(2)}</span>
                    <div className={styles.action}>
                        <span className={styles.actionText}>View</span>
                        <ArrowRight size={20} weight="duotone" />
                    </div>
                </div>
            </div>
        </button>
    );
}