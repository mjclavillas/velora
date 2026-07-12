import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview } from "@/components/ComponentPreview";
import { Separator, Button, Badge, Card, CardHeader, CardTitle, CardContent } from "@velora/core";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Installation",
  description: "Install Velora UI and its dependencies.",
};

export default function InstallationPage() {
  return (
    <>
      <DocsPageHeader
        title="Installation"
        description="Install the packages you need to start building with Velora UI."
        badges={["Guide"]}
      />

      <DocSection title="Core Package">
        <DocCodeBlock code={`npm install @velora/core`} title="Terminal" />
        <p className="mt-3 text-sm text-[var(--velora-text-secondary)]">
          This installs all 40+ components, hooks, theme system, CSS variables, and Tailwind utilities.
        </p>
      </DocSection>

      <DocSection title="Motion Package">
        <DocCodeBlock code={`npm install @velora/motion`} title="Terminal (optional)" />
        <p className="mt-3 text-sm text-[var(--velora-text-secondary)]">
          Additional animation components — FadeIn, Stagger, Reveal, Parallax, Typewriter, AnimatedNumber, MorphText.
        </p>
      </DocSection>

      <DocSection title="Peer Dependencies">
        <p className="mb-3 text-sm text-[var(--velora-text-secondary)]">
          Velora requires these as peer dependencies:
        </p>
        <DocCodeBlock
          code={`react >= 19.0.0
react-dom >= 19.0.0
framer-motion >= 11.0.0`}
          title="Required"
        />
      </DocSection>

      <DocSection title="What You Get">
        <ComponentPreview
          title="Components, hooks, and themes — all in one package"
          code={`<Card variant="raised" className="w-full max-w-sm">\n  <CardHeader>\n    <div className="flex items-center justify-between">\n      <CardTitle>Ready to build</CardTitle>\n      <Badge variant="success">Installed</Badge>\n    </div>\n  </CardHeader>\n  <CardContent>\n    <Button variant="gradient">Start building</Button>\n  </CardContent>\n</Card>`}
          previewClassName="flex justify-center"
        >
          <Card variant="raised" className="w-full max-w-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Ready to build</CardTitle>
                <Badge variant="success">Installed</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="gradient">Start building</Button>
            </CardContent>
          </Card>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Next Steps">
        <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span>Follow the <a href="/docs/getting-started" className="text-[var(--velora-text-brand)] underline underline-offset-2">Quick Start</a> guide</span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span>Learn about <a href="/docs/theming" className="text-[var(--velora-text-brand)] underline underline-offset-2">Theming</a></span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span>Browse <a href="/docs/components/button" className="text-[var(--velora-text-brand)] underline underline-offset-2">Components</a></span>
          </li>
        </ul>
      </DocSection>

      <DocsPageNav
        prev={{ title: "Introduction", href: "/docs" }}
        next={{ title: "Quick Start", href: "/docs/quick-start" }}
      />
    </>
  );
}
