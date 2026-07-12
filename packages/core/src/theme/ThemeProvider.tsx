/**
 * Velora ThemeProvider
 *
 * Manages theme state with SSR compatibility, system preference detection,
 * and smooth theme transitions. Uses data attributes for zero-FOUC behavior.
 */

"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type VeloraTheme =
  | "light"
  | "dark"
  | "system"
  | "amoled"
  | "glass"
  | "luxury"
  | "enterprise"
  | "modern-saas"
  | "elegant-dark"
  | "high-contrast"
  | "cyberpunk"
  | "neo-brutalism"
  | "soft-ui"
  | "minimal";

export interface ThemeContextValue {
  /** Currently active theme name */
  theme: VeloraTheme;
  /** Resolved theme (accounts for "system" resolving to light/dark) */
  resolvedTheme: Exclude<VeloraTheme, "system">;
  /** Whether the resolved theme is dark */
  isDark: boolean;
  /** Set a new theme */
  setTheme: (theme: VeloraTheme) => void;
  /** Available themes */
  themes: VeloraTheme[];
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  /** Initial theme. Defaults to "system". */
  defaultTheme?: VeloraTheme;
  /** Storage key for persisting theme. Defaults to "velora-theme". */
  storageKey?: string;
  /** Whether to add transition class during theme changes */
  enableTransitions?: boolean;
  /** Custom attribute to apply to the root element */
  attribute?: string;
  /** Element to apply the theme attribute to */
  themeRoot?: "html" | "body" | string;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const ThemeContext = createContext<ThemeContextValue | null>(null);

const DARK_THEMES = new Set<VeloraTheme>([
  "dark",
  "amoled",
  "glass",
  "luxury",
  "elegant-dark",
  "high-contrast",
  "cyberpunk",
]);

const ALL_THEMES: VeloraTheme[] = [
  "light",
  "dark",
  "system",
  "amoled",
  "glass",
  "luxury",
  "enterprise",
  "modern-saas",
  "elegant-dark",
  "high-contrast",
  "cyberpunk",
  "neo-brutalism",
  "soft-ui",
  "minimal",
];

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "velora-theme",
  enableTransitions = true,
  attribute = "data-velora-theme",
  themeRoot = "html",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<VeloraTheme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    try {
      return (localStorage.getItem(storageKey) as VeloraTheme) ?? defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  const [systemIsDark, setSystemIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Detect system preference changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setSystemIsDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const resolvedTheme = useMemo((): Exclude<VeloraTheme, "system"> => {
    if (theme === "system") {
      return systemIsDark ? "dark" : "light";
    }
    return theme as Exclude<VeloraTheme, "system">;
  }, [theme, systemIsDark]);

  const isDark = DARK_THEMES.has(resolvedTheme) || resolvedTheme === "dark";

  // Apply theme to DOM
  useEffect(() => {
    const root =
      themeRoot === "html"
        ? document.documentElement
        : (document.querySelector(themeRoot) ?? document.documentElement);

    if (enableTransitions) {
      root.classList.add("velora-theme-transition");
      const timer = setTimeout(
        () => root.classList.remove("velora-theme-transition"),
        300
      );
      return () => clearTimeout(timer);
    }

    return undefined;
  }, [resolvedTheme, themeRoot, enableTransitions]);

  useEffect(() => {
    const root =
      themeRoot === "html"
        ? document.documentElement
        : (document.querySelector(themeRoot) ?? document.documentElement);

    root.setAttribute(attribute, theme);

    // Add/remove dark class for Tailwind dark mode compatibility
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme, isDark, attribute, themeRoot]);

  const setTheme = useCallback(
    (newTheme: VeloraTheme) => {
      try {
        localStorage.setItem(storageKey, newTheme);
      } catch {
        // localStorage not available (e.g. private mode)
      }
      setThemeState(newTheme);
    },
    [storageKey]
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      isDark,
      setTheme,
      themes: ALL_THEMES,
    }),
    [theme, resolvedTheme, isDark, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return ctx;
}

// ─── SSR Script (prevents FOUC) ───────────────────────────────────────────────

/**
 * Inject this script in the <head> before any content to prevent
 * a flash of unstyled content on initial page load.
 */
export function ThemeScript({
  storageKey = "velora-theme",
  defaultTheme = "system",
}: {
  storageKey?: string;
  defaultTheme?: VeloraTheme;
}) {
  const script = `
    (function() {
      try {
        var theme = localStorage.getItem('${storageKey}') || '${defaultTheme}';
        var root = document.documentElement;
        root.setAttribute('data-velora-theme', theme);
        var darkThemes = ['dark','amoled','glass','luxury','elegant-dark','high-contrast','cyberpunk'];
        var isDark = darkThemes.indexOf(theme) !== -1;
        var isSystem = theme === 'system';
        if (isSystem) isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isDark) root.classList.add('dark');
      } catch(e) {}
    })();
  `.trim();

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
