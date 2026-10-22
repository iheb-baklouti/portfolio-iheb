"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * `false` during SSR and the hydration render, `true` afterwards.
 *
 * Preferred over `useState` + `useEffect` for mount guards: it reads the value
 * from an external store instead of triggering a cascading render.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
