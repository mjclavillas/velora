import type { Metadata } from "next";
import {
  DocsPageHeader,
  DocsPageNav,
  DocSection,
  DocCodeBlock,
} from "@/components/DocsPage";
import { Separator } from "@velora/core";
import { ComponentPreview } from "@/components/ComponentPreview";
import { FadeIn } from "@velora/motion";

export const metadata: Metadata = {
  title: "FadeIn — Velora UI",
  description:
    "An animation component that fades its child element in on mount with configurable direction and distance. Respects prefers-reduced-motion.",
};

export default function FadeInPage() {
  return (
    <>
      <DocsPageHeader
        title="FadeIn"
        description="Animate elements into view with fade and directional motion."
        badges={["Animation"]}
      />

      <DocSection title="Import">
        <DocCodeBlock
          code={`import { FadeIn } from "@velora/motion";`}
          title="Import statement"
        />
      </DocSection>

      <DocSection title="Usage">
        <DocCodeBlock
          code={`import { FadeIn } from "@velora/motion";

export function Hero() {
  return (
    <FadeIn delay={0.1} duration={0.5} direction="up" distance={20}>
      <h1>Welcome</h1>
    </FadeIn>
  );
}`}
          title="Basic usage"
        />
      </DocSection>

      <DocSection title="Demo">
        <ComponentPreview
          title="Fade in from different directions"
          code={`<FadeIn direction="up"><div>Up</div></FadeIn>\n<FadeIn direction="down"><div>Down</div></FadeIn>\n<FadeIn direction="left"><div>Left</div></FadeIn>\n<FadeIn direction="right"><div>Right</div></FadeIn>`}
          previewClassName="grid grid-cols-2 gap-4"
        >
          <FadeIn direction="up" delay={0}>
            <div className="rounded-lg bg-[var(--velora-bg-subtle)] border border-[var(--velora-border-base)] p-4 text-center text-sm font-medium">Up</div>
          </FadeIn>
          <FadeIn direction="down" delay={0.1}>
            <div className="rounded-lg bg-[var(--velora-bg-subtle)] border border-[var(--velora-border-base)] p-4 text-center text-sm font-medium">Down</div>
          </FadeIn>
          <FadeIn direction="left" delay={0.2}>
            <div className="rounded-lg bg-[var(--velora-bg-subtle)] border border-[var(--velora-border-base)] p-4 text-center text-sm font-medium">Left</div>
          </FadeIn>
          <FadeIn direction="right" delay={0.3}>
            <div className="rounded-lg bg-[var(--velora-bg-subtle)] border border-[var(--velora-border-base)] p-4 text-center text-sm font-medium">Right</div>
          </FadeIn>
        </ComponentPreview>
      </DocSection>

      <DocSection title="API Reference">
        <div className="text-sm text-[var(--velora-text-secondary)]">
          <p>
            <strong>Props:</strong>
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
            <li>
              <code className="text-[var(--velora-text-brand)]">delay</code> — Delay
              before the animation starts in seconds. Default: <code>0</code>.
            </li>
            <li>
              <code className="text-[var(--velora-text-brand)]">duration</code> —
              Duration of the animation in seconds. Default: <code>0.4</code>.
            </li>
            <li>
              <code className="text-[var(--velora-text-brand)]">direction</code> — The
              direction of motion. Options: <code>"up"</code>, <code>"down"</code>,{" "}
              <code>"left"</code>, <code>"right"</code>, <code>"none"</code>. Default:{" "}
              <code>"up"</code>.
            </li>
            <li>
              <code className="text-[var(--velora-text-brand)]">distance</code> — Distance
              of travel in pixels. Default: <code>25</code>.
            </li>
            <li>
              <code className="text-[var(--velora-text-brand)]">once</code> — Whether the
              animation should only play once. Default: <code>true</code>.
            </li>
          </ul>
          <p className="mt-3">
            <strong>Returns:</strong>
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
            <li>
              A wrapper element that animates its child content into view. Respects{" "}
              <code>prefers-reduced-motion</code> and renders statically for users who
              prefer reduced motion.
            </li>
          </ul>
        </div>
      </DocSection>

      <Separator className="my-8" />

      <DocsPageNav
        prev={{ title: "useKeyboard", href: "/docs/hooks/use-keyboard" }}
        next={{ title: "Stagger", href: "/docs/motion/stagger" }}
      />
    </>
  );
}
