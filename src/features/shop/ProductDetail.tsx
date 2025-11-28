// FILE: src/features/shop/ProductDetail.tsx
import { useState, useEffect } from 'react';
import type { Product } from '@/data/products';
import { Drawer } from '@/components/Drawer';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { Checkbox } from '@/components/Checkbox';
import { GlassSkeleton } from '@/components/GlassSkeleton';
import { Clock, Spinner } from '@phosphor-icons/react';
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
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    // Reset state when product changes
    useEffect(() => {
        if (product) {
            setSelectedVariantId(null);
            setAgreedToTerms(false);
            setIsRedirecting(false);
            setIsImageLoaded(false);
        }
    }, [product]);

    if (!product) return null;

    const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];
    const scarcity = getScarcityForProduct(product.id);
    const displayImage = getAssetUrl(product.image);
    const isDigital = selectedVariant.isDigital;

    const handleBuy = () => {
        setIsRedirecting(true);
        setTimeout(() => {
            window.open(selectedVariant.stripeLink, '_blank');
            setIsRedirecting(false);
        }, 800); 
    };

    const content = (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                {/* Skeleton Overlay - Visible until image loads */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: isImageLoaded ? 0 : 1,
                        transition: 'opacity 0.4s ease',
                        pointerEvents: 'none',
                        zIndex: 1
                    }}
                >
                    <GlassSkeleton />
                </div>

                {/* Eagerly Loaded Image */}
                <img
                    src={displayImage}
                    alt={product.title}
                    className={`${styles.image} ${isImageLoaded ? styles.loaded : ''}`}
                    loading="eager" 
                    fetchPriority="high"
                    decoding="async"
                    onLoad={() => setIsImageLoaded(true)}
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
                    disabled={(!isDigital && !agreedToTerms) || isRedirecting}
                    onClick={handleBuy}
                >
                    {isRedirecting ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Spinner className="animate-spin" /> Redirecting...
                        </span>
                    ) : (
                        'Buy Now'
                    )}
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