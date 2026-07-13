# @ui-velora/core

Premium React UI component library with 40+ components, 8 built-in themes, and full TypeScript support.

## Install

```bash
npm install @ui-velora/core framer-motion class-variance-authority clsx tailwind-merge
```

## Setup

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

## Usage

```tsx
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
        <Input label="Invite by email" placeholder="colleague@company.com" type="email" />
      </CardContent>
      <CardFooter>
        <Button variant="default" onClick={() => success("Invitation sent!")}>
          Send invite
        </Button>
      </CardFooter>
    </Card>
  );
}
```

## Components

**Inputs & Forms** - Button, Input, Textarea, Select, Checkbox, Switch, Form

**Display** - Card, Badge, Avatar, Skeleton, Separator, Progress, DataTable

**Feedback** - Toast, Dialog, Spinner

**Navigation** - Tabs, Accordion, Sidebar, NavigationMenu, DropdownMenu, Command

**Overlays** - Popover, Tooltip, ScrollArea

## Hooks

```ts
import {
  useDebounce, useLocalStorage, useMediaQuery, useIsMobile,
  useClickOutside, useCountUp, useCopyToClipboard, useToggle,
  useKeyboard, useScrollLock,
} from "@ui-velora/core";
```

## Tailwind Plugin

```js
import { veloraTailwindPlugin } from "@ui-velora/core/tailwind";

export default {
  plugins: [veloraTailwindPlugin({ glass: true, gradients: true })],
};
```

## Themes

`light` `dark` `system` `amoled` `glass` `luxury` `cyberpunk` `neo-brutalism` `high-contrast` `minimal`

```css
[data-velora-theme="custom"] {
  --velora-brand-default: #your-color;
}
```

## License

MIT
