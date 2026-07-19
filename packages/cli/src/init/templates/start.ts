export const startTemplate = {
  name: "TanStack Start",
  key: "start",
  files: [
    {
      path: "package.json",
      content: (name: string) => `{
  "name": "${name}",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vinxi dev",
    "build": "vinxi build",
    "start": "vinxi start"
  },
  "dependencies": {
    "@tanstack/react-router": "^1.80.0",
    "@tanstack/start": "^1.80.0",
    "@ui-velora/core": "latest",
    "framer-motion": "^11.5.4",
    "lucide-react": "^0.447.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "vinxi": "^0.5.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.3.2",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.5.4"
  }
}`,
    },
    {
      path: "app.config.ts",
      content: () => `import { defineConfig } from "@tanstack/start/config";
import tailwindcss from "@tailwindcss/postcss";

export default defineConfig({
  vite: {
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
  },
});
`,
    },
    {
      path: "tsconfig.json",
      content: () => `{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "paths": {
      "@/*": ["./app/*"]
    }
  },
  "include": ["app/**/*.ts", "app/**/*.tsx"]
}
`,
    },
    {
      path: "velora.config.json",
      content: (name: string, theme: string) => `{
  "version": "0.1.0",
  "theme": "${theme}",
  "components": [],
  "aliases": {
    "components": "@/components/ui",
    "utils": "@/lib/utils",
    "hooks": "@/hooks"
  },
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/styles/globals.css"
  }
}`,
    },
    {
      path: "app/lib/utils.ts",
      content: () => `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
`,
    },
    {
      path: "app/styles/globals.css",
      content: () => `@import "@ui-velora/core/styles";
@import "tailwindcss";

@source "../../../node_modules/@ui-velora/core/src";

@layer base {
  * {
    box-sizing: border-box;
  }

  body {
    background: var(--velora-bg-base);
    color: var(--velora-text-primary);
    font-family: var(--velora-font-sans);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background: rgba(128, 96, 255, 0.25);
    color: var(--velora-text-primary);
  }

  :focus-visible {
    outline: 2px solid var(--velora-brand-default);
    outline-offset: 2px;
  }
}
`,
    },
    {
      path: "app/routes/__root.tsx",
      content: () => `import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ThemeScript, ThemeProvider } from "@ui-velora/core";
import "../styles/globals.css";

const Route = createRootRoute({
  component: () => (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeScript defaultTheme="dark" />
        <ThemeProvider defaultTheme="dark">
          <Outlet />
        </ThemeProvider>
      </body>
    </html>
  ),
});

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <ThemeScript defaultTheme="dark" />
      <ThemeProvider defaultTheme="dark">
        <Outlet />
      </ThemeProvider>
    </>
  );
}
`,
    },
    {
      path: "app/routes/index.tsx",
      content: () => `import { createFileRoute } from "@tanstack/react-router";
import { Button, Card, CardContent, Badge } from "@ui-velora/core";
import { Rocket, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main className="min-h-dvh p-8 font-[var(--velora-font-sans)]">
      <div className="mx-auto max-w-2xl space-y-8">
        <Card variant="default" padding="lg">
          <CardContent className="space-y-4">
            <Badge variant="gradient" icon={<Rocket className="h-3 w-3" />}>
              Welcome
            </Badge>
            <h1 className="text-3xl font-bold text-[var(--velora-text-primary)]">
              Your app is ready
            </h1>
            <p className="text-[var(--velora-text-tertiary)]">
              Start building with Velora components. Edit this page to get started.
            </p>
            <div className="flex gap-3">
              <Button variant="gradient" leadingIcon={<Sparkles className="h-4 w-4" />}>
                Get Started
              </Button>
              <Button variant="outline" trailingIcon={<ArrowRight className="h-4 w-4" />}>
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
`,
    },
  ],
};
