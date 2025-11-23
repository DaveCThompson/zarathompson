// FILE: src/data/scarcity.ts

/**
 * Calculates a deterministic (pseudo-random) scarcity level based on the date.
 * This ensures all users see the same "scarcity" for a product on the same day,
 * without needing a backend database.
 */
export function getScarcityForProduct(productId: string): number | null {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0-6
    const dayOfMonth = today.getDate();

    // Create a seed string that changes daily
    const str = `${productId}-${dayOfWeek}-${dayOfMonth}`;
    
    // Simple hash function to convert string to integer
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }

    const absHash = Math.abs(hash);

    // 40% chance of being "Scarce" (displaying the Low Stock badge)
    if (absHash % 10 < 4) {
        // Return a number between 1 and 5
        return (absHash % 5) + 1;
    }

    return null;
}