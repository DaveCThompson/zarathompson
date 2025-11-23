import { useAtomValue } from 'jotai';
import { scarcityAtom } from '../../data/atoms';
import { Badge } from '../../components/ui/Badge';

interface ScarcityCounterProps {
    productId: string;
    compact?: boolean;
}

export function ScarcityCounter({ productId, compact = false }: ScarcityCounterProps) {
    const stockMap = useAtomValue(scarcityAtom);
    const stock = stockMap[productId];

    // If stock is undefined or high, don't show anything (or show high stock logic if needed)
    // For this project, we always show "Low Stock" if < 5 to drive urgency.
    if (stock === undefined || stock > 5) return null;

    if (compact) {
        return <Badge variant="sale">Only {stock} left!</Badge>;
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Badge variant="sale">Low Stock</Badge>
            <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--fg-secondary)'
            }}>
                Only <strong>{stock}</strong> remaining
            </span>
        </div>
    );
}