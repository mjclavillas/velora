export const astroTemplate = {
  name: "Astro",
  key: "astro",
  files: [
    {
      path: "package.json",
      content: (name: string) => `{
  "name": "${name}",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "@astrojs/react": "^4.0.0",
    "@astrojs/tailwind": "^6.0.0",
    "@ui-velora/core": "latest",
    "astro": "^5.0.0",
    "framer-motion": "^11.5.4",
    "lucide-react": "^0.447.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
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
      path: "astro.config.mjs",
      content: () => `import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/postcss";

export default defineConfig({
  integrations: [react()],
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
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
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
    "css": "src/styles/globals.css"
  }
}`,
    },
    {
      path: "src/lib/utils.ts",
      content: () => `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
`,
    },
    {
      path: "src/styles/globals.css",
      content: () => `@import "@ui-velora/core/styles";
@import "tailwindcss";

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
      path: "src/components/ThemeSetup.tsx",
      content: () => `"use client";

import { ThemeScript, ThemeProvider } from "@ui-velora/core";

export function ThemeSetup({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeScript defaultTheme="dark" />
      <ThemeProvider defaultTheme="dark">
        {children}
      </ThemeProvider>
    </>
  );
}
`,
    },
    {
      path: "src/layouts/Layout.astro",
      content: () => `---
import { ThemeSetup } from "../components/ThemeSetup";
import "../styles/globals.css";

interface Props {
  title?: string;
}

const { title = "My App" } = Astro.props;
---

<!doctype html>
<html lang="en" suppressHydrationWarning>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
  </head>
  <body>
    <ThemeSetup client:load>
      <slot />
    </ThemeSetup>
  </body>
</html>
`,
    },
    {
      path: "src/pages/index.astro",
      content: () => `---
import Layout from "../layouts/Layout.astro";
import Hero from "../components/Hero";
---

<Layout title="My App — Built with Velora">
  <Hero client:load />
</Layout>
`,
    },
    {
      path: "src/components/Hero.tsx",
      content: () => `"use client";

import { Button, Card, CardContent, Badge } from "@ui-velora/core";
import { Rocket, ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
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
