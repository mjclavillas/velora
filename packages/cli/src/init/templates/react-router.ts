export const reactRouterTemplate = {
  name: "React Router",
  key: "react-router",
  files: [
    {
      path: "package.json",
      content: (name: string) => `{
  "name": "${name}",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "react-router dev",
    "build": "react-router build",
    "start": "react-router-serve ./build/server/index.js"
  },
  "dependencies": {
    "@react-router/node": "^7.0.0",
    "@react-router/serve": "^7.0.0",
    "@ui-velora/core": "latest",
    "framer-motion": "^11.5.4",
    "isbot": "^5.1.0",
    "lucide-react": "^0.447.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router": "^7.0.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.3.2",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.5.4",
    "vite": "^6.0.0",
    "vite-tsconfig-paths": "^5.0.0"
  }
}`,
    },
    {
      path: "react-router.config.ts",
      content: () => `import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
} satisfies Config;
`,
    },
    {
      path: "vite.config.ts",
      content: () => `import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/postcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
`,
    },
    {
      path: "tsconfig.json",
      content: () => `{
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".react-router/types/**/*"
  ],
  "compilerOptions": {
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "types": ["vite/client"],
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "rootDirs": [".", "./.react-router/types"],
    "paths": {
      "~/*": ["./app/*"]
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
    "css": "app/app.css"
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
      path: "app/app.css",
      content: () => `@import "@ui-velora/core/styles";
@import "tailwindcss";

@source "../../node_modules/@ui-velora/core/src";

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
      path: "app/root.tsx",
      content: () => `import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { ThemeScript, ThemeProvider } from "@ui-velora/core";
import type { Route } from "./+types/root";
import "./app.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeScript defaultTheme="dark" />
        <ThemeProvider defaultTheme="dark">
          {children}
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404
      ? "The requested page could not be found."
      : details;
  }

  return (
    <main className="min-h-dvh p-8">
      <h1 className="text-2xl font-bold">{message}</h1>
      <p className="mt-2 text-[var(--velora-text-tertiary)]">{details}</p>
    </main>
  );
}
`,
    },
    {
      path: "app/routes/home.tsx",
      content: () => `import type { Route } from "./+types/home";
import { Button, Card, CardContent, Badge } from "@ui-velora/core";
import { Rocket, ArrowRight, Sparkles } from "lucide-react";

export function meta() {
  return [
    { title: "My App" },
    { name: "description", content: "Built with Velora UI" },
  ];
}

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
    {
      path: "app/routes.ts",
      content: () => `import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
] satisfies RouteConfig;
`,
    },
  ],
};
