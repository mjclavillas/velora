import type { Metadata } from "next";
import {
  DocsPageHeader,
  DocsPageNav,
  DocSection,
  DocCodeBlock,
} from "@/components/DocsPage";
import { Separator } from "@velora/core";
import { ComponentPreview } from "@/components/ComponentPreview";
import { Reveal } from "@velora/motion";

export const metadata: Metadata = {
  title: "Reveal — Velora UI",
  description:
    "An animation component that reveals child content using a variety of preset visual effects.",
};

export default function RevealPage() {
  return (
    <>
      <DocsPageHeader
        title="Reveal"
        description="Reveal content with preset animation effects."
        badges={["Animation"]}
      />

      <DocSection title="Import">
        <DocCodeBlock
          code={`import { Reveal } from "@velora/motion";`}
          title="Import statement"
        />
      </DocSection>

      <DocSection title="Usage">
        <DocCodeBlock
          code={`import { Reveal } from "@velora/motion";

export function Card() {
  return (
    <Reveal variant="slideUp" delay={0.2}>
      <div className="card">Content</div>
    </Reveal>
  );
}`}
          title="Basic usage"
        />
      </DocSection>

      <DocSection title="Demo">
        <ComponentPreview
          title="All reveal variants"
          code={`<Reveal variant="slideUp">...</Reveal>\n<Reveal variant="slideDown">...</Reveal>\n<Reveal variant="fade">...</Reveal>\n<Reveal variant="scaleIn">...</Reveal>\n<Reveal variant="blur">...</Reveal>\n<Reveal variant="popIn">...</Reveal>`}
          previewClassName="grid grid-cols-2 gap-4 sm:grid-cols-3"
        >
          <Reveal variant="slideUp" delay={0}><div className="rounded-lg bg-[var(--velora-bg-subtle)] border border-[var(--velora-border-base)] p-4 text-center text-sm font-medium">slideUp</div></Reveal>
          <Reveal variant="slideDown" delay={0.1}><div className="rounded-lg bg-[var(--velora-bg-subtle)] border border-[var(--velora-border-base)] p-4 text-center text-sm font-medium">slideDown</div></Reveal>
          <Reveal variant="fade" delay={0.2}><div className="rounded-lg bg-[var(--velora-bg-subtle)] border border-[var(--velora-border-base)] p-4 text-center text-sm font-medium">fade</div></Reveal>
          <Reveal variant="scaleIn" delay={0.3}><div className="rounded-lg bg-[var(--velora-bg-subtle)] border border-[var(--velora-border-base)] p-4 text-center text-sm font-medium">scaleIn</div></Reveal>
          <Reveal variant="blur" delay={0.4}><div className="rounded-lg bg-[var(--velora-bg-subtle)] border border-[var(--velora-border-base)] p-4 text-center text-sm font-medium">blur</div></Reveal>
          <Reveal variant="popIn" delay={0.5}><div className="rounded-lg bg-[var(--velora-bg-subtle)] border border-[var(--velora-border-base)] p-4 text-center text-sm font-medium">popIn</div></Reveal>
        </ComponentPreview>
      </DocSection>

      <DocSection title="API Reference">
        <div className="text-sm text-[var(--velora-text-secondary)]">
          <p>
            <strong>Props:</strong>
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
            <li>
              <code className="text-[var(--velora-text-brand)]">variant</code> — The
              animation preset. Options: <code>"slideUp"</code>,{" "}
              <code>"slideDown"</code>, <code>"fade"</code>, <code>"scaleIn"</code>,{" "}
              <code>"blur"</code>, <code>"popIn"</code>. Default:{" "}
              <code>"slideUp"</code>.
            </li>
            <li>
              <code className="text-[var(--velora-text-brand)]">delay</code> — Delay
              before the animation starts in seconds. Default: <code>0</code>.
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
              A wrapper element that reveals its children using the selected animation
              variant. Respects <code>prefers-reduced-motion</code>.
            </li>
          </ul>
        </div>
      </DocSection>

      <Separator className="my-8" />

      <DocsPageNav
        prev={{ title: "Stagger", href: "/docs/motion/stagger" }}
        next={{ title: "Parallax", href: "/docs/motion/parallax" }}
      />
    </>
  );
}
