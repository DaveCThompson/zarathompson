// FILE: src/data/atoms.ts
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { PRODUCTS } from './products';

// --- THEME ENGINE ---
// Persist dark mode preference. Defaults to false (Light Mode).
export const darkModeAtom = atomWithStorage<boolean>('zara_dark_mode', false);

// The dynamic hue value (0-360) is now handled by CSS animations, 
// but we keep this if we need JS access to it later.
export const themeAtom = atom<number>(0);

// --- SCARCITY ENGINE ---
type StockMap = Record<string, number>;

const generateInitialStock = (): StockMap => {
    const stock: StockMap = {};
    PRODUCTS.forEach((p) => {
        stock[p.id] = Math.floor(Math.random() * 5) + 1;
    });
    return stock;
};

export const scarcityAtom = atomWithStorage<StockMap>(
    'zara_stock_v1',
    generateInitialStock()
);