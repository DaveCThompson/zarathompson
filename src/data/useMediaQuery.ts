import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
    // Initialize with false to prevent hydration mismatches
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        
        // Set initial value inside effect
        if (media.matches !== matches) {
            setMatches(media.matches);
        }

        const listener = () => setMatches(media.matches);
        
        // Modern browsers
        media.addEventListener("change", listener);
        
        return () => media.removeEventListener("change", listener);
    }, [query]);

    return matches;
}