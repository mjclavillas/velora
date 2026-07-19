export const nextTemplate = {
  name: "Next.js",
  key: "next",
  files: [
    {
      path: "package.json",
      content: (name: string) => `{
  "name": "${name}",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@ui-velora/core": "latest",
    "framer-motion": "^11.5.4",
    "lucide-react": "^0.447.0",
    "next": "^15.0.0",
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
      path: "next.config.mjs",
      content: () => `/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
`,
    },
    {
      path: "postcss.config.mjs",
      content: () => `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
`,
    },
    {
      path: "tsconfig.json",
      content: () => `{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
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
    "css": "src/app/globals.css"
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
      path: "src/app/globals.css",
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
      path: "src/app/layout.tsx",
      content: () => `import type { Metadata } from "next";
import "./globals.css";
import { ThemeScript, ThemeProvider } from "@ui-velora/core";

export const metadata: Metadata = {
  title: "My App",
  description: "Built with Velora UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeScript defaultTheme="dark" />
        <ThemeProvider defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
`,
    },
    {
      path: "src/app/page.tsx",
      content: () => `"use client";

import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from "@ui-velora/core";
import { Rocket, ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
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
