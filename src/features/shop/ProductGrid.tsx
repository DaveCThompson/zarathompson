// FILE: src/features/shop/ProductGrid.tsx
import type { Product } from '../../data/products';
import { ProductCard } from './ProductCard';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
    products: Product[];
    onProductSelect: (product: Product) => void;
}

export function ProductGrid({ products, onProductSelect }: ProductGridProps) {
    return (
        <div className={styles.grid}>
            {products.map((product, index) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onClick={onProductSelect}
                    priority={index < 4}
                />
            ))}
        </div>
    );
}