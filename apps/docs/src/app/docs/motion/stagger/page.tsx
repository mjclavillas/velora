import type { Metadata } from "next";
import {
  DocsPageHeader,
  DocsPageNav,
  DocSection,
  DocCodeBlock,
} from "@/components/DocsPage";
import { Separator } from "@velora/core";
import { ComponentPreview } from "@/components/ComponentPreview";
import { Stagger, StaggerItem } from "@velora/motion";

export const metadata: Metadata = {
  title: "Stagger — Velora UI",
  description:
    "Animation components that sequentially reveal child elements with configurable delays between each item.",
};

export default function StaggerPage() {
  return (
    <>
      <DocsPageHeader
        title="Stagger"
        description="Sequentially animate child elements into view."
        badges={["Animation"]}
      />

      <DocSection title="Import">
        <DocCodeBlock
          code={`import { Stagger, StaggerItem } from "@velora/motion";`}
          title="Import statement"
        />
      </DocSection>

      <DocSection title="Usage">
        <DocCodeBlock
          code={`import { Stagger, StaggerItem } from "@velora/motion";

export function List() {
  return (
    <Stagger staggerDelay={0.1}>
      <StaggerItem>Item one</StaggerItem>
      <StaggerItem>Item two</StaggerItem>
      <StaggerItem>Item three</StaggerItem>
    </Stagger>
  );
}`}
          title="Basic usage"
        />
      </DocSection>

      <DocSection title="Demo">
        <ComponentPreview
          title="Staggered list reveal"
          code={`<Stagger staggerDelay={0.15}>...</Stagger>`}
        >
          <Stagger staggerDelay={0.15} className="w-full max-w-sm">
            <StaggerItem><div className="rounded-lg bg-[var(--velora-bg-subtle)] border border-[var(--velora-border-base)] p-3 text-sm font-medium">Item one</div></StaggerItem>
            <StaggerItem><div className="rounded-lg bg-[var(--velora-bg-subtle)] border border-[var(--velora-border-base)] p-3 text-sm font-medium">Item two</div></StaggerItem>
            <StaggerItem><div className="rounded-lg bg-[var(--velora-bg-subtle)] border border-[var(--velora-border-base)] p-3 text-sm font-medium">Item three</div></StaggerItem>
            <StaggerItem><div className="rounded-lg bg-[var(--velora-bg-subtle)] border border-[var(--velora-border-base)] p-3 text-sm font-medium">Item four</div></StaggerItem>
          </Stagger>
        </ComponentPreview>
      </DocSection>

      <DocSection title="API Reference">
        <div className="text-sm text-[var(--velora-text-secondary)]">
          <p>
            <strong>Stagger Props:</strong>
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
            <li>
              <code className="text-[var(--velora-text-brand)]">staggerDelay</code> —
              Delay between each child in seconds. Default: <code>0.1</code>.
            </li>
            <li>
              <code className="text-[var(--velora-text-brand)]">initialDelay</code> —
              Delay before the first child animates in seconds. Default: <code>0</code>.
            </li>
            <li>
              <code className="text-[var(--velora-text-brand)]">once</code> — Whether the
              animation should only play once. Default: <code>true</code>.
            </li>
          </ul>
          <p className="mt-3">
            <strong>StaggerItem Props:</strong>
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
            <li>
              Extends <code>FadeIn</code> props. Inherits default animation behavior from
              its parent <code>Stagger</code>.
            </li>
          </ul>
          <p className="mt-3">
            <strong>Returns:</strong>
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
            <li>
              <code>Stagger</code> provides a container that manages timing.{" "}
              <code>StaggerItem</code> wraps each child and applies an individually
              delayed animation.
            </li>
          </ul>
        </div>
      </DocSection>

      <Separator className="my-8" />

      <DocsPageNav
        prev={{ title: "FadeIn", href: "/docs/motion/fade-in" }}
        next={{ title: "Reveal", href: "/docs/motion/reveal" }}
      />
    </>
  );
}
