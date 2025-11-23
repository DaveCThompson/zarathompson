// FILE: src/data/useMediaQuery.ts
import { useSyncExternalStore } from "react";

/**
 * CRITICAL ARCHITECTURE NOTE:
 * We use useSyncExternalStore instead of useEffect + useState.
 * 
 * In React 18+, subscribing to external stores (like window.matchMedia) 
 * inside useEffect can cause tearing and hydration mismatches during concurrent rendering.
 * useSyncExternalStore forces React to pause rendering until the store is consistent.
 * 
 * DO NOT REVERT TO USEEFFECT.
 */
export function useMediaQuery(query: string): boolean {
    const subscribe = (callback: () => void) => {
        const matchMedia = window.matchMedia(query);
        matchMedia.addEventListener("change", callback);
        return () => matchMedia.removeEventListener("change", callback);
    };

    const getSnapshot = () => {
        return window.matchMedia(query).matches;
    };

    const getServerSnapshot = () => {
        // Always return false on server to ensure consistent hydration.
        // The UI will snap to the client value immediately after mount.
        return false; 
    };

    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}