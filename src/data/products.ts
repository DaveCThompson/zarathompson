// FILE: src/data/products.ts

export interface ProductVariant {
    id: string;
    label: string;
    price: number;
    isDigital: boolean;
    stripeLink: string;
}

export interface Product {
    id: string;
    title: string;
    description: string;
    image: string;      // Thumbnail for grid (fast load)
    imageFull?: string; // High-res for detail modal
    basePrice: number;
    variants: ProductVariant[];
}

const STRIPE_LINKS = {
    DIGITAL: 'https://buy.stripe.com/test_digital',
    PRINT_5x7: 'https://buy.stripe.com/test_5x7',
    PRINT_10x8: 'https://buy.stripe.com/test_10x8',
    PRINT_21x33: 'https://buy.stripe.com/test_21x33',
    CUSTOM: 'mailto:zara@example.com?subject=Custom%20Order%20Request',
};

export const PRODUCTS: Product[] = [
    {
        id: 'poster-5',
        title: 'I need a hug',
        description: 'A warm embrace in visual form. Soft textures and comforting hues.',
        // Updated to use local files from public/art/
        image: '/art/poster-5-thumb.webp',
        imageFull: '/art/poster-5-full.webp',
        basePrice: 2.00,
        variants: [
            { id: 'digital', label: 'Digital Download', price: 2.00, isDigital: true, stripeLink: STRIPE_LINKS.DIGITAL },
            { id: 'print-5x7', label: '5x7 Print', price: 3.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_5x7 },
            { id: 'print-10x8', label: '10x8 Print', price: 6.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_10x8 },
            { id: 'print-21x33', label: '21x33 Print', price: 35.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_21x33 },
        ],
    },
    {
        id: 'poster-6',
        title: 'Pop Star',
        description: 'Explosive energy and stardom. A vibrant tribute to pop culture.',
        image: '/art/poster-6-thumb.webp',
        imageFull: '/art/poster-6-full.webp',
        basePrice: 2.00,
        variants: [
            { id: 'digital', label: 'Digital Download', price: 2.00, isDigital: true, stripeLink: STRIPE_LINKS.DIGITAL },
            { id: 'print-5x7', label: '5x7 Print', price: 3.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_5x7 },
            { id: 'print-10x8', label: '10x8 Print', price: 6.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_10x8 },
            { id: 'print-21x33', label: '21x33 Print', price: 35.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_21x33 },
        ],
    },
    {
        id: 'poster-7',
        title: 'The Royal Striker',
        description: 'Regal and commanding. A powerful composition in gold and deep purple.',
        image: '/art/poster-7-thumb.webp',
        imageFull: '/art/poster-7-full.webp',
        basePrice: 2.00,
        variants: [
            { id: 'digital', label: 'Digital Download', price: 2.00, isDigital: true, stripeLink: STRIPE_LINKS.DIGITAL },
            { id: 'print-5x7', label: '5x7 Print', price: 3.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_5x7 },
            { id: 'print-10x8', label: '10x8 Print', price: 6.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_10x8 },
            { id: 'print-21x33', label: '21x33 Print', price: 35.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_21x33 },
        ],
    },
    {
        id: 'poster-8',
        title: 'The Soaring Sunk',
        description: 'A paradoxical masterpiece. Gravity-defying elements meeting the horizon.',
        image: '/art/poster-8-thumb.webp',
        imageFull: '/art/poster-8-full.webp',
        basePrice: 2.00,
        variants: [
            { id: 'digital', label: 'Digital Download', price: 2.00, isDigital: true, stripeLink: STRIPE_LINKS.DIGITAL },
            { id: 'print-5x7', label: '5x7 Print', price: 3.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_5x7 },
            { id: 'print-10x8', label: '10x8 Print', price: 6.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_10x8 },
            { id: 'print-21x33', label: '21x33 Print', price: 35.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_21x33 },
        ],
    },
    {
        id: 'custom',
        title: 'Custom Commission',
        description: 'Your idea brought to life! We will work with you to create a unique piece.',
        image: '/art/custom-thumb.webp',
        imageFull: '/art/custom-full.webp',
        basePrice: 15.00,
        variants: [
            { id: 'custom-req', label: 'Commission Request', price: 15.00, isDigital: false, stripeLink: STRIPE_LINKS.CUSTOM },
        ],
    },
];