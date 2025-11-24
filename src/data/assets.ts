// FILE: src/data/assets.ts

/**
 * Resolves a static asset path relative to the deployment base URL.
 * This fixes 404 errors on GitHub Pages where the site is served from a subdirectory.
 * 
 * @param path - The path starting with / (e.g., "/art/image.webp")
 */
export function getAssetUrl(path: string): string {
    // import.meta.env.BASE_URL is set in vite.config.ts
    // In Dev: "/"
    // In Prod: "/zarathompson/"
    const baseUrl = import.meta.env.BASE_URL;

    // Remove leading slash from path if it exists to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    // Remove trailing slash from baseUrl if it exists to ensure clean join
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

    return `${cleanBase}${cleanPath}`;
}