// FILE: src/features/shop/ProductCard.tsx
import type { Product } from '@/data/products';
import { ScarcityCounter } from './ScarcityCounter';
import { getAssetUrl } from '@/data/assets'; // UPDATED IMPORT
import styles from './ProductCard.module.css';
import { ArrowRight } from '@phosphor-icons/react';

interface ProductCardProps {
    product: Product;
    onClick: (product: Product) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
    return (
        <button
            type="button"
            className={styles.card}
            onClick={() => onClick(product)}
            aria-label={`View details for ${product.title}`}
        >
            <div className={styles.imageContainer}>
                {/* Wrap the image source with getAssetUrl */}
                <img
                    src={getAssetUrl(product.image)}
                    alt=""
                    className={styles.image}
                    loading="lazy"
                    decoding="async"
                />
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