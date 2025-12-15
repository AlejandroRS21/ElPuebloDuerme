'use client';

import { useEffect, useCallback } from 'react';
import { socketManager } from '@/lib/socket/socket';

export function useSocket() {
  useEffect(() => {
    // Connect on mount if not connected
    if (!socketManager.isConnected()) {
      // socketManager.connect();
    }

    // Cleanup on unmount
    return () => {
      // We don't disconnect here as other components might be using it
      // Only disconnect when user logs out or closes the app
    };
  }, []);

  const on = useCallback((event: string, callback: Function) => {
    socketManager.on(event, callback);
  }, []);

  const off = useCallback((event: string, callback?: Function) => {
    socketManager.off(event, callback);
  }, []);

  const emit = useCallback((event: string, ...args: any[]) => {
    socketManager.emit(event, ...args);
  }, []);

  const isConnected = useCallback(() => {
    return socketManager.isConnected();
  }, []);

  return {
    on,
    off,
    emit,
    isConnected,
  };
}
