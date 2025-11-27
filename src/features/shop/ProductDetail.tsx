// FILE: src/features/shop/ProductDetail.tsx
import { useState, useEffect } from 'react';
import type { Product } from '@/data/products';
import { Drawer } from '@/components/Drawer';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { Checkbox } from '@/components/Checkbox';
import { Clock } from '@phosphor-icons/react';
import { useMediaQuery } from '@/data/useMediaQuery';
import { getScarcityForProduct } from '@/data/scarcity';
import { getAssetUrl } from '@/data/assets';
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

    // Image Loading State Machine
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Reset state when product changes
    useEffect(() => {
        if (product) {
            setSelectedVariantId(null);
            setAgreedToTerms(false);
            setIsLoaded(false);
            setHasError(false);
        }
    }, [product]);

    if (!product) return null;

    const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];
    const scarcity = getScarcityForProduct(product.id);

    // Asset Resolution
    const thumbnailImage = getAssetUrl(product.image);
    // If we have an error, fallback to thumbnail. Otherwise try full image.
    const displayImage = hasError ? thumbnailImage : getAssetUrl(product.variants[0]?.id === 'digital' ? product.image : (product.imageFull || product.image));

    // Logic: Is this a digital product?
    const isDigital = selectedVariant.isDigital;

    const content = (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                {/* 
                    Low-res blurred thumbnail 
                    Only visible while loading AND no error occurred (if error, we show unblurred thumbnail)
                */}
                {!hasError && (
                    <img
                        src={thumbnailImage}
                        alt=""
                        className={`${styles.image} ${styles.imageBlur}`}
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                    />
                )}

                {/* High-res image that fades in */}
                <img
                    src={displayImage}
                    alt={product.title}
                    className={`${styles.image} ${styles.imageFull} ${isLoaded || hasError ? styles.imageLoaded : ''}`}
                    onLoad={() => setIsLoaded(true)}
                    onError={() => {
                        console.warn(`Failed to load high-res image for ${product.id}`);
                        setHasError(true);
                    }}
                    loading="lazy"
                    decoding="async"
                />
            </div>
            <div className={styles.details}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{product.title}</h2>
                </div>

                <p className={styles.description}>{product.description}</p>

                {scarcity && (
                    <div className={styles.scarcity}>
                        <Clock weight="duotone" className={styles.scarcityIcon} />
                        <span className={styles.scarcityText}>ONLY {scarcity} LEFT!</span>
                    </div>
                )}

                <div className={styles.variants}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <label className={styles.label}>Select Option:</label>
                        <Badge variant="default">${selectedVariant.price.toFixed(2)}</Badge>
                    </div>
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

                {isDigital ? (
                    <div className={styles.terms}>
                        <span className={styles.termsLabel}>
                            ✨ Digital files will be emailed immediately after purchase.
                        </span>
                    </div>
                ) : (
                    <div className={styles.terms}>
                        <Checkbox
                            id="terms"
                            checked={agreedToTerms}
                            onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                        />
                        <label htmlFor="terms" className={styles.termsLabel}>
                            I understand that prints must be picked up at Royal Oak Middle School.
                        </label>
                    </div>
                )}

                <Button
                    className={styles.buyButton}
                    disabled={!isDigital && !agreedToTerms}
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