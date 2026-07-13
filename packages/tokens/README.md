# @ui-velora/tokens

Design token constants in JS/TS format for the Velora UI ecosystem. Use these when you need raw values for JS animations, Canvas/WebGL rendering, or non-Tailwind environments.

## Install

```bash
npm install @ui-velora/tokens
```

## Usage

```ts
import {
  violet, cyan, slate, emerald, amber, rose, gold,
  themes, spacing, radius, fontSize, fontWeight,
  shadows, zIndex, breakpoints, duration, easing,
  generateCSSVars, generateThemeCSS, toFigmaTokens,
} from "@ui-velora/tokens";
```

## Exports

### Color Scales

```ts
violet   // 50-950
cyan     // 50-950
slate    // 50-950
emerald  // 50-950
amber    // 50-950
rose     // 50-950
gold     // 100-900
```

### Semantic Themes

```ts
import { themes, type ThemeTokens } from "@ui-velora/tokens";

themes.dark;    // { bgBase, bgSubtle, textPrimary, brandDefault, ... }
themes.light;
themes.amoled;
```

### Spacing, Radius, Typography

```ts
spacing[4];     // 16
radius.lg;      // 12
fontSize.xl;    // { size: 20, lineHeight: 28 }
fontWeight.bold; // 700
```

### Shadows & Z-Index

```ts
shadows.lg;
zIndex.modal;   // 1300
```

### Animation

```ts
duration.slow;  // 300
easing.spring;  // "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
```

### CSS Variable Generator

```ts
import { themes, generateThemeCSS } from "@ui-velora/tokens";

const css = generateThemeCSS("dark", themes.dark);
// "[data-velora-theme=\"dark\"] { --velora-bg-base: #0d1120; ... }"
```

### Figma Export

```ts
import { toFigmaTokens } from "@ui-velora/tokens";

const figmaTokens = toFigmaTokens();
// JSON-compatible structure for design tool import
```

## License

MIT
