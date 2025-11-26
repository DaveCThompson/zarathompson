Here is the step-by-step guide to setting up the Stripe backend for this specific serverless architecture.

--- START OF FILE STRIPE-GUIDE.md ---

# Stripe Configuration Guide for Zara Thompson Art

This project uses **Stripe Payment Links** to handle commerce without a backend server. This guide details how to configure the products to match the application's logic (Local Pickup vs. Digital Delivery).

---

## Phase 1: Global Account Settings

1.  **Log in** to the [Stripe Dashboard](https://dashboard.stripe.com/).
2.  **Branding:**
    *   Go to **Settings > Branding**.
    *   **Icon:** Upload a version of the site logo/favicon.
    *   **Brand Color:** Set to `#e63946` (or a vibrant color matching the `fg-accent` tone, roughly `oklch(60% 0.22 0)` -> `#ff3e3e`).
    *   *Why:* This ensures the checkout page looks trusted and "High Craft" like the rest of the site.
3.  **Public Details:**
    *   Ensure the "Statement Descriptor" says `ZARA ART` or similar, so parents recognize the charge.

---

## Phase 2: Creating Products

You need to create a unique Product in Stripe for every art piece to keep sales analytics clean.

1.  Go to **Products > Add Product**.
2.  **Name:** e.g., "The Court King (Basketball)".
3.  **Description:** "Abstract art print by Zara Thompson."
4.  **Image:** Upload the JPEG/PNG version of the art.
5.  **Pricing:**
    *   Do **NOT** add all prices here yet. Just create the product shell.
    *   *Strategy:* We will create specific "Pricing Options" (Payment Links) in the next phase.

*Repeat for all 6 posters.*

---

## Phase 3: Generating Physical Links (The Pickup Logic)

These links are for the **5x7**, **10x8**, and **21x33** prints. We must capture the student's information for school delivery.

1.  Go to **Payments > Payment Links**.
2.  Click **+ New**.
3.  **Select Product:** Choose one of the posters (e.g., "The Court King").
4.  **Price:** Add a new price (e.g., `$3.00`) and name it "5x7 Print".
5.  **Options (The Critical Part):**
    *   **Collect Tax automatically:** [On/Off] (Depends on your local laws, usually Off for small student fundraisers).
    *   **Collect Customers Address:** **Uncheck** "Billing address" and "Shipping address". (We do not want to ship).
    *   **Require Phone Number:** Uncheck.
6.  **Advanced Options > Custom Fields:**
    *   Click **Add custom field**.
    *   **Type:** Text.
    *   **Label:** `Student Name & Homeroom`.
    *   **Help Text:** `Required for delivery to Royal Oak Middle School.`
    *   **Required:** Yes.
7.  **After Payment:**
    *   Select **"Redirect your customer to a website"**.
    *   **URL:** `https://zarathompson.com/?success=true`
    *   *Note:* This URL triggers the "Thank You" toast on the main site.
8.  **Create Link:**
    *   Copy the URL (starts with `buy.stripe.com/...`).
    *   Paste it into `src/data/products.ts` for that specific variant.

---

## Phase 4: Generating Digital Links (The Email Logic)

These links are for the **Digital Download ($2.00)** option. We do NOT need the homeroom info.

1.  Go to **Payments > Payment Links > + New**.
2.  **Select Product:** Choose the poster.
3.  **Price:** Add a new price (`$2.00`) and name it "Digital Download".
4.  **Options:**
    *   **Collect Customers Address:** **Uncheck** all.
5.  **Advanced Options > Custom Fields:**
    *   **Do NOT** add the Student Name field.
6.  **After Payment:**
    *   Select **"Redirect your customer to a website"**.
    *   **URL:** `https://zarathompson.com/?success=true`
    *   *(Advanced Alternative):* If you want to give them the file immediately, create a hidden page on your site or a Google Drive folder link, and redirect them there instead.
7.  **Create Link:**
    *   Copy URL.
    *   Paste into `src/data/products.ts`.

---

## Phase 5: The "One-of-a-Kind" Custom Commission

1.  Create a **New Product**: "Custom Commission Deposit".
2.  **Price:** `$15.00`.
3.  **Payment Link Options:**
    *   **Custom Field:** `Describe your idea`.
    *   **Redirect:** `https://zarathompson.com/?success=true`
4.  **Create Link:**
    *   Add this to the "Custom" product in `src/data/products.ts` (if enabled).

---

## Summary Checklist

| Variant | Price | Collect Address? | Custom Field? | Redirect |
| :--- | :--- | :--- | :--- | :--- |
| **Digital** | $2.00 | NO | NO | `/?success=true` |
| **5x7 Print** | $3.00 | NO | **YES** (Student/Homeroom) | `/?success=true` |
| **10x8 Print** | $6.00 | NO | **YES** (Student/Homeroom) | `/?success=true` |
| **Poster** | $35.00 | NO | **YES** (Student/Homeroom) | `/?success=true` |

--- START OF FILE src/data/products.ts ---

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

// TODO: REPLACE THESE PLACEHOLDERS WITH YOUR REAL STRIPE LINKS
const STRIPE_LINKS = {
    // Digital Downloads
    DIGITAL_BASKETBALL: 'https://buy.stripe.com/test_digital_basketball',
    DIGITAL_POP: 'https://buy.stripe.com/test_digital_pop',
    
    // 5x7 Prints
    PRINT_5x7_BASKETBALL: 'https://buy.stripe.com/test_5x7_basketball',
    
    // Generic Fallbacks (Use these if you create one "Generic 5x7" link for all art)
    // PRO TIP: It's better to have unique links per art piece for inventory tracking, 
    // but a single "Generic 5x7" link is easier to manage if you don't care about tracking *which* art sold in Stripe.
    GENERIC_DIGITAL: 'https://buy.stripe.com/test_digital_generic',
    GENERIC_5x7: 'https://buy.stripe.com/test_5x7_generic',
    GENERIC_10x8: 'https://buy.stripe.com/test_10x8_generic',
    GENERIC_POSTER: 'https://buy.stripe.com/test_poster_generic',
};

export const PRODUCTS: Product[] = [
    {
        id: 'basketball',
        title: 'The Court King',
        description: 'Dominating the court with eagle-eyed precision. A high-energy tribute to the game.',
        image: '/art/thumb_5x7_basketball.webp',
        imageFull: '/art/5x7_basketball.webp', 
        basePrice: 2.00,
        variants: [
            { id: 'digital', label: 'Digital Download', price: 2.00, isDigital: true, stripeLink: STRIPE_LINKS.GENERIC_DIGITAL },
            { id: 'print-5x7', label: '5x7 Print', price: 3.00, isDigital: false, stripeLink: STRIPE_LINKS.GENERIC_5x7 },
            { id: 'print-10x8', label: '10x8 Print', price: 6.00, isDigital: false, stripeLink: STRIPE_LINKS.GENERIC_10x8 },
            { id: 'print-21x33', label: '21x33 Print', price: 35.00, isDigital: false, stripeLink: STRIPE_LINKS.GENERIC_POSTER },
        ],
    },
    {
        id: 'pop-singer',
        title: 'Pop Star',
        description: 'Explosive energy and stardom. A vibrant tribute to pop culture.',
        image: '/art/thumb_5x7_pop-singer.webp',
        imageFull: '/art/5x7_pop-singer.webp', 
        basePrice: 2.00,
        variants: [
            { id: 'digital', label: 'Digital Download', price: 2.00, isDigital: true, stripeLink: STRIPE_LINKS.GENERIC_DIGITAL },
            { id: 'print-5x7', label: '5x7 Print', price: 3.00, isDigital: false, stripeLink: STRIPE_LINKS.GENERIC_5x7 },
            { id: 'print-10x8', label: '10x8 Print', price: 6.00, isDigital: false, stripeLink: STRIPE_LINKS.GENERIC_10x8 },
            { id: 'print-21x33', label: '21x33 Print', price: 35.00, isDigital: false, stripeLink: STRIPE_LINKS.GENERIC_POSTER },
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
            { id: 'digital', label: 'Digital Download', price: 2.00, isDigital: true, stripeLink: STRIPE_LINKS.GENERIC_DIGITAL },
            { id: 'print-5x7', label: '5x7 Print', price: 3.00, isDigital: false, stripeLink: STRIPE_LINKS.GENERIC_5x7 },
            { id: 'print-10x8', label: '10x8 Print', price: 6.00, isDigital: false, stripeLink: STRIPE_LINKS.GENERIC_10x8 },
            { id: 'print-21x33', label: '21x33 Print', price: 35.00, isDigital: false, stripeLink: STRIPE_LINKS.GENERIC_POSTER },
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
            { id: 'digital', label: 'Digital Download', price: 2.00, isDigital: true, stripeLink: STRIPE_LINKS.GENERIC_DIGITAL },
            { id: 'print-5x7', label: '5x7 Print', price: 3.00, isDigital: false, stripeLink: STRIPE_LINKS.GENERIC_5x7 },
            { id: 'print-10x8', label: '10x8 Print', price: 6.00, isDigital: false, stripeLink: STRIPE_LINKS.GENERIC_10x8 },
            { id: 'print-21x33', label: '21x33 Print', price: 35.00, isDigital: false, stripeLink: STRIPE_LINKS.GENERIC_POSTER },
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
            { id: 'digital', label: 'Digital Download', price: 2.00, isDigital: true, stripeLink: STRIPE_LINKS.GENERIC_DIGITAL },
            { id: 'print-5x7', label: '5x7 Print', price: 3.00, isDigital: false, stripeLink: STRIPE_LINKS.GENERIC_5x7 },
            { id: 'print-10x8', label: '10x8 Print', price: 6.00, isDigital: false, stripeLink: STRIPE_LINKS.GENERIC_10x8 },
            { id: 'print-21x33', label: '21x33 Print', price: 35.00, isDigital: false, stripeLink: STRIPE_LINKS.GENERIC_POSTER },
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
            { id: 'digital', label: 'Digital Download', price: 2.00, isDigital: true, stripeLink: STRIPE_LINKS.GENERIC_DIGITAL },
            { id: 'print-5x7', label: '5x7 Print', price: 3.00, isDigital: false, stripeLink: STRIPE_LINKS.GENERIC_5x7 },
            { id: 'print-10x8', label: '10x8 Print', price: 6.00, isDigital: false, stripeLink: STRIPE_LINKS.GENERIC_10x8 },
            { id: 'print-21x33', label: '21x33 Print', price: 35.00, isDigital: false, stripeLink: STRIPE_LINKS.GENERIC_POSTER },
        ],
    },
];
END:
1. Verify `STRIPE_LINKS` object structure.
2. Verify all products map to a `STRIPE_LINKS` constant.