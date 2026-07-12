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
  title: "Design Tokens — Velora UI",
  description:
    "Token-based design system values for colors, spacing, border radius, and shadows available from @velora/tokens.",
};

export default function TokensPage() {
  return (
    <>
      <DocsPageHeader
        title="Design Tokens"
        description="Token-based design values for consistent theming."
        badges={["Theming"]}
      />

      <DocSection title="Import">
        <DocCodeBlock
          code={`import { colors, spacing, radius, shadows, typography } from "@velora/tokens";`}
          title="Import statement"
        />
      </DocSection>

      <DocSection title="Colors">
        <DocCodeBlock
          code={`const colors = {
  primary:    { 50: "#eff6ff", 100: "#dbeafe", ..., 500: "#3b82f6", ..., 900: "#1e3a5f" },
  neutral:    { 50: "#f8fafc", 100: "#f1f5f9", ..., 500: "#64748b", ..., 900: "#0f172a" },
  success:    { 500: "#22c55e" },
  warning:    { 500: "#f59e0b" },
  danger:     { 500: "#ef4444" },
  info:       { 500: "#3b82f6" },
};`}
          title="Color palette"
        />
      </DocSection>

      <DocSection title="Spacing & Radius">
        <DocCodeBlock
          code={`const spacing = { 0: "0px", 1: "4px", 2: "8px", 3: "12px", 4: "16px", 5: "20px", 6: "24px", 8: "32px", 10: "40px", 12: "48px", 16: "64px" };
const radius   = { none: "0px", sm: "4px", md: "8px", lg: "12px", xl: "16px", full: "9999px" };`}
          title="Spacing and radius tokens"
        />
      </DocSection>

      <DocSection title="Shadows & Typography">
        <DocCodeBlock
          code={`const shadows = {
  sm:  "0 1px 2px rgb(0 0 0 / 0.05)",
  md:  "0 4px 6px -1px rgb(0 0 0 / 0.1)",
  lg:  "0 10px 15px -3px rgb(0 0 0 / 0.1)",
  xl:  "0 20px 25px -5px rgb(0 0 0 / 0.1)",
};

const typography = {
  fontFamily: { sans: "Inter, sans-serif", mono: "JetBrains Mono, monospace" },
  fontSize:   { xs: "0.75rem", sm: "0.875rem", base: "1rem", lg: "1.125rem", xl: "1.25rem" },
  fontWeight: { normal: "400", medium: "500", semibold: "600", bold: "700" },
};`}
          title="Shadows and typography"
        />
      </DocSection>

      <DocSection title="Color Palette">
        <ComponentPreview
          title="Primary color palette"
          code={`<div className="grid grid-cols-5 gap-2">\n  {["50","100","200","300","400","500","600","700","800","900"].map(n => (\n    <div className={\`h-10 rounded bg-indigo-\${n}\`} />\n  ))}\n</div>`}
          previewClassName="w-full"
        >
          <div className="grid grid-cols-5 gap-2 w-full">
            {["50","100","200","300","400","500","600","700","800","900"].map(n => (
              <div key={n} className="flex flex-col items-center gap-1">
                <div className="h-10 w-full rounded bg-indigo-500" style={{ opacity: 1 - (parseInt(n) / 1200) + 0.2 }} />
                <span className="text-[10px] text-[var(--velora-text-tertiary)]">{n}</span>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </DocSection>

      <Separator className="my-8" />

      <DocsPageNav
        prev={{ title: "Variants", href: "/docs/motion/variants" }}
        next={{ title: "CSS Variables", href: "/docs/theming/css-variables" }}
      />
    </>
  );
}
