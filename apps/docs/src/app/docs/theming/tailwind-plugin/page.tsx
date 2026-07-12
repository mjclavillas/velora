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
  title: "Tailwind Plugin — Velora UI",
  description:
    "Integration guide for the Velora Tailwind plugin, enabling design tokens as Tailwind utilities.",
};

export default function TailwindPluginPage() {
  return (
    <>
      <DocsPageHeader
        title="Tailwind Plugin"
        description="Integrate Velora design tokens with Tailwind CSS."
        badges={["Theming"]}
      />

      <DocSection title="Setup">
        <DocCodeBlock
          code={`import type { Config } from "tailwindcss";
import { veloraPlugin } from "@velora/tailwind";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [veloraPlugin()],
} satisfies Config;`}
          title="tailwind.config.ts"
        />
      </DocSection>

      <DocSection title="Generated Utilities">
        <DocCodeBlock
          code={`<!-- Color utilities -->
<div class="bg-velora-primary text-velora-text">
  <p class="text-velora-muted">Muted text</p>
  <hr class="border-velora-border" />
</div>

<!-- Spacing utilities -->
<div class="p-velora-4 m-velora-2">

<!-- Radius utilities -->
<div class="rounded-velora-md">

<!-- Shadow utilities -->
<div class="shadow-velora-lg">`}
          title="Utility class examples"
        />
      </DocSection>

      <DocSection title="CSS Variable Mapping">
        <DocCodeBlock
          code={`bg-velora-*     → background-color: var(--velora-bg-*)
text-velora-*   → color: var(--velora-text-*)
border-velora-* → border-color: var(--velora-border*)
p-velora-*      → padding: var(--velora-spacing-*)
rounded-velora-*→ border-radius: var(--velora-radius-*)
shadow-velora-* → box-shadow: var(--velora-shadow-*)`}
          title="Token to utility mapping"
        />
      </DocSection>

      <DocSection title="Utilities in Action">
        <ComponentPreview
          title="Generated utility classes"
          code={`<div className="rounded-velora-md bg-velora-primary p-velora-4 text-velora-text">\n  <p className="text-velora-muted">Muted text</p>\n</div>`}
          previewClassName="w-full"
        >
          <div className="w-full space-y-3">
            <div className="rounded-lg bg-[var(--velora-bg-subtle)] border border-[var(--velora-border-base)] p-4">
              <p className="text-sm font-medium text-[var(--velora-text-primary)]">Background utilities</p>
              <div className="mt-2 flex gap-2">
                <div className="rounded bg-[var(--velora-bg-base)] border border-[var(--velora-border-base)] px-3 py-1 text-xs">bg-primary</div>
                <div className="rounded bg-[var(--velora-bg-subtle)] border border-[var(--velora-border-base)] px-3 py-1 text-xs">bg-secondary</div>
                <div className="rounded bg-[var(--velora-bg-tertiary)] border border-[var(--velora-border-base)] px-3 py-1 text-xs">bg-tertiary</div>
              </div>
            </div>
            <div className="rounded-lg bg-[var(--velora-bg-subtle)] border border-[var(--velora-border-base)] p-4">
              <p className="text-sm font-medium text-[var(--velora-text-primary)]">Text utilities</p>
              <div className="mt-2 flex gap-3">
                <span className="text-xs text-[var(--velora-text-primary)]">text-primary</span>
                <span className="text-xs text-[var(--velora-text-secondary)]">text-secondary</span>
                <span className="text-xs text-[var(--velora-text-brand)]">text-brand</span>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </DocSection>

      <Separator className="my-8" />

      <DocsPageNav
        prev={{ title: "Custom Themes", href: "/docs/theming/custom-themes" }}
      />
    </>
  );
}
