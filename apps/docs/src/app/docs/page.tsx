import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview } from "@/components/ComponentPreview";
import { Button, Card, CardHeader, CardTitle, CardContent, Separator } from "@velora/core";
import { Check, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Introduction",
  description: "Velora UI — A premium React UI component library.",
};

export default function DocsIntroPage() {
  return (
    <>
      <DocsPageHeader
        title="Introduction"
        description="A premium React UI component library built with Radix UI, Framer Motion, and Tailwind CSS. Designed for accessible, themeable, production-grade interfaces."
      />

      <DocSection title="What is Velora">
        <p className="text-sm text-[var(--velora-text-secondary)] leading-relaxed max-w-2xl">
          Velora UI provides 40+ production-ready components, 8 built-in themes,
          and first-class TypeScript support. Built on Radix UI primitives for
          accessibility and Framer Motion for fluid animations.
        </p>
      </DocSection>

      <DocSection title="Features">
        <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span><strong>40+ components</strong> — Button, Card, Dialog, DataTable, Sidebar, and more</span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span><strong>8 built-in themes</strong> — Dark, Light, AMOLED, Glass, Luxury, Cyberpunk, Neo Brutalism, High Contrast</span>
          </li>
          <li className="flex gap-2">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
            <span><strong>Framer Motion first</strong> — Spring physics, stagger, reveal, parallax, and reduced-motion support</span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span><strong>WCAG 2.1 AA</strong> — Radix UI primitives, ARIA labels, keyboard navigation, focus management</span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span><strong>TypeScript native</strong> — Strict types, CVA variant inference, zero <code>any</code></span>
          </li>
        </ul>
      </DocSection>

      <DocSection title="Quick Example">
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

      <DocsPageNav next={{ title: "Installation", href: "/docs/installation" }} />
    </>
  );
}
