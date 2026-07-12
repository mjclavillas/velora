/**
 * Velora Design Tokens
 *
 * A complete, semantic design token system built for scalability,
 * theming, and developer experience. All values are expressed as
 * CSS custom property references to support runtime theming.
 */

// ─── Color Palette ──────────────────────────────────────────────────────────

export const palette = {
  // Slate — Primary neutral
  slate: {
    50: "#f8f9fc",
    100: "#f0f2f8",
    200: "#dde2ef",
    300: "#c4cde0",
    400: "#9aaac8",
    500: "#7285ae",
    600: "#566492",
    700: "#404e72",
    800: "#2c3650",
    900: "#1a2035",
    950: "#0d1120",
  },
  // Violet — Primary accent
  violet: {
    50: "#f5f2ff",
    100: "#ede8ff",
    200: "#dbd4ff",
    300: "#c0b4ff",
    400: "#a08bff",
    500: "#8060ff",
    600: "#6b3ef5",
    700: "#5a2de0",
    800: "#4a25b8",
    900: "#3d2090",
    950: "#230f5c",
  },
  // Cyan — Secondary accent
  cyan: {
    50: "#ecfcff",
    100: "#d0f6fd",
    200: "#a4ecfb",
    300: "#60ddf7",
    400: "#1ac8ed",
    500: "#06add3",
    600: "#0889b0",
    700: "#0f6e8e",
    800: "#145972",
    900: "#154b5f",
    950: "#073142",
  },
  // Emerald — Success
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
    950: "#022c22",
  },
  // Amber — Warning
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03",
  },
  // Rose — Destructive / Error
  rose: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337",
    950: "#4c0519",
  },
  // Pure
  white: "#ffffff",
  black: "#000000",
  transparent: "transparent",
} as const;

// ─── Semantic Color Tokens ───────────────────────────────────────────────────

export const semanticColors = {
  // Background
  "bg-base": "var(--velora-bg-base)",
  "bg-subtle": "var(--velora-bg-subtle)",
  "bg-muted": "var(--velora-bg-muted)",
  "bg-inverted": "var(--velora-bg-inverted)",
  "bg-overlay": "var(--velora-bg-overlay)",

  // Surface
  "surface-base": "var(--velora-surface-base)",
  "surface-raised": "var(--velora-surface-raised)",
  "surface-overlay": "var(--velora-surface-overlay)",
  "surface-sunken": "var(--velora-surface-sunken)",

  // Brand
  "brand-default": "var(--velora-brand-default)",
  "brand-emphasis": "var(--velora-brand-emphasis)",
  "brand-subtle": "var(--velora-brand-subtle)",
  "brand-muted": "var(--velora-brand-muted)",
  "brand-fg": "var(--velora-brand-fg)",

  // Text
  "text-primary": "var(--velora-text-primary)",
  "text-secondary": "var(--velora-text-secondary)",
  "text-tertiary": "var(--velora-text-tertiary)",
  "text-disabled": "var(--velora-text-disabled)",
  "text-inverse": "var(--velora-text-inverse)",
  "text-brand": "var(--velora-text-brand)",
  "text-success": "var(--velora-text-success)",
  "text-warning": "var(--velora-text-warning)",
  "text-danger": "var(--velora-text-danger)",

  // Border
  "border-base": "var(--velora-border-base)",
  "border-muted": "var(--velora-border-muted)",
  "border-strong": "var(--velora-border-strong)",
  "border-brand": "var(--velora-border-brand)",
  "border-success": "var(--velora-border-success)",
  "border-warning": "var(--velora-border-warning)",
  "border-danger": "var(--velora-border-danger)",

  // State
  "state-success": "var(--velora-state-success)",
  "state-warning": "var(--velora-state-warning)",
  "state-danger": "var(--velora-state-danger)",
  "state-info": "var(--velora-state-info)",
  "state-success-subtle": "var(--velora-state-success-subtle)",
  "state-warning-subtle": "var(--velora-state-warning-subtle)",
  "state-danger-subtle": "var(--velora-state-danger-subtle)",
  "state-info-subtle": "var(--velora-state-info-subtle)",
} as const;

// ─── Spacing ─────────────────────────────────────────────────────────────────

export const spacing = {
  px: "1px",
  0: "0px",
  0.5: "2px",
  1: "4px",
  1.5: "6px",
  2: "8px",
  2.5: "10px",
  3: "12px",
  3.5: "14px",
  4: "16px",
  5: "20px",
  6: "24px",
  7: "28px",
  8: "32px",
  9: "36px",
  10: "40px",
  11: "44px",
  12: "48px",
  14: "56px",
  16: "64px",
  20: "80px",
  24: "96px",
  28: "112px",
  32: "128px",
  36: "144px",
  40: "160px",
  48: "192px",
  56: "224px",
  64: "256px",
} as const;

// ─── Typography ──────────────────────────────────────────────────────────────

export const typography = {
  fontFamily: {
    sans: "var(--velora-font-sans)",
    mono: "var(--velora-font-mono)",
    display: "var(--velora-font-display)",
  },
  fontSize: {
    xs: ["0.75rem", { lineHeight: "1rem" }],
    sm: ["0.875rem", { lineHeight: "1.25rem" }],
    base: ["1rem", { lineHeight: "1.5rem" }],
    lg: ["1.125rem", { lineHeight: "1.75rem" }],
    xl: ["1.25rem", { lineHeight: "1.75rem" }],
    "2xl": ["1.5rem", { lineHeight: "2rem" }],
    "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
    "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
    "5xl": ["3rem", { lineHeight: "1" }],
    "6xl": ["3.75rem", { lineHeight: "1" }],
    "7xl": ["4.5rem", { lineHeight: "1" }],
    "8xl": ["6rem", { lineHeight: "1" }],
    "9xl": ["8rem", { lineHeight: "1" }],
  },
  fontWeight: {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
} as const;

// ─── Border Radius ────────────────────────────────────────────────────────────

export const radius = {
  none: "0px",
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "20px",
  "3xl": "24px",
  full: "9999px",
} as const;

// ─── Shadows ─────────────────────────────────────────────────────────────────

export const shadows = {
  none: "none",
  xs: "0 1px 2px 0 rgb(0 0 0 / 0.04)",
  sm: "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.04)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.06), 0 4px 6px -4px rgb(0 0 0 / 0.04)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.04)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.12)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.04)",
  glow: {
    brand: "0 0 20px -4px var(--velora-brand-default)",
    success: "0 0 20px -4px var(--velora-state-success)",
    danger: "0 0 20px -4px var(--velora-state-danger)",
  },
} as const;

// ─── Motion / Animation ───────────────────────────────────────────────────────

export const motion = {
  duration: {
    instant: 0,
    fast: 100,
    normal: 200,
    slow: 300,
    slower: 500,
    slowest: 800,
  },
  easing: {
    linear: [0, 0, 1, 1],
    easeIn: [0.4, 0, 1, 1],
    easeOut: [0, 0, 0.2, 1],
    easeInOut: [0.4, 0, 0.2, 1],
    spring: { type: "spring", stiffness: 380, damping: 30 },
    springBouncy: { type: "spring", stiffness: 400, damping: 20 },
    springSmooth: { type: "spring", stiffness: 300, damping: 35 },
    anticipate: [0.36, 0, 0.66, -0.56],
  },
} as const;

// ─── Z-Index ─────────────────────────────────────────────────────────────────

export const zIndex = {
  hide: -1,
  base: 0,
  raised: 10,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  popover: 1400,
  toast: 1500,
  tooltip: 1600,
} as const;

// ─── Breakpoints ──────────────────────────────────────────────────────────────

export const breakpoints = {
  xs: "480px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// ─── Blur ─────────────────────────────────────────────────────────────────────

export const blur = {
  none: "0",
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "24px",
  "3xl": "40px",
} as const;

export type PaletteColor = typeof palette;
export type SemanticColor = keyof typeof semanticColors;
export type Spacing = keyof typeof spacing;
export type Radius = keyof typeof radius;
export type Shadow = keyof typeof shadows;
export type ZIndex = keyof typeof zIndex;
