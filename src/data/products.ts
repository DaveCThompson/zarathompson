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
        id: 'basketball',
        title: 'The Court King',
        description: 'Dominating the court with eagle-eyed precision. A high-energy tribute to the game.',
        image: '/art/thumb_5x7_basketball.webp',
        imageFull: '/art/thumb_5x7_basketball.webp', // Fallback: High-res missing
        basePrice: 2.00,
        variants: [
            { id: 'digital', label: 'Digital Download', price: 2.00, isDigital: true, stripeLink: STRIPE_LINKS.DIGITAL },
            { id: 'print-5x7', label: '5x7 Print', price: 3.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_5x7 },
            { id: 'print-10x8', label: '10x8 Print', price: 6.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_10x8 },
            { id: 'print-21x33', label: '21x33 Print', price: 35.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_21x33 },
        ],
    },
    {
        id: 'pop-singer',
        title: 'Pop Star',
        description: 'Explosive energy and stardom. A vibrant tribute to pop culture.',
        image: '/art/thumb_5x7_pop-singer.webp',
        imageFull: '/art/thumb_5x7_pop-singer.webp', // Fallback: High-res missing
        basePrice: 2.00,
        variants: [
            { id: 'digital', label: 'Digital Download', price: 2.00, isDigital: true, stripeLink: STRIPE_LINKS.DIGITAL },
            { id: 'print-5x7', label: '5x7 Print', price: 3.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_5x7 },
            { id: 'print-10x8', label: '10x8 Print', price: 6.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_10x8 },
            { id: 'print-21x33', label: '21x33 Print', price: 35.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_21x33 },
        ],
    },
    {
        id: 'pug-blue',
        title: 'I Need A Hug (Blue)',
        description: 'A soulful gaze that tugs at the heartstrings. Set against a calming blue backdrop.',
        image: '/art/thumb_5x7_pug-blue.webp',
        imageFull: '/art/5x7_pug-blue.webp',
        basePrice: 2.00,
        variants: [
            { id: 'digital', label: 'Digital Download', price: 2.00, isDigital: true, stripeLink: STRIPE_LINKS.DIGITAL },
            { id: 'print-5x7', label: '5x7 Print', price: 3.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_5x7 },
            { id: 'print-10x8', label: '10x8 Print', price: 6.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_10x8 },
            { id: 'print-21x33', label: '21x33 Print', price: 35.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_21x33 },
        ],
    },
    {
        id: 'pug-pink',
        title: 'I Need A Hug (Pink)',
        description: 'Irresistible charm in a warm embrace. A cozy pink setting for a lovable friend.',
        image: '/art/thumb_5x7_pug-pink.webp',
        imageFull: '/art/5x7_pug-pink.webp',
        basePrice: 2.00,
        variants: [
            { id: 'digital', label: 'Digital Download', price: 2.00, isDigital: true, stripeLink: STRIPE_LINKS.DIGITAL },
            { id: 'print-5x7', label: '5x7 Print', price: 3.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_5x7 },
            { id: 'print-10x8', label: '10x8 Print', price: 6.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_10x8 },
            { id: 'print-21x33', label: '21x33 Print', price: 35.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_21x33 },
        ],
    },
    {
        id: 'soccer',
        title: 'The Royal Striker',
        description: 'Regal and commanding on the pitch. A powerful composition of athleticism and grace.',
        image: '/art/thumb_5x7_soccer.webp',
        imageFull: '/art/5x7_soccer.webp',
        basePrice: 2.00,
        variants: [
            { id: 'digital', label: 'Digital Download', price: 2.00, isDigital: true, stripeLink: STRIPE_LINKS.DIGITAL },
            { id: 'print-5x7', label: '5x7 Print', price: 3.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_5x7 },
            { id: 'print-10x8', label: '10x8 Print', price: 6.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_10x8 },
            { id: 'print-21x33', label: '21x33 Print', price: 35.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_21x33 },
        ],
    },
    {
        id: 'volleyball',
        title: 'The Soaring Spike',
        description: 'Gravity-defying action at the net. Capturing the peak moment of the game.',
        image: '/art/thumb_5x7_volleyball.webp',
        imageFull: '/art/5x7_volleyball.webp',
        basePrice: 2.00,
        variants: [
            { id: 'digital', label: 'Digital Download', price: 2.00, isDigital: true, stripeLink: STRIPE_LINKS.DIGITAL },
            { id: 'print-5x7', label: '5x7 Print', price: 3.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_5x7 },
            { id: 'print-10x8', label: '10x8 Print', price: 6.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_10x8 },
            { id: 'print-21x33', label: '21x33 Print', price: 35.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_21x33 },
        ],
    },
    // {
    //     id: 'custom',
    //     title: 'Custom Commission',
    //     description: 'Your idea brought to life! We will work with you to create a unique piece.',
    //     image: '/art/custom-thumb.webp',
    //     imageFull: '/art/custom-full.webp',
    //     basePrice: 15.00,
    //     variants: [
    //         { id: 'custom-req', label: 'Commission Request', price: 15.00, isDigital: false, stripeLink: STRIPE_LINKS.CUSTOM },
    //     ],
    // },
];