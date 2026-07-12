import type { Metadata } from "next";
import {
  DocsPageHeader,
  DocsPageNav,
  DocSection,
  DocCodeBlock,
} from "@/components/DocsPage";
import { ComponentPreview } from "@/components/ComponentPreview";
import { Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "CSS Variables — Velora UI",
  description:
    "Complete reference of all --velora-* custom CSS properties organized by category.",
};

export default function CSSVariablesPage() {
  return (
    <>
      <DocsPageHeader
        title="CSS Variables"
        description="All --velora-* custom properties organized by category."
        badges={["Theming"]}
      />

      <DocSection title="Colors">
        <DocCodeBlock
          code={`:root {
  --velora-bg-primary:       #ffffff;
  --velora-bg-secondary:     #f8fafc;
  --velora-bg-tertiary:      #f1f5f9;
  --velora-text-primary:     #0f172a;
  --velora-text-secondary:   #64748b;
  --velora-text-brand:       #3b82f6;
  --velora-border:           #e2e8f0;
  --velora-border-hover:     #cbd5e1;
}`}
          title="Color variables"
        />
      </DocSection>

      <DocSection title="Spacing">
        <DocCodeBlock
          code={`:root {
  --velora-spacing-1:  4px;
  --velora-spacing-2:  8px;
  --velora-spacing-3:  12px;
  --velora-spacing-4:  16px;
  --velora-spacing-5:  20px;
  --velora-spacing-6:  24px;
  --velora-spacing-8:  32px;
  --velora-spacing-10: 40px;
}`}
          title="Spacing variables"
        />
      </DocSection>

      <DocSection title="Radius">
        <DocCodeBlock
          code={`:root {
  --velora-radius-sm:   4px;
  --velora-radius-md:   8px;
  --velora-radius-lg:   12px;
  --velora-radius-xl:   16px;
  --velora-radius-full: 9999px;
}`}
          title="Radius variables"
        />
      </DocSection>

      <DocSection title="Shadows">
        <DocCodeBlock
          code={`:root {
  --velora-shadow-sm: 0 1px 2px rgb(0 0 0 / 0.05);
  --velora-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --velora-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --velora-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}`}
          title="Shadow variables"
        />
      </DocSection>

      <DocSection title="Focus">
        <DocCodeBlock
          code={`:root {
  --velora-ring-color:       #3b82f6;
  --velora-ring-offset:      2px;
  --velora-ring-width:       2px;
}`}
          title="Focus ring variables"
        />
      </DocSection>

      <DocSection title="Live Variables">
        <ComponentPreview
          title="CSS variables in use"
          code={`<div style={{ background: "var(--velora-bg-primary)", color: "var(--velora-text-primary)", border: "1px solid var(--velora-border)" }}>\n  <p>Primary background</p>\n  <p style={{ color: "var(--velora-text-secondary)" }}>Secondary text</p>\n  <p style={{ color: "var(--velora-text-brand)" }}>Brand text</p>\n</div>`}
          previewClassName="w-full"
        >
          <div className="space-y-3 w-full">
            <div className="rounded-lg border border-[var(--velora-border)] p-4 space-y-2">
              <p className="text-sm font-medium text-[var(--velora-text-primary)]">Primary background with primary text</p>
              <p className="text-sm text-[var(--velora-text-secondary)]">Secondary text for descriptions</p>
              <p className="text-sm font-medium text-[var(--velora-text-brand)]">Brand-colored text for links and accents</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded border border-[var(--velora-border)] p-2 text-center text-xs">
                <div className="mb-1 h-4 rounded bg-[var(--velora-bg-base)]" />
                bg-primary
              </div>
              <div className="rounded border border-[var(--velora-border)] p-2 text-center text-xs">
                <div className="mb-1 h-4 rounded bg-[var(--velora-bg-subtle)]" />
                bg-secondary
              </div>
              <div className="rounded border border-[var(--velora-border)] p-2 text-center text-xs">
                <div className="mb-1 h-4 rounded bg-[var(--velora-bg-tertiary)]" />
                bg-tertiary
              </div>
            </div>
          </div>
        </ComponentPreview>
      </DocSection>

      <Separator className="my-8" />

      <DocsPageNav
        prev={{ title: "Tokens", href: "/docs/theming/tokens" }}
        next={{ title: "Custom Themes", href: "/docs/theming/custom-themes" }}
      />
    </>
  );
}
