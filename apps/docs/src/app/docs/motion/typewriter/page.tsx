import type { Metadata } from "next";
import {
  DocsPageHeader,
  DocsPageNav,
  DocSection,
  DocCodeBlock,
} from "@/components/DocsPage";
import { Separator } from "@velora/core";
import { ComponentPreview } from "@/components/ComponentPreview";
import { Typewriter } from "@velora/motion";

export const metadata: Metadata = {
  title: "Typewriter — Velora UI",
  description:
    "An animation component that types out text character by character with support for multiple strings and looping.",
};

export default function TypewriterPage() {
  return (
    <>
      <DocsPageHeader
        title="Typewriter"
        description="Type out text character by character with animation."
        badges={["Animation"]}
      />

      <DocSection title="Import">
        <DocCodeBlock
          code={`import { Typewriter } from "@velora/motion";`}
          title="Import statement"
        />
      </DocSection>

      <DocSection title="Usage">
        <DocCodeBlock
          code={`import { Typewriter } from "@velora/motion";

export function Hero() {
  return (
    <Typewriter
      text={["Hello, world!", "Welcome to Velora UI"]}
      speed={80}
      deleteSpeed={40}
      pauseDuration={1500}
      loop
    />
  );
}`}
          title="Basic usage"
        />
      </DocSection>

      <DocSection title="Demo">
        <ComponentPreview
          title="Typewriter animation"
          code={`<Typewriter text={["Hello!", "Welcome to Velora UI", "Let's build something great"]} speed={80} deleteSpeed={40} pauseDuration={1500} loop />`}
        >
          <div className="min-h-[2rem] text-lg font-semibold text-[var(--velora-text-primary)]">
            <Typewriter
              text={["Hello!", "Welcome to Velora UI", "Let's build something great"]}
              speed={80}
              deleteSpeed={40}
              pauseDuration={1500}
              loop
            />
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
              <code className="text-[var(--velora-text-brand)]">text</code> — Text to
              type. Pass a string for single text, or an array for cycling. Type:{" "}
              <code>string | string[]</code>.
            </li>
            <li>
              <code className="text-[var(--velora-text-brand)]">speed</code> — Typing
              speed in milliseconds per character. Default: <code>100</code>.
            </li>
            <li>
              <code className="text-[var(--velora-text-brand)]">deleteSpeed</code> —
              Deletion speed in milliseconds per character. Default: <code>50</code>.
            </li>
            <li>
              <code className="text-[var(--velora-text-brand)]">pauseDuration</code> —
              Pause duration after typing in milliseconds. Default: <code>2000</code>.
            </li>
            <li>
              <code className="text-[var(--velora-text-brand)]">loop</code> — Whether to
              cycle through text array items. Default: <code>false</code>.
            </li>
          </ul>
          <p className="mt-3">
            <strong>Returns:</strong>
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
            <li>
              A text element that animates through the provided strings with typing and
              deleting effects.
            </li>
          </ul>
        </div>
      </DocSection>

      <Separator className="my-8" />

      <DocsPageNav
        prev={{ title: "Parallax", href: "/docs/motion/parallax" }}
        next={{ title: "AnimatedNumber", href: "/docs/motion/animated-number" }}
      />
    </>
  );
}
