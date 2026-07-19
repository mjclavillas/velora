# Velora UI

> Premium React UI Ecosystem — Beautiful, accessible, and theme-first.

[![npm version](https://img.shields.io/npm/v/@ui-velora/core.svg)](https://www.npmjs.com/package/@ui-velora/core)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## Overview

Velora is a production-ready React component library built for teams that care about design quality, developer experience, and accessibility. Every component is:

- **Theme-first** — 14 built-in themes (Dark, Light, AMOLED, Glass, Luxury, Cyberpunk, Neo Brutalism, High Contrast, Enterprise, Modern SaaS, Elegant Dark, Soft UI, Minimal, System) via CSS custom properties
- **Accessible** — WCAG 2.1 AA, Radix UI primitives, full keyboard navigation
- **Animated** — Framer Motion with spring physics, reduced-motion support, and layout animations
- **TypeScript-native** — strict types, CVA variant inference, complete prop documentation
- **Composable** — `asChild`, compound components, and slot-based composition throughout

## Packages

| Package | Description |
|---------|-------------|
| `@ui-velora/core` | Core component library (26 components, 16 hooks) |
| `@ui-velora/cli` | Scaffold and manage components via CLI |
| `@ui-velora/tokens` | Design tokens as JS/TS constants |
| `@ui-velora/motion` | Animation variants and utilities |

## Quick Start

```bash
# Install
npm install @ui-velora/core framer-motion class-variance-authority clsx tailwind-merge

# Or with CLI
npx velora init
```

```tsx
// app/layout.tsx
import { ThemeProvider, ThemeScript } from "@ui-velora/core";
import "@ui-velora/core/styles";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript defaultTheme="dark" />
      </head>
      <body>
        <ThemeProvider defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

```tsx
// components/example.tsx
import {
  Button,
  Card, CardHeader, CardTitle, CardContent, CardFooter,
  Badge,
  Input,
  useToast,
} from "@ui-velora/core";

export function ExampleCard() {
  const { success } = useToast();

  return (
    <Card variant="raised">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Team members</CardTitle>
          <Badge variant="success" dot>Active</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Input
          label="Invite by email"
          placeholder="colleague@company.com"
          type="email"
        />
      </CardContent>
      <CardFooter>
        <Button
          variant="default"
          onClick={() => success("Invitation sent!")}
        >
          Send invite
        </Button>
      </CardFooter>
    </Card>
  );
}
```

## Components

### Inputs & Forms
- `Button` — 14 variants, loading state, icon composition
- `Input` — Validation states, addons, character count, password toggle
- `Textarea` — Auto-resize, character count, validation
- `Select` — Searchable dropdown with groups and icons
- `Checkbox` — Animated check mark, indeterminate state
- `Switch` — Toggle with label and size variants
- `Form` — React Hook Form integration with field error propagation

### Display
- `Card` — 7 variants (default, raised, glass, premium, etc.)
- `Badge` — Status indicators with dots, icons, and dismiss
- `Avatar` / `AvatarGroup` — Image with gradient fallback, status dots
- `Skeleton` / `SkeletonCard` / `SkeletonTable` — Loading placeholders
- `Separator` — With optional label
- `Progress` — Linear and circular with variants
- `DataTable` — Sorting, selection, empty states, loading skeletons

### Feedback
- `Toast` / `useToast` — 5 variants, action support, position config
- `Dialog` — Animated modal with size variants
- `Spinner` / `SpinnerDots` / `SpinnerPulse` — Loading indicators

### Navigation
- `Tabs` — Pills and underline variants with animated indicator
- `Accordion` — 4 variants (default, bordered, cards, ghost)
- `Sidebar` — Collapsible with rail mode and mobile overlay
- `NavigationMenu` — Top-level nav with animated dropdowns
- `DropdownMenu` — Context menu with submenus, shortcuts, and radio items
- `Command` — ⌘K command palette with fuzzy search

### Overlays
- `Dialog` — Full-featured modal
- `Popover` — Floating content panel
- `Tooltip` — Hover contextual info
- `ScrollArea` — Custom cross-browser scrollbar

## Themes

```tsx
import { useTheme } from "@ui-velora/core";

function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      {themes.map((t) => (
        <option key={t} value={t}>{t}</option>
      ))}
    </select>
  );
}
```

Available themes: `light` `dark` `system` `amoled` `glass` `luxury` `enterprise` `modern-saas` `elegant-dark` `high-contrast` `cyberpunk` `neo-brutalism` `soft-ui` `minimal`

Custom theme via CSS variables:

```css
[data-velora-theme="custom"] {
  --velora-brand-default: #your-color;
  --velora-brand-emphasis: #your-color-darker;
  /* ... all semantic tokens */
}
```

## Hooks

```ts
import {
  useDebounce,              // Debounce any value
  useLocalStorage,          // Persistent state with SSR safety
  useMediaQuery,            // Responsive breakpoints
  useIsMobile,              // boolean — < 768px
  useIsTablet,              // boolean — 768px–1023px
  useIsDesktop,             // boolean — >= 1024px
  usePrefersDark,           // boolean — system dark mode preference
  usePrefersReducedMotion,  // boolean — reduced motion preference
  useClickOutside,          // Detect outside clicks
  useIntersectionObserver,  // Element visibility tracking
  useCountUp,               // Animated number counting
  useCopyToClipboard,       // Copy with reset timeout
  useToggle,                // Simple boolean toggle
  useKeyboard,              // Keyboard shortcut handler
  usePrevious,              // Track previous value
  useScrollLock,            // Lock body scroll
} from "@ui-velora/core";
```

## Tailwind Plugin

```js
// tailwind.config.ts
import { veloraTailwindPlugin } from "@ui-velora/core/tailwind";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  plugins: [
    veloraTailwindPlugin({
      glass: true,
      gradients: true,
    }),
  ],
};
```

Adds utilities: `glass`, `glass-sm`, `glass-lg`, `gradient-brand`, `gradient-text-brand`, `scrollbar-thin`, `scrollbar-none`, `animate-accordion-down/up`, and Tailwind color/shadow extensions.

## CLI

```bash
# Scaffold a new project (interactive prompts)
npx velora init

# Non-interactive — all flags
npx velora init --template next --name my-app --theme dark --package-manager pnpm

# Add specific components
velora add button card toast sidebar

# Add all components
velora add --all

# List available components
velora list

# Manage themes
velora theme list
velora theme set luxury

# Check setup
velora doctor
```

**Supported templates:** `next`, `vite`, `start` (TanStack Start), `react-router`, `astro`, `laravel`

## Monorepo Structure

```
velora/
├── packages/
│   ├── core/           # @ui-velora/core — main component library
│   │   └── src/
│   │       ├── components/
│   │       ├── theme/
│   │       ├── tokens/
│   │       ├── motion/
│   │       ├── hooks/
│   │       └── utils/
│   ├── cli/            # @ui-velora/cli — scaffold tool
│   ├── tokens/         # @ui-velora/tokens — design token constants
│   └── motion/         # @ui-velora/motion — animation utilities
├── apps/
│   ├── docs/           # Documentation site
│   └── playground/     # Component playground
└── tooling/
    ├── eslint/         # Shared ESLint config
    └── tsconfig/       # Shared TypeScript config
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). All contributions welcome.

## License

MIT © Velora Contributors
