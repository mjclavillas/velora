import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview } from "@/components/ComponentPreview";
import { Separator, Card, CardHeader, CardTitle, CardContent, Badge, Button } from "@velora/core";
import { Check, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Theming",
  description: "14 built-in themes with CSS custom properties, dark mode, SSR support, and smooth transitions.",
};

export default function ThemingPage() {
  return (
    <>
      <DocsPageHeader
        title="Theming"
        description="A token-driven theming system with 14 built-in themes, CSS custom properties, SSR-safe persistence, and zero flash of unstyled content."
        badges={["Guide"]}
      />

      <DocSection title="Setup">
        <p className="mb-3 text-sm text-[var(--velora-text-secondary)]">
          Wrap your root layout with <code>ThemeProvider</code> and inject{" "}
          <code>ThemeScript</code> in <code>&lt;head&gt;</code> to prevent FOUC.
        </p>
        <DocCodeBlock
          code={`import { ThemeProvider, ThemeScript } from "@velora/core";
import "@velora/core/styles";

export function Providers({ children }) {
  return (
    <>
      <ThemeScript defaultTheme="dark" />
      <ThemeProvider defaultTheme="dark">
        {children}
      </ThemeProvider>
    </>
  );
}`}
          title="Providers component"
        />
      </DocSection>

      <DocSection title="Theme Preview">
        <ComponentPreview
          title="Components adapt to the active theme"
          code={`<Card variant="raised">\n  <CardHeader>\n    <div className="flex items-center justify-between">\n      <CardTitle>Themed Card</CardTitle>\n      <Badge variant="info">14 themes</Badge>\n    </div>\n  </CardHeader>\n  <CardContent>\n    <Button variant="gradient">Switch theme</Button>\n  </CardContent>\n</Card>`}
          previewClassName="flex justify-center"
        >
          <Card variant="raised" className="w-full max-w-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Themed Card</CardTitle>
                <Badge variant="info">14 themes</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="gradient">Switch theme</Button>
            </CardContent>
          </Card>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Built-in Themes">
        <p className="mb-3 text-sm text-[var(--velora-text-secondary)]">
          Velora ships with 14 themes. Pass any theme name to{" "}
          <code>defaultTheme</code> or switch at runtime with{" "}
          <code>setTheme()</code>.
        </p>
        <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span><strong>light</strong> — Clean white base with balanced contrast</span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span><strong>dark</strong> — Rich dark surface with soft shadows</span>
          </li>
          <li className="flex gap-2">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
            <span><strong>system</strong> — Follows the OS <code>prefers-color-scheme</code> setting</span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span><strong>amoled</strong> — True black for AMOLED displays. Maximum battery savings</span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span><strong>glass</strong> — Frosted glass aesthetic with backdrop blur and transparency</span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span><strong>luxury</strong> — Dark palette with gold accents for premium interfaces</span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span><strong>cyberpunk</strong> — Neon highlights on dark surfaces. High-energy aesthetic</span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span><strong>neo-brutalism</strong> — Bold borders, solid shadows, and raw typography</span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span><strong>high-contrast</strong> — WCAG AAA compliant. Maximum readability</span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span><strong>enterprise</strong> — Professional blue-toned palette for business applications</span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span><strong>modern-saas</strong> — Bright, friendly palette for SaaS dashboards</span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span><strong>elegant-dark</strong> — Refined dark theme with muted, warm undertones</span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span><strong>soft-ui</strong> — Neumorphic style with inset shadows and soft surfaces</span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span><strong>minimal</strong> — Stripped-back. Near-zero visual weight</span>
          </li>
        </ul>
      </DocSection>

      <DocSection title="Using ThemeProvider">
        <DocCodeBlock
          code={`import { ThemeProvider, ThemeScript } from "@velora/core";
import "@velora/core/styles";

export function Providers({ children }) {
  return (
    <>
      <ThemeScript defaultTheme="dark" />
      <ThemeProvider defaultTheme="dark">
        {children}
      </ThemeProvider>
    </>
  );
}`}
          title="Providers component"
        />
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--velora-border)]">
                <th className="text-left py-2 font-medium text-[var(--velora-text-primary)]">Prop</th>
                <th className="text-left py-2 font-medium text-[var(--velora-text-primary)]">Type</th>
                <th className="text-left py-2 font-medium text-[var(--velora-text-primary)]">Default</th>
                <th className="text-left py-2 font-medium text-[var(--velora-text-primary)]">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--velora-border)]">
                <td className="py-2"><code>defaultTheme</code></td>
                <td className="py-2"><code>VeloraTheme</code></td>
                <td className="py-2"><code>&quot;system&quot;</code></td>
                <td className="py-2">Initial theme on first load</td>
              </tr>
              <tr className="border-b border-[var(--velora-border)]">
                <td className="py-2"><code>storageKey</code></td>
                <td className="py-2"><code>string</code></td>
                <td className="py-2"><code>&quot;velora-theme&quot;</code></td>
                <td className="py-2">localStorage key for persistence</td>
              </tr>
              <tr className="border-b border-[var(--velora-border)]">
                <td className="py-2"><code>enableTransitions</code></td>
                <td className="py-2"><code>boolean</code></td>
                <td className="py-2"><code>true</code></td>
                <td className="py-2">Adds a CSS transition class during theme switches</td>
              </tr>
              <tr className="border-b border-[var(--velora-border)]">
                <td className="py-2"><code>attribute</code></td>
                <td className="py-2"><code>string</code></td>
                <td className="py-2"><code>&quot;data-velora-theme&quot;</code></td>
                <td className="py-2">Data attribute applied to the root element</td>
              </tr>
              <tr>
                <td className="py-2"><code>themeRoot</code></td>
                <td className="py-2"><code>&quot;html&quot; | &quot;body&quot; | string</code></td>
                <td className="py-2"><code>&quot;html&quot;</code></td>
                <td className="py-2">Which element receives the theme attribute</td>
              </tr>
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="ThemeScript">
        <p className="mb-3 text-sm text-[var(--velora-text-secondary)]">
          <code>ThemeScript</code> is a small inline script that reads the
          persisted theme from <code>localStorage</code> and applies the correct{" "}
          <code>data-velora-theme</code> attribute before React hydrates. Place it
          in your root layout&apos;s <code>&lt;head&gt;</code> to prevent FOUC.
        </p>
        <DocCodeBlock
          code={`// app/layout.tsx
import { ThemeScript } from "@velora/core";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript defaultTheme="dark" />
      </head>
      <body>{children}</body>
    </html>
  );
}`}
          title="app/layout.tsx"
        />
      </DocSection>

      <DocSection title="Switching Themes">
        <p className="mb-3 text-sm text-[var(--velora-text-secondary)]">
          Use the <code>useTheme</code> hook inside any client component to read
          and change the active theme.
        </p>
        <DocCodeBlock
          code={`"use client";
import { useTheme } from "@velora/core";

export function ThemeSwitcher() {
  const { theme, resolvedTheme, setTheme, themes } = useTheme();

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      {themes.map((t) => (
        <option key={t} value={t}>{t}</option>
      ))}
    </select>
  );
}`}
          title="Theme switcher component"
        />
      </DocSection>

      <DocsPageNav
        prev={{ title: "Quick Start", href: "/docs/quick-start" }}
        next={{ title: "TypeScript", href: "/docs/typescript" }}
      />
    </>
  );
}
