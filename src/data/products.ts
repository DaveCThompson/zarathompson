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
    image: string;      // 400w Thumbnail (Grid)
    imageFull?: string; // 800w Preview (Modal)
    basePrice: number;
    variants: ProductVariant[];
}

// TODO: Replace these with your actual Stripe Payment Links once generated
const STRIPE_LINKS = {
    DIGITAL: 'https://buy.stripe.com/test_digital',
    PRINT_5x7: 'https://buy.stripe.com/test_5x7',
    PRINT_10x8: 'https://buy.stripe.com/test_10x8',
    PRINT_21x33: 'https://buy.stripe.com/test_21x33',
};

export const PRODUCTS: Product[] = [
    {
        id: 'basketball',
        title: 'The Court King',
        description: 'Dominating the court with eagle-eyed precision. A high-energy tribute to the game.',
        // UPDATED: Matches new 400w/800w convention
        image: '/art/400w_basketball.webp',
        imageFull: '/art/800w_basketball.webp',
        basePrice: 3.00,
        variants: [
            { id: 'digital', label: 'Digital Download', price: 3.00, isDigital: true, stripeLink: STRIPE_LINKS.DIGITAL },
            { id: 'print-5x7', label: '5x7 Print', price: 5.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_5x7 },
            { id: 'print-10x8', label: '10x8 Print', price: 10.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_10x8 },
            { id: 'print-21x33', label: '21x33 Print', price: 40.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_21x33 },
        ],
    },
    {
        id: 'pop-singer',
        title: 'Pop Star',
        description: 'Explosive energy and stardom. A vibrant tribute to pop culture.',
        // UPDATED: Note underscore in filename vs hyphen in ID
        image: '/art/400w_pop_singer.webp',
        imageFull: '/art/800w_pop_singer.webp',
        basePrice: 3.00,
        variants: [
            { id: 'digital', label: 'Digital Download', price: 3.00, isDigital: true, stripeLink: STRIPE_LINKS.DIGITAL },
            { id: 'print-5x7', label: '5x7 Print', price: 5.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_5x7 },
            { id: 'print-10x8', label: '10x8 Print', price: 10.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_10x8 },
            { id: 'print-21x33', label: '21x33 Print', price: 40.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_21x33 },
        ],
    },
    {
        id: 'pug-blue',
        title: 'I Need A Hug (Blue)',
        description: 'A soulful gaze that tugs at the heartstrings. Set against a calming blue backdrop.',
        image: '/art/400w_pug_blue.webp',
        imageFull: '/art/800w_pug_blue.webp',
        basePrice: 3.00,
        variants: [
            { id: 'digital', label: 'Digital Download', price: 3.00, isDigital: true, stripeLink: STRIPE_LINKS.DIGITAL },
            { id: 'print-5x7', label: '5x7 Print', price: 5.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_5x7 },
            { id: 'print-10x8', label: '10x8 Print', price: 10.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_10x8 },
            { id: 'print-21x33', label: '21x33 Print', price: 40.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_21x33 },
        ],
    },
    {
        id: 'pug-pink',
        title: 'I Need A Hug (Pink)',
        description: 'Irresistible charm in a warm embrace. A cozy pink setting for a lovable friend.',
        image: '/art/400w_pug_pink.webp',
        imageFull: '/art/800w_pug_pink.webp',
        basePrice: 3.00,
        variants: [
            { id: 'digital', label: 'Digital Download', price: 3.00, isDigital: true, stripeLink: STRIPE_LINKS.DIGITAL },
            { id: 'print-5x7', label: '5x7 Print', price: 5.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_5x7 },
            { id: 'print-10x8', label: '10x8 Print', price: 10.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_10x8 },
            { id: 'print-21x33', label: '21x33 Print', price: 40.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_21x33 },
        ],
    },
    {
        id: 'soccer',
        title: 'The Royal Striker',
        description: 'Regal and commanding on the pitch. A powerful composition of athleticism and grace.',
        image: '/art/400w_soccer.webp',
        imageFull: '/art/800w_soccer.webp',
        basePrice: 3.00,
        variants: [
            { id: 'digital', label: 'Digital Download', price: 3.00, isDigital: true, stripeLink: STRIPE_LINKS.DIGITAL },
            { id: 'print-5x7', label: '5x7 Print', price: 5.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_5x7 },
            { id: 'print-10x8', label: '10x8 Print', price: 10.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_10x8 },
            { id: 'print-21x33', label: '21x33 Print', price: 40.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_21x33 },
        ],
    },
    {
        id: 'volleyball',
        title: 'The Soaring Spike',
        description: 'Gravity-defying action at the net. Capturing the peak moment of the game.',
        image: '/art/400w_volleyball.webp',
        imageFull: '/art/800w_volleyball.webp',
        basePrice: 3.00,
        variants: [
            { id: 'digital', label: 'Digital Download', price: 3.00, isDigital: true, stripeLink: STRIPE_LINKS.DIGITAL },
            { id: 'print-5x7', label: '5x7 Print', price: 5.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_5x7 },
            { id: 'print-10x8', label: '10x8 Print', price: 10.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_10x8 },
            { id: 'print-21x33', label: '21x33 Print', price: 40.00, isDigital: false, stripeLink: STRIPE_LINKS.PRINT_21x33 },
        ],
    },
];