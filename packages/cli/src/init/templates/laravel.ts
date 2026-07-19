export const laravelTemplate = {
  name: "Laravel",
  key: "laravel",
  files: [
    {
      path: "package.json",
      content: (name: string) => `{
  "name": "${name}",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "@ui-velora/core": "latest",
    "framer-motion": "^11.5.4",
    "lucide-react": "^0.447.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.3.2",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "laravel-vite-plugin": "^1.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.5.4",
    "vite": "^6.0.0"
  }
}`,
    },
    {
      path: "vite.config.ts",
      content: () => `import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    laravel({
      input: ["resources/css/app.css", "resources/js/app.tsx"],
      refresh: true,
    }),
    react(),
  ],
});
`,
    },
    {
      path: "tsconfig.json",
      content: () => `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["./resources/js/*"]
    }
  },
  "include": ["resources/js/**/*.ts", "resources/js/**/*.tsx"]
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
    "css": "resources/css/app.css"
  }
}`,
    },
    {
      path: "resources/js/lib/utils.ts",
      content: () => `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
`,
    },
    {
      path: "resources/css/app.css",
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
      path: "resources/js/app.tsx",
      content: () => `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeScript, ThemeProvider } from "@ui-velora/core";
import "../css/app.css";
import App from "./App";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <ThemeScript defaultTheme="dark" />
    <ThemeProvider defaultTheme="dark">
      <App />
    </ThemeProvider>
  </StrictMode>,
);
`,
    },
    {
      path: "resources/js/App.tsx",
      content: () => `import { Button, Card, CardContent, Badge } from "@ui-velora/core";
import { Rocket, ArrowRight, Sparkles } from "lucide-react";

export default function App() {
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
    {
      path: "resources/views/app.blade.php",
      content: () => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My App</title>
  @vite(['resources/css/app.css', 'resources/js/app.tsx'])
</head>
<body>
  <div id="app"></div>
</body>
</html>
`,
    },
  ],
};
