import type { Metadata } from "next";
import {
  DocsPageHeader,
  DocsPageNav,
  DocSection,
  DocCodeBlock,
} from "@/components/DocsPage";
import { Separator } from "@velora/core";
import { ComponentPreview } from "@/components/ComponentPreview";
import { Parallax } from "@velora/motion";

export const metadata: Metadata = {
  title: "Parallax — Velora UI",
  description:
    "An animation component that creates a parallax scrolling effect on its child element.",
};

export default function ParallaxPage() {
  return (
    <>
      <DocsPageHeader
        title="Parallax"
        description="Create parallax scrolling effects on elements."
        badges={["Animation"]}
      />

      <DocSection title="Import">
        <DocCodeBlock
          code={`import { Parallax } from "@velora/motion";`}
          title="Import statement"
        />
      </DocSection>

      <DocSection title="Usage">
        <DocCodeBlock
          code={`import { Parallax } from "@velora/motion";

export function Hero() {
  return (
    <Parallax speed={0.5}>
      <img src="/hero.jpg" alt="Hero" />
    </Parallax>
  );
}`}
          title="Basic usage"
        />
      </DocSection>

      <DocSection title="Demo">
        <ComponentPreview
          title="Parallax scrolling effect"
          code={`<Parallax speed={0.5}>...</Parallax>`}
        >
          <div className="h-40 overflow-hidden rounded-lg border border-[var(--velora-border-base)] bg-[var(--velora-bg-subtle)]">
            <Parallax speed={0.8}>
              <div className="flex h-40 items-center justify-center">
                <div className="rounded-lg bg-[var(--velora-bg-tertiary)] border border-[var(--velora-border-base)] px-6 py-3 text-sm font-medium">
                  Scroll to see parallax effect
                </div>
              </div>
            </Parallax>
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="API Reference">
        <div className="text-sm text-[var(--velora-text-secondary)]">
          <p>
            <strong>Props:</strong>
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
            <li>
              <code className="text-[var(--velora-text-brand)]">speed</code> — Parallax
              speed multiplier. Higher values create more pronounced movement. Type:{" "}
              <code>number</code>. Default: <code>0.5</code>.
            </li>
          </ul>
          <p className="mt-3">
            <strong>Returns:</strong>
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
            <li>
              A wrapper element that translates its child vertically based on scroll
              position.
            </li>
          </ul>
        </div>
      </DocSection>

      <Separator className="my-8" />

      <DocsPageNav
        prev={{ title: "Reveal", href: "/docs/motion/reveal" }}
        next={{ title: "Typewriter", href: "/docs/motion/typewriter" }}
      />
    </>
  );
}
