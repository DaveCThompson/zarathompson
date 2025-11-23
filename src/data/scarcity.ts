export function getScarcityForProduct(productId: string): number | null {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0-6
    const dayOfMonth = today.getDate();

    // Simple hash function to get a stable number for the product + day
    let hash = 0;
    const str = `${productId}-${dayOfWeek}-${dayOfMonth}`; // Changes daily
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }

    const absHash = Math.abs(hash);

    // 40% chance of being scarce
    if (absHash % 10 < 4) {
        // Return a number between 1 and 5
        return (absHash % 5) + 1;
    }

    return null;
}