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
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onClick={onProductSelect}
                />
            ))}
        </div>
    );
}
