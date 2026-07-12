/**
 * Velora Core Hooks
 *
 * Production-ready hooks for common UI patterns.
 */

"use client";

import * as React from "react";

// ─── useDebounce ──────────────────────────────────────────────────────────────

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);
  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

// ─── useLocalStorage ──────────────────────────────────────────────────────────

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = React.useState<T>(initialValue);

  React.useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) setStoredValue(JSON.parse(item) as T);
    } catch {}
  }, [key]);

  const setValue = React.useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.warn(`useLocalStorage: Failed to set key "${key}"`, error);
      }
    },
    [key, storedValue]
  );

  const removeValue = React.useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch {
      // ignore
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

// ─── useMediaQuery ────────────────────────────────────────────────────────────

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

// ─── Breakpoint hooks ─────────────────────────────────────────────────────────

export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
export const useIsTablet = () =>
  useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
export const usePrefersDark = () =>
  useMediaQuery("(prefers-color-scheme: dark)");
export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

// ─── useClickOutside ──────────────────────────────────────────────────────────

export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled = true
): void {
  React.useEffect(() => {
    if (!enabled) return;
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, enabled]);
}

// ─── useIntersectionObserver ─────────────────────────────────────────────────

export interface UseIntersectionObserverOptions
  extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = "0%",
    freezeOnceVisible = false,
  }: UseIntersectionObserverOptions = {}
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = React.useState<IntersectionObserverEntry>();
  const frozen = entry?.isIntersecting && freezeOnceVisible;

  React.useEffect(() => {
    const node = elementRef.current;
    if (!node || frozen) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e) setEntry(e); },
      { threshold, root, rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin, frozen]);

  return entry;
}

// ─── useCountUp ───────────────────────────────────────────────────────────────

export function useCountUp(
  end: number,
  duration: number = 1500,
  start: number = 0
): number {
  const [current, setCurrent] = React.useState(start);
  const startTime = React.useRef<number | null>(null);
  const rafRef = React.useRef<number>(0);

  React.useEffect(() => {
    const step = (timestamp: number) => {
      if (startTime.current === null) startTime.current = timestamp;
      const progress = Math.min(
        (timestamp - startTime.current) / duration,
        1
      );
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.floor(start + eased * (end - start)));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startTime.current = null;
    };
  }, [end, duration, start]);

  return current;
}

// ─── useCopyToClipboard ──────────────────────────────────────────────────────

export function useCopyToClipboard(
  resetTimeout: number = 2000
): [boolean, (text: string) => Promise<void>] {
  const [copied, setCopied] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = React.useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setCopied(false), resetTimeout);
      } catch (err) {
        console.warn("Failed to copy to clipboard:", err);
      }
    },
    [resetTimeout]
  );

  React.useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return [copied, copy];
}

// ─── useToggle ───────────────────────────────────────────────────────────────

export function useToggle(
  initial = false
): [boolean, () => void, (value: boolean) => void] {
  const [state, setState] = React.useState(initial);
  const toggle = React.useCallback(() => setState((s) => !s), []);
  const set = React.useCallback((v: boolean) => setState(v), []);
  return [state, toggle, set];
}

// ─── useKeyboard ─────────────────────────────────────────────────────────────

export function useKeyboard(
  handlers: Partial<Record<string, (e: KeyboardEvent) => void>>,
  enabled = true
): void {
  const handlersRef = React.useRef(handlers);
  handlersRef.current = handlers;

  React.useEffect(() => {
    if (!enabled) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const key = [
        e.ctrlKey && "ctrl",
        e.metaKey && "meta",
        e.shiftKey && "shift",
        e.altKey && "alt",
        e.key.toLowerCase(),
      ]
        .filter(Boolean)
        .join("+");
      const handler = handlersRef.current[key] ?? handlersRef.current[e.key.toLowerCase()];
      if (handler) {
        handler(e);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enabled]);
}

// ─── usePrevious ─────────────────────────────────────────────────────────────

export function usePrevious<T>(value: T): T | undefined {
  const ref = React.useRef<T>();
  React.useEffect(() => { ref.current = value; }, [value]);
  return ref.current;
}

// ─── useScrollLock ───────────────────────────────────────────────────────────

export function useScrollLock(locked: boolean): void {
  React.useEffect(() => {
    if (!locked) return;
    const originalOverflow = document.body.style.overflow;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = "";
    };
  }, [locked]);
}
