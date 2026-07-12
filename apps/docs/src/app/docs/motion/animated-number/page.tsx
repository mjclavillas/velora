import type { Metadata } from "next";
import {
  DocsPageHeader,
  DocsPageNav,
  DocSection,
  DocCodeBlock,
} from "@/components/DocsPage";
import { Separator } from "@velora/core";
import { ComponentPreview } from "@/components/ComponentPreview";
import { AnimatedNumber } from "@velora/motion";

export const metadata: Metadata = {
  title: "AnimatedNumber — Velora UI",
  description:
    "An animation component that smoothly transitions between numeric values with configurable formatting.",
};

export default function AnimatedNumberPage() {
  return (
    <>
      <DocsPageHeader
        title="AnimatedNumber"
        description="Smoothly animate between numeric values."
        badges={["Animation"]}
      />

      <DocSection title="Import">
        <DocCodeBlock
          code={`import { AnimatedNumber } from "@velora/motion";`}
          title="Import statement"
        />
      </DocSection>

      <DocSection title="Usage">
        <DocCodeBlock
          code={`import { useState } from "react";
import { AnimatedNumber } from "@velora/motion";

export function Counter() {
  const [value, setValue] = useState(0);

  return (
    <div>
      <AnimatedNumber
        value={value}
        duration={0.6}
        decimals={0}
        prefix="$"
        suffix=""
      />
      <button onClick={() => setValue(value + 100)}>Add $100</button>
    </div>
  );
}`}
          title="Basic usage"
        />
      </DocSection>

      <DocSection title="Demo">
        <ComponentPreview
          title="Animated number transitions"
          code={`<AnimatedNumber value={42} duration={0.8} />`}
        >
          <div className="space-y-2">
            <div className="text-3xl font-bold text-[var(--velora-text-brand)]">
              <AnimatedNumber value={42} duration={0.8} />
            </div>
            <div className="text-sm text-[var(--velora-text-tertiary)]">
              Page re-renders will animate between values
            </div>
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
              <code className="text-[var(--velora-text-brand)]">value</code> — The target
              numeric value to animate to. Type: <code>number</code>.
            </li>
            <li>
              <code className="text-[var(--velora-text-brand)]">duration</code> —
              Duration of the transition in seconds. Default: <code>0.8</code>.
            </li>
            <li>
              <code className="text-[var(--velora-text-brand)]">decimals</code> — Number
              of decimal places to display. Default: <code>0</code>.
            </li>
            <li>
              <code className="text-[var(--velora-text-brand)]">prefix</code> — String
              prepended to the number. Default: <code>""</code>.
            </li>
            <li>
              <code className="text-[var(--velora-text-brand)]">suffix</code> — String
              appended to the number. Default: <code>""</code>.
            </li>
          </ul>
          <p className="mt-3">
            <strong>Returns:</strong>
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
            <li>
              A text element displaying the animated numeric value with the specified
              formatting.
            </li>
          </ul>
        </div>
      </DocSection>

      <Separator className="my-8" />

      <DocsPageNav
        prev={{ title: "Typewriter", href: "/docs/motion/typewriter" }}
        next={{ title: "Variants", href: "/docs/motion/variants" }}
      />
    </>
  );
}
