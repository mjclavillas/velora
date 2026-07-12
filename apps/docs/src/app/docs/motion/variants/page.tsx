import type { Metadata } from "next";
import {
  DocsPageHeader,
  DocsPageNav,
  DocSection,
  DocCodeBlock,
} from "@/components/DocsPage";
import { Separator } from "@velora/core";
import { ComponentPreview } from "@/components/ComponentPreview";

export const metadata: Metadata = {
  title: "Variants — Velora UI",
  description:
    "Reference for animation presets including spring configurations, tween easings, and all variant definitions.",
};

export default function VariantsPage() {
  return (
    <>
      <DocsPageHeader
        title="Variants"
        description="Animation preset reference for springs, tweens, and variant definitions."
        badges={["Animation"]}
      />

      <DocSection title="Import">
        <DocCodeBlock
          code={`import { springs, tweens, fadeIn, slideUp, slideDown, scaleIn, blur, popIn } from "@velora/motion";`}
          title="Import statement"
        />
      </DocSection>

      <DocSection title="Springs">
        <DocCodeBlock
          code={`const springs = {
  default: { type: "spring", stiffness: 100, damping: 10 },
  gentle:  { type: "spring", stiffness: 120, damping: 14 },
  snappy:  { type: "spring", stiffness: 200, damping: 20 },
  bouncy:  { type: "spring", stiffness: 260, damping: 10 },
  stiff:   { type: "spring", stiffness: 300, damping: 30 },
};`}
          title="Spring presets"
        />
      </DocSection>

      <DocSection title="Tweens">
        <DocCodeBlock
          code={`const tweens = {
  linear:     "linear",
  easeIn:     "easeIn",
  easeOut:    "easeOut",
  easeInOut:  "easeInOut",
  brisk:      [0.25, 0.1, 0.25, 1],
  smooth:     [0.4, 0, 0.2, 1],
};`}
          title="Tween presets"
        />
      </DocSection>

      <DocSection title="Demo">
        <ComponentPreview
          title="Spring presets as visual reference"
          code={`import { springs } from "@velora/motion";\n\n// springs.snappy → { type: "spring", stiffness: 500, damping: 35 }\n// springs.smooth → { type: "spring", stiffness: 300, damping: 35 }\n// springs.bouncy → { type: "spring", stiffness: 400, damping: 20 }\n// springs.gentle → { type: "spring", stiffness: 200, damping: 30, mass: 0.8 }\n// springs.stiff  → { type: "spring", stiffness: 600, damping: 40 }`}
          previewClassName="w-full"
        >
          <div className="grid grid-cols-2 gap-3 w-full sm:grid-cols-3 lg:grid-cols-5">
            {[
              { name: "snappy", stiffness: 500, damping: 35 },
              { name: "smooth", stiffness: 300, damping: 35 },
              { name: "bouncy", stiffness: 400, damping: 20 },
              { name: "gentle", stiffness: 200, damping: 30 },
              { name: "stiff", stiffness: 600, damping: 40 },
            ].map((s) => (
              <div key={s.name} className="rounded-lg border border-[var(--velora-border-base)] bg-[var(--velora-bg-subtle)] p-3 text-center">
                <div className="text-xs font-semibold text-[var(--velora-text-brand)]">{s.name}</div>
                <div className="mt-1 text-[10px] text-[var(--velora-text-tertiary)]">k={s.stiffness} d={s.damping}</div>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Variants">
        <DocCodeBlock
          code={`const fadeIn    = { initial: { opacity: 0 }, animate: { opacity: 1 } };
const slideUp   = { initial: { opacity: 0, y: 20 },  animate: { opacity: 1, y: 0 } };
const slideDown = { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 } };
const scaleIn   = { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 } };
const blur      = { initial: { opacity: 0, filter: "blur(10px)" }, animate: { opacity: 1, filter: "blur(0px)" } };
const popIn     = { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } };`}
          title="Variant presets"
        />
      </DocSection>

      <Separator className="my-8" />

      <DocsPageNav
        prev={{ title: "AnimatedNumber", href: "/docs/motion/animated-number" }}
        next={{ title: "Design Tokens", href: "/docs/theming/tokens" }}
      />
    </>
  );
}
