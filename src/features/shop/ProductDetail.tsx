// FILE: src/features/shop/ProductDetail.tsx
import { useState } from 'react';
import type { Product } from '@/data/products';
import { Drawer } from '@/components/Drawer';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { Checkbox } from '@/components/Checkbox';
import { Clock } from '@phosphor-icons/react';
import { useMediaQuery } from '@/data/useMediaQuery';
import { getScarcityForProduct } from '@/data/scarcity';
import styles from './ProductDetail.module.css';

interface ProductDetailProps {
    product: Product | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ProductDetail({ product, open, onOpenChange }: ProductDetailProps) {
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    if (!product) return null;

    const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];
    const scarcity = getScarcityForProduct(product.id);
    
    // Use high-res image if available, fallback to thumb
    const displayImage = product.imageFull || product.image;

    const content = (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <img src={displayImage} alt={product.title} className={styles.image} />
            </div>
            <div className={styles.details}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{product.title}</h2>
                    <Badge variant="default">${selectedVariant.price.toFixed(2)}</Badge>
                </div>

                <p className={styles.description}>{product.description}</p>

                {scarcity && (
                    <div className={styles.scarcity}>
                        <Clock weight="duotone" className={styles.scarcityIcon} />
                        <span className={styles.scarcityText}>ONLY {scarcity} LEFT!</span>
                    </div>
                )}

                <div className={styles.variants}>
                    <label className={styles.label}>Select Option:</label>
                    <div className={styles.variantGrid}>
                        {product.variants.map(variant => (
                            <button
                                key={variant.id}
                                className={`${styles.variantButton} ${selectedVariant.id === variant.id ? styles.selected : ''}`}
                                onClick={() => setSelectedVariantId(variant.id)}
                            >
                                {variant.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.terms}>
                    <Checkbox
                        id="terms"
                        checked={agreedToTerms}
                        onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                    />
                    <label htmlFor="terms" className={styles.termsLabel}>
                        I agree that this is a digital purchase or print-on-demand item.
                    </label>
                </div>

                <Button
                    className={styles.buyButton}
                    disabled={!agreedToTerms}
                    onClick={() => window.open(selectedVariant.stripeLink, '_blank')}
                >
                    Buy Now
                </Button>
            </div>
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