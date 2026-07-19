import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { Separator } from "@velora/core";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "CLI",
  description: "Scaffold and manage Velora UI projects from the command line.",
};

export default function CLIPage() {
  return (
    <>
      <DocsPageHeader
        title="CLI"
        description="Scaffold a new project with all Velora configuration pre-wired."
        badges={["Guide"]}
      />

      <DocSection title="Quick Start">
        <p className="mb-3 text-sm text-[var(--velora-text-secondary)]">
          Run the CLI to scaffold a new project interactively. It will prompt you for a framework,
          theme, and package manager — then generate all the files you need.
        </p>
        <DocCodeBlock code={`npx velora init`} title="Terminal" />
      </DocSection>

      <DocSection title="Interactive Mode">
        <p className="mb-3 text-sm text-[var(--velora-text-secondary)]">
          The CLI walks you through four prompts:
        </p>
        <DocCodeBlock
          code={`$ npx velora init

  Velora — Premium React UI Ecosystem

  ? Project name: my-portfolio
  ? Select a framework:
    1) Next.js
    2) Vite + React
    3) TanStack Start
    4) React Router
    5) Astro
    6) Laravel
  ? Select a default theme:
    1) light
    2) dark
    ...
  ? Package manager:
    1) npm
    2) pnpm
    3) yarn
    4) bun`}
          title="Terminal"
        />
      </DocSection>

      <DocSection title="CLI Flags">
        <p className="mb-3 text-sm text-[var(--velora-text-secondary)]">
          Skip the prompts by passing flags directly — useful for CI, scripts, or when you already know what you want.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--velora-border-base)]">
                <th className="px-4 py-2 text-left font-medium text-[var(--velora-text-secondary)]">Flag</th>
                <th className="px-4 py-2 text-left font-medium text-[var(--velora-text-secondary)]">Description</th>
                <th className="px-4 py-2 text-left font-medium text-[var(--velora-text-secondary)]">Default</th>
              </tr>
            </thead>
            <tbody className="text-[var(--velora-text-tertiary)]">
              <tr className="border-b border-[var(--velora-border-base)]">
                <td className="px-4 py-2 font-mono text-xs">--template &lt;name&gt;</td>
                <td className="px-4 py-2">Framework template to use</td>
                <td className="px-4 py-2">Prompts</td>
              </tr>
              <tr className="border-b border-[var(--velora-border-base)]">
                <td className="px-4 py-2 font-mono text-xs">--name &lt;name&gt;</td>
                <td className="px-4 py-2">Project name / directory</td>
                <td className="px-4 py-2">Prompts</td>
              </tr>
              <tr className="border-b border-[var(--velora-border-base)]">
                <td className="px-4 py-2 font-mono text-xs">--theme &lt;theme&gt;</td>
                <td className="px-4 py-2">Default theme</td>
                <td className="px-4 py-2">dark</td>
              </tr>
              <tr className="border-b border-[var(--velora-border-base)]">
                <td className="px-4 py-2 font-mono text-xs">--package-manager &lt;pm&gt;</td>
                <td className="px-4 py-2">Package manager to use</td>
                <td className="px-4 py-2">Prompts</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">--no-install</td>
                <td className="px-4 py-2">Skip dependency installation</td>
                <td className="px-4 py-2">false</td>
              </tr>
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="Supported Frameworks">
        <p className="mb-3 text-sm text-[var(--velora-text-secondary)]">
          Each template generates a complete, working project with Velora fully configured.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--velora-border-base)]">
                <th className="px-4 py-2 text-left font-medium text-[var(--velora-text-secondary)]">Framework</th>
                <th className="px-4 py-2 text-left font-medium text-[var(--velora-text-secondary)]">Template Key</th>
                <th className="px-4 py-2 text-left font-medium text-[var(--velora-text-secondary)]">What&apos;s Included</th>
              </tr>
            </thead>
            <tbody className="text-[var(--velora-text-tertiary)]">
              <tr className="border-b border-[var(--velora-border-base)]">
                <td className="px-4 py-2 font-medium text-[var(--velora-text-primary)]">Next.js</td>
                <td className="px-4 py-2 font-mono text-xs">next</td>
                <td className="px-4 py-2">App Router, Tailwind v4, TypeScript, globals.css, layout, demo page</td>
              </tr>
              <tr className="border-b border-[var(--velora-border-base)]">
                <td className="px-4 py-2 font-medium text-[var(--velora-text-primary)]">Vite + React</td>
                <td className="px-4 py-2 font-mono text-xs">vite</td>
                <td className="px-4 py-2">React plugin, Tailwind v4, TypeScript, index.html, main.tsx, demo page</td>
              </tr>
              <tr className="border-b border-[var(--velora-border-base)]">
                <td className="px-4 py-2 font-medium text-[var(--velora-text-primary)]">TanStack Start</td>
                <td className="px-4 py-2 font-mono text-xs">start</td>
                <td className="px-4 py-2">File-based routing, Tailwind v4, TypeScript, app.config, demo page</td>
              </tr>
              <tr className="border-b border-[var(--velora-border-base)]">
                <td className="px-4 py-2 font-medium text-[var(--velora-text-primary)]">React Router</td>
                <td className="px-4 py-2 font-mono text-xs">react-router</td>
                <td className="px-4 py-2">Framework mode v7, Tailwind v4, TypeScript, routes, demo page</td>
              </tr>
              <tr className="border-b border-[var(--velora-border-base)]">
                <td className="px-4 py-2 font-medium text-[var(--velora-text-primary)]">Astro</td>
                <td className="px-4 py-2 font-mono text-xs">astro</td>
                <td className="px-4 py-2">React integration, Tailwind v4, TypeScript, Layout.astro, demo page</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-[var(--velora-text-primary)]">Laravel</td>
                <td className="px-4 py-2 font-mono text-xs">laravel</td>
                <td className="px-4 py-2">Vite + React, Tailwind v4, Blade template, resources/ structure, demo page</td>
              </tr>
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="What Each Template Creates">
        <p className="mb-3 text-sm text-[var(--velora-text-secondary)]">
          Every template generates these files, adapted to the framework conventions:
        </p>
        <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span><code>package.json</code> — framework + <code>@ui-velora/core</code> + all peer deps</span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span><code>velora.config.json</code> — chosen theme and alias configuration</span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span>Global CSS — <code>@import &quot;@ui-velora/core/styles&quot;</code> + Tailwind v4 setup</span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span>Root layout — <code>ThemeScript</code> + <code>ThemeProvider</code> wired in</span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span><code>lib/utils.ts</code> — <code>cn()</code> utility (clsx + tailwind-merge)</span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span>Starter page — demo using Button, Card, Badge so you see it working immediately</span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span>Framework config — next.config, vite.config, astro.config, etc.</span>
          </li>
        </ul>
      </DocSection>

      <DocSection title="Non-Interactive Usage">
        <p className="mb-3 text-sm text-[var(--velora-text-secondary)]">
          Perfect for scripts, CI pipelines, or when you want to skip prompts:
        </p>
        <DocCodeBlock
          code={`# Scaffold a Next.js project with pnpm, no prompts
npx velora init --template next --name my-app --theme dark --package-manager pnpm

# Scaffold and skip dep install (install manually later)
npx velora init --template vite --name my-app --no-install`}
          title="Terminal"
        />
      </DocSection>

      <DocSection title="After Scaffolding">
        <DocCodeBlock
          code={`cd my-app
npm install    # if you used --no-install
npm run dev`}
          title="Terminal"
        />
        <p className="mt-3 text-sm text-[var(--velora-text-secondary)]">
          Then add more components as needed:
        </p>
        <DocCodeBlock code={`npx velora add button card badge toast`} title="Terminal" />
      </DocSection>

      <Separator className="my-8" />

      <DocSection title="Other Commands">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--velora-border-base)]">
                <th className="px-4 py-2 text-left font-medium text-[var(--velora-text-secondary)]">Command</th>
                <th className="px-4 py-2 text-left font-medium text-[var(--velora-text-secondary)]">Description</th>
              </tr>
            </thead>
            <tbody className="text-[var(--velora-text-tertiary)]">
              <tr className="border-b border-[var(--velora-border-base)]">
                <td className="px-4 py-2 font-mono text-xs">velora add [components...]</td>
                <td className="px-4 py-2">Add components to your project</td>
              </tr>
              <tr className="border-b border-[var(--velora-border-base)]">
                <td className="px-4 py-2 font-mono text-xs">velora list</td>
                <td className="px-4 py-2">List all available components</td>
              </tr>
              <tr className="border-b border-[var(--velora-border-base)]">
                <td className="px-4 py-2 font-mono text-xs">velora theme [set|list]</td>
                <td className="px-4 py-2">Manage themes</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">velora doctor</td>
                <td className="px-4 py-2">Check your Velora setup for issues</td>
              </tr>
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocsPageNav
        prev={{ title: "Installation", href: "/docs/installation" }}
        next={{ title: "Quick Start", href: "/docs/quick-start" }}
      />
    </>
  );
}
