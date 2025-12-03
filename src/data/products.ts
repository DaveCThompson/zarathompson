// FILE: src/data/products.ts

export type ProductVariantID = 'digital' | 'print-5x7' | 'print-10x8' | 'print-21x33';

export interface ProductVariant {
    id: ProductVariantID;
    label: string;
    price: number;
    isDigital: boolean;
    stripeLink: string;
}

export interface Product {
    id: string;
    title: string;
    description: string;
    image: string;      // 400w Standard
    basePrice: number;
    variants: ProductVariant[];
}

// ------------------------------------------------------------------
// 1. CONFIGURATION: MASTER STRIPE LINKS
// ------------------------------------------------------------------
const STRIPE_LINKS = {
    // I have restored the full IDs (ending in eME02, eME03, etc.)
    DIGITAL:     'https://donate.stripe.com/dRm14mbD6fZE5oG3tyeME02',
    PRINT_5x7:   'https://donate.stripe.com/3cI4gy5eIfZEeZg5BGeME03',
    PRINT_10x8:  'https://donate.stripe.com/00w14mePidRwcR84xCeME01',
    PRINT_21x33: 'https://donate.stripe.com/eVqcN48qU5l04kCe8ceME04',
};

// ------------------------------------------------------------------
// 2. HELPER: URL GENERATOR
// Appends a unique ID to the generic link so you know WHAT was bought.
// Example: .../donate...?client_reference_id=basketball_print-5x7
// ------------------------------------------------------------------
const getLink = (baseUrl: string, productId: string, variantId: ProductVariantID) => {
    return `${baseUrl}?client_reference_id=${productId}_${variantId}`;
};

// ------------------------------------------------------------------
// 3. PRODUCT CATALOGUE
// ------------------------------------------------------------------
export const PRODUCTS: Product[] = [
    {
        id: 'basketball',
        title: 'The Court King',
        description: 'Dominating the court with eagle-eyed precision. A high-energy tribute to the game.',
        image: '/art/400w_basketball.webp',
        basePrice: 3.00,
        variants: [
            { id: 'digital', label: 'Digital Download', price: 3.00, isDigital: true, stripeLink: getLink(STRIPE_LINKS.DIGITAL, 'basketball', 'digital') },
            { id: 'print-5x7', label: '5x7 Print', price: 4.00, isDigital: false, stripeLink: getLink(STRIPE_LINKS.PRINT_5x7, 'basketball', 'print-5x7') },
            { id: 'print-10x8', label: '10x8 Print', price: 5.00, isDigital: false, stripeLink: getLink(STRIPE_LINKS.PRINT_10x8, 'basketball', 'print-10x8') },
            { id: 'print-21x33', label: '21x33 Print', price: 40.00, isDigital: false, stripeLink: getLink(STRIPE_LINKS.PRINT_21x33, 'basketball', 'print-21x33') },
        ],
    },
    {
        id: 'pop-singer',
        title: 'Pop Star',
        description: 'Explosive energy and stardom. A vibrant tribute to pop culture.',
        image: '/art/400w_pop_singer.webp',
        basePrice: 3.00,
        variants: [
            { id: 'digital', label: 'Digital Download', price: 3.00, isDigital: true, stripeLink: getLink(STRIPE_LINKS.DIGITAL, 'pop-singer', 'digital') },
            { id: 'print-5x7', label: '5x7 Print', price: 4.00, isDigital: false, stripeLink: getLink(STRIPE_LINKS.PRINT_5x7, 'pop-singer', 'print-5x7') },
            { id: 'print-10x8', label: '10x8 Print', price: 5.00, isDigital: false, stripeLink: getLink(STRIPE_LINKS.PRINT_10x8, 'pop-singer', 'print-10x8') },
            { id: 'print-21x33', label: '21x33 Print', price: 40.00, isDigital: false, stripeLink: getLink(STRIPE_LINKS.PRINT_21x33, 'pop-singer', 'print-21x33') },
        ],
    },
    {
        id: 'pug-blue',
        title: 'I Need A Hug (Blue)',
        description: 'A soulful gaze that tugs at the heartstrings. Set against a calming blue backdrop.',
        image: '/art/400w_pug_blue.webp',
        basePrice: 3.00,
        variants: [
            { id: 'digital', label: 'Digital Download', price: 3.00, isDigital: true, stripeLink: getLink(STRIPE_LINKS.DIGITAL, 'pug-blue', 'digital') },
            { id: 'print-5x7', label: '5x7 Print', price: 4.00, isDigital: false, stripeLink: getLink(STRIPE_LINKS.PRINT_5x7, 'pug-blue', 'print-5x7') },
            { id: 'print-10x8', label: '10x8 Print', price: 5.00, isDigital: false, stripeLink: getLink(STRIPE_LINKS.PRINT_10x8, 'pug-blue', 'print-10x8') },
            { id: 'print-21x33', label: '21x33 Print', price: 40.00, isDigital: false, stripeLink: getLink(STRIPE_LINKS.PRINT_21x33, 'pug-blue', 'print-21x33') },
        ],
    },
    {
        id: 'pug-pink',
        title: 'I Need A Hug (Pink)',
        description: 'Irresistible charm in a warm embrace. A cozy pink setting for a lovable friend.',
        image: '/art/400w_pug_pink.webp',
        basePrice: 3.00,
        variants: [
            { id: 'digital', label: 'Digital Download', price: 3.00, isDigital: true, stripeLink: getLink(STRIPE_LINKS.DIGITAL, 'pug-pink', 'digital') },
            { id: 'print-5x7', label: '5x7 Print', price: 4.00, isDigital: false, stripeLink: getLink(STRIPE_LINKS.PRINT_5x7, 'pug-pink', 'print-5x7') },
            { id: 'print-10x8', label: '10x8 Print', price: 5.00, isDigital: false, stripeLink: getLink(STRIPE_LINKS.PRINT_10x8, 'pug-pink', 'print-10x8') },
            { id: 'print-21x33', label: '21x33 Print', price: 40.00, isDigital: false, stripeLink: getLink(STRIPE_LINKS.PRINT_21x33, 'pug-pink', 'print-21x33') },
        ],
    },
    {
        id: 'soccer',
        title: 'The Royal Striker',
        description: 'Regal and commanding on the pitch. A powerful composition of athleticism and grace.',
        image: '/art/400w_soccer.webp',
        basePrice: 3.00,
        variants: [
            { id: 'digital', label: 'Digital Download', price: 3.00, isDigital: true, stripeLink: getLink(STRIPE_LINKS.DIGITAL, 'soccer', 'digital') },
            { id: 'print-5x7', label: '5x7 Print', price: 4.00, isDigital: false, stripeLink: getLink(STRIPE_LINKS.PRINT_5x7, 'soccer', 'print-5x7') },
            { id: 'print-10x8', label: '10x8 Print', price: 5.00, isDigital: false, stripeLink: getLink(STRIPE_LINKS.PRINT_10x8, 'soccer', 'print-10x8') },
            { id: 'print-21x33', label: '21x33 Print', price: 40.00, isDigital: false, stripeLink: getLink(STRIPE_LINKS.PRINT_21x33, 'soccer', 'print-21x33') },
        ],
    },
    {
        id: 'volleyball',
        title: 'The Soaring Spike',
        description: 'Gravity-defying action at the net. Capturing the peak moment of the game.',
        image: '/art/400w_volleyball.webp',
        basePrice: 3.00,
        variants: [
            { id: 'digital', label: 'Digital Download', price: 3.00, isDigital: true, stripeLink: getLink(STRIPE_LINKS.DIGITAL, 'volleyball', 'digital') },
            { id: 'print-5x7', label: '5x7 Print', price: 4.00, isDigital: false, stripeLink: getLink(STRIPE_LINKS.PRINT_5x7, 'volleyball', 'print-5x7') },
            { id: 'print-10x8', label: '10x8 Print', price: 5.00, isDigital: false, stripeLink: getLink(STRIPE_LINKS.PRINT_10x8, 'volleyball', 'print-10x8') },
            { id: 'print-21x33', label: '21x33 Print', price: 40.00, isDigital: false, stripeLink: getLink(STRIPE_LINKS.PRINT_21x33, 'volleyball', 'print-21x33') },
        ],
    },
];