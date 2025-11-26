// FILE: src/data/atoms.ts
import { atomWithStorage } from 'jotai/utils';
import { PRODUCTS } from './products';

// --- THEME ENGINE ---
// Persist dark mode preference. Defaults to false (Light Mode).
export const darkModeAtom = atomWithStorage<boolean>('zara_dark_mode', false);

// --- SCARCITY ENGINE ---
type StockMap = Record<string, number>;

const generateInitialStock = (): StockMap => {
    const stock: StockMap = {};
    const today = new Date().toDateString();

    // Simple hash function for deterministic randomness based on date and product ID
    const hash = (str: string) => {
        let h = 0;
        for (let i = 0; i < str.length; i++) {
            h = Math.imul(31, h) + str.charCodeAt(i) | 0;
        }
        return h;
    };

    PRODUCTS.forEach((p) => {
        const seed = hash(today + p.id);
        // 40% chance of being low stock (1-5), otherwise high stock (10+)
        const isLowStock = (Math.abs(seed) % 100) < 40;

        if (isLowStock) {
            stock[p.id] = (Math.abs(seed) % 5) + 1;
        } else {
            stock[p.id] = 10 + (Math.abs(seed) % 20);
        }
    });
    return stock;
};

export const scarcityAtom = atomWithStorage<StockMap>(
    'zara_stock_v1',
    generateInitialStock()
);