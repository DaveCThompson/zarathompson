// FILE: src/features/shop/ScarcityCounter.tsx
import { useAtomValue } from 'jotai';
import { scarcityAtom } from '../../data/atoms';
import { Badge } from '../../components/Badge';

interface ScarcityCounterProps {
    productId: string;
    compact?: boolean;
}

export function ScarcityCounter({ productId, compact = false }: ScarcityCounterProps) {
    const stockMap = useAtomValue(scarcityAtom);
    const stock = stockMap[productId];

    // If stock is undefined or high (>5), we hide the counter to avoid clutter.
    // We only want to highlight scarcity when it drives urgency.
    if (stock === undefined || stock > 5) return null;

    if (compact) {
        return <Badge variant="sale">Only {stock} left!</Badge>;
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className="no-select">
                <Badge variant="sale">Low Stock</Badge>
            </div>
            <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--color-scarcity)'
            }}>
                Only <strong>{stock}</strong> remaining
            </span>
        </div>
    );
}