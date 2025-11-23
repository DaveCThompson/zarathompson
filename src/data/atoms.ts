import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { PRODUCTS } from './products';

// --- THEME ENGINE ---
// The dynamic hue value (0-360) that drives the OKLCH engine.
// This is updated via requestAnimationFrame in the DynamicBackground component.
export const themeAtom = atom<number>(0);

// --- SCARCITY ENGINE ---
// Persist stock levels to localStorage so they survive refreshes.
// Key: 'zara_stock_v1'
// Value: Record<string, number> (ProductId -> Stock)

type StockMap = Record<string, number>;

const generateInitialStock = (): StockMap => {
    const stock: StockMap = {};
    PRODUCTS.forEach((p) => {
        // Random stock between 1 and 5 for "Tasteful Scarcity"
        stock[p.id] = Math.floor(Math.random() * 5) + 1;
    });
    return stock;
};

export const scarcityAtom = atomWithStorage<StockMap>(
    'zara_stock_v1',
    generateInitialStock()
);