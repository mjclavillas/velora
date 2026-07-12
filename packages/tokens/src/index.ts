/**
 * @velora/tokens
 *
 * Design token constants in multiple formats.
 * Use these when you need raw values (e.g. in JS animations,
 * Canvas/WebGL rendering, or non-Tailwind environments).
 */

// ─── Color Scales ─────────────────────────────────────────────────────────────

export const violet = {
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
} as const;

export const cyan = {
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
} as const;

export const slate = {
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
} as const;

export const emerald = {
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
} as const;

export const amber = {
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
} as const;

export const rose = {
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
} as const;

export const gold = {
  100: "#fef9e7",
  200: "#fdf0b8",
  300: "#f9dc6e",
  400: "#f5c842",
  500: "#d4af37",
  600: "#c49b20",
  700: "#a07a10",
  800: "#7d5c0a",
  900: "#5a4208",
} as const;

// ─── Semantic Themes ──────────────────────────────────────────────────────────

export type ThemeTokens = {
  bgBase: string;
  bgSubtle: string;
  bgMuted: string;
  surfaceBase: string;
  surfaceRaised: string;
  surfaceOverlay: string;
  brandDefault: string;
  brandEmphasis: string;
  brandSubtle: string;
  brandMuted: string;
  brandFg: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textDisabled: string;
  textInverse: string;
  textBrand: string;
  borderBase: string;
  borderMuted: string;
  borderStrong: string;
  borderBrand: string;
  stateSuccess: string;
  stateWarning: string;
  stateDanger: string;
  stateInfo: string;
};

export const themes: Record<string, ThemeTokens> = {
  dark: {
    bgBase: slate[950],
    bgSubtle: "#131729",
    bgMuted: slate[900],
    surfaceBase: "#131729",
    surfaceRaised: slate[900],
    surfaceOverlay: "#1f2744",
    brandDefault: violet[500],
    brandEmphasis: violet[600],
    brandSubtle: "#2c2050",
    brandMuted: "#1e1838",
    brandFg: "#ffffff",
    textPrimary: slate[100],
    textSecondary: slate[300],
    textTertiary: slate[500],
    textDisabled: slate[700],
    textInverse: slate[950],
    textBrand: violet[400],
    borderBase: slate[800],
    borderMuted: slate[900],
    borderStrong: slate[700],
    borderBrand: violet[500],
    stateSuccess: emerald[500],
    stateWarning: amber[500],
    stateDanger: rose[500],
    stateInfo: cyan[400],
  },
  light: {
    bgBase: "#ffffff",
    bgSubtle: slate[50],
    bgMuted: slate[100],
    surfaceBase: "#ffffff",
    surfaceRaised: "#ffffff",
    surfaceOverlay: "#ffffff",
    brandDefault: violet[500],
    brandEmphasis: violet[600],
    brandSubtle: violet[100],
    brandMuted: violet[50],
    brandFg: "#ffffff",
    textPrimary: slate[900],
    textSecondary: slate[700],
    textTertiary: slate[500],
    textDisabled: slate[400],
    textInverse: "#ffffff",
    textBrand: violet[600],
    borderBase: slate[200],
    borderMuted: slate[100],
    borderStrong: slate[300],
    borderBrand: violet[500],
    stateSuccess: emerald[500],
    stateWarning: amber[500],
    stateDanger: rose[500],
    stateInfo: cyan[500],
  },
  amoled: {
    bgBase: "#000000",
    bgSubtle: "#050508",
    bgMuted: "#0a0b12",
    surfaceBase: "#080a10",
    surfaceRaised: "#0d1018",
    surfaceOverlay: "#111522",
    brandDefault: violet[400],
    brandEmphasis: violet[500],
    brandSubtle: "#1a1235",
    brandMuted: "#100c20",
    brandFg: "#000000",
    textPrimary: "#ffffff",
    textSecondary: "#d0d8f0",
    textTertiary: "#6070a0",
    textDisabled: "#303860",
    textInverse: "#000000",
    textBrand: violet[400],
    borderBase: "#181e30",
    borderMuted: "#0d1018",
    borderStrong: "#282e48",
    borderBrand: violet[400],
    stateSuccess: emerald[400],
    stateWarning: amber[400],
    stateDanger: rose[400],
    stateInfo: cyan[300],
  },
};

// ─── Spacing Scale ────────────────────────────────────────────────────────────

export const spacing = {
  0: 0,
  px: 1,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  48: 192,
  56: 224,
  64: 256,
} as const;

// ─── Radius ───────────────────────────────────────────────────────────────────

export const radius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 20,
  "3xl": 24,
  full: 9999,
} as const;

// ─── Font Sizes ───────────────────────────────────────────────────────────────

export const fontSize = {
  xs: { size: 12, lineHeight: 16 },
  sm: { size: 14, lineHeight: 20 },
  base: { size: 16, lineHeight: 24 },
  lg: { size: 18, lineHeight: 28 },
  xl: { size: 20, lineHeight: 28 },
  "2xl": { size: 24, lineHeight: 32 },
  "3xl": { size: 30, lineHeight: 36 },
  "4xl": { size: 36, lineHeight: 40 },
  "5xl": { size: 48, lineHeight: 48 },
  "6xl": { size: 60, lineHeight: 60 },
  "7xl": { size: 72, lineHeight: 72 },
} as const;

// ─── Font Weights ─────────────────────────────────────────────────────────────

export const fontWeight = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
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

// ─── Breakpoints (px) ─────────────────────────────────────────────────────────

export const breakpoints = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// ─── Animation ────────────────────────────────────────────────────────────────

export const duration = {
  instant: 0,
  fast: 100,
  normal: 200,
  slow: 300,
  slower: 500,
  slowest: 800,
} as const;

export const easing = {
  linear: "linear",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
} as const;

// ─── CSS Variable Generator ───────────────────────────────────────────────────

/**
 * Generate CSS custom property string for a theme.
 * Useful for injecting tokens into non-Tailwind environments.
 */
export function generateCSSVars(
  theme: ThemeTokens,
  prefix = "velora"
): string {
  const entries: string[] = [];
  const map: Record<keyof ThemeTokens, string> = {
    bgBase: "bg-base",
    bgSubtle: "bg-subtle",
    bgMuted: "bg-muted",
    surfaceBase: "surface-base",
    surfaceRaised: "surface-raised",
    surfaceOverlay: "surface-overlay",
    brandDefault: "brand-default",
    brandEmphasis: "brand-emphasis",
    brandSubtle: "brand-subtle",
    brandMuted: "brand-muted",
    brandFg: "brand-fg",
    textPrimary: "text-primary",
    textSecondary: "text-secondary",
    textTertiary: "text-tertiary",
    textDisabled: "text-disabled",
    textInverse: "text-inverse",
    textBrand: "text-brand",
    borderBase: "border-base",
    borderMuted: "border-muted",
    borderStrong: "border-strong",
    borderBrand: "border-brand",
    stateSuccess: "state-success",
    stateWarning: "state-warning",
    stateDanger: "state-danger",
    stateInfo: "state-info",
  };
  for (const [key, cssName] of Object.entries(map) as [keyof ThemeTokens, string][]) {
    entries.push(`  --${prefix}-${cssName}: ${theme[key]};`);
  }
  return `{\n${entries.join("\n")}\n}`;
}

/**
 * Convert a token object to a flat CSS string.
 * @example generateThemeCSS("dark", themes.dark)
 */
export function generateThemeCSS(themeName: string, theme: ThemeTokens): string {
  const selector =
    themeName === "light" ? ":root" : `[data-velora-theme="${themeName}"]`;
  return `${selector} ${generateCSSVars(theme)}`;
}

// ─── JSON export (for design tools like Figma) ────────────────────────────────

export function toFigmaTokens() {
  return {
    global: {
      violet: Object.fromEntries(
        Object.entries(violet).map(([k, v]) => [k, { value: v, type: "color" }])
      ),
      cyan: Object.fromEntries(
        Object.entries(cyan).map(([k, v]) => [k, { value: v, type: "color" }])
      ),
      slate: Object.fromEntries(
        Object.entries(slate).map(([k, v]) => [k, { value: v, type: "color" }])
      ),
      spacing: Object.fromEntries(
        Object.entries(spacing).map(([k, v]) => [k, { value: v, type: "sizing" }])
      ),
      radius: Object.fromEntries(
        Object.entries(radius).map(([k, v]) => [k, { value: v, type: "borderRadius" }])
      ),
    },
    ...Object.fromEntries(
      Object.entries(themes).map(([name, t]) => [
        name,
        Object.fromEntries(
          Object.entries(t).map(([k, v]) => [
            k,
            { value: v, type: "color" },
          ])
        ),
      ])
    ),
  };
}
