import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';

/**
 * Hook to manage socket connection lifecycle
 * Connects on mount, disconnects on unmount
 */
export function useSocket() {
    const connect = useGameStore((state) => state.connect);
    const disconnect = useGameStore((state) => state.disconnect);
    const connected = useGameStore((state) => state.connected);
    const hasConnected = useRef(false);

    useEffect(() => {
        if (!hasConnected.current) {
            connect();
            hasConnected.current = true;
        }

        return () => {
            // Don't disconnect on HMR
            if (import.meta.hot) return;
            disconnect();
        };
    }, [connect, disconnect]);

    return connected;
}
