import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview } from "@/components/ComponentPreview";
import { Button, Card, CardHeader, CardTitle, CardContent, Separator } from "@velora/core";
import { Check, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Getting Started",
  description: "Get up and running with Velora UI in minutes.",
};

export default function GettingStartedPage() {
  return (
    <>
      <DocsPageHeader
        title="Getting Started"
        description="Get up and running with Velora UI in under 5 minutes."
        badges={["Quick Start"]}
      />

      <DocSection title="1. Install">
        <DocCodeBlock code={`npm install @velora/core @velora/motion`} title="Terminal" />
      </DocSection>

      <DocSection title="2. Add the Theme">
        <p className="mb-3 text-sm text-[var(--velora-text-secondary)]">
          Wrap your app with <code>ThemeProvider</code> and inject the CSS variables.
          <code>ThemeScript</code> prevents FOUC on first load.
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

      <DocSection title="3. Start Building">
        <p className="mb-3 text-sm text-[var(--velora-text-secondary)]">
          Import any component from <code>@velora/core</code> and use it:
        </p>
        <ComponentPreview
          code={`<Card variant="raised">\n  <CardHeader>\n    <CardTitle>Your Profile</CardTitle>\n  </CardHeader>\n  <CardContent>\n    <Button variant="gradient">Save changes</Button>\n  </CardContent>\n</Card>`}
          previewClassName="flex justify-center"
        >
          <Card variant="raised" className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="gradient">Save changes</Button>
            </CardContent>
          </Card>
        </ComponentPreview>
      </DocSection>

      <Separator className="my-8" />

      <DocSection title="What's Included">
        <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span><strong>40+ Components</strong> — Button, Card, Dialog, DataTable, Sidebar, and more</span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span><strong>8 Themes</strong> — Dark, Light, AMOLED, Glass, Luxury, Cyberpunk, Neo Brutalism, High Contrast</span>
          </li>
          <li className="flex gap-2">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
            <span><strong>Spring Animations</strong> — Stagger, reveal, parallax, and reduced-motion support</span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span><strong>TypeScript Native</strong> — Strict types, CVA variant inference, zero <code>any</code> usage</span>
          </li>
        </ul>
      </DocSection>

      <DocsPageNav
        prev={{ title: "Quick Start", href: "/docs/quick-start" }}
        next={{ title: "Theming", href: "/docs/theming" }}
      />
    </>
  );
}
