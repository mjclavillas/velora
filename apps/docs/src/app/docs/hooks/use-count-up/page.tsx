import type { Metadata } from "next";
import {
  DocsPageHeader,
  DocsPageNav,
  DocSection,
  DocCodeBlock,
} from "@/components/DocsPage";
import { ComponentPreview } from "@/components/ComponentPreview";
import { UseCountUpDemo } from "@/components/demos/use-count-up-demo";
import { Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "useCountUp — Velora UI",
  description:
    "A React hook that animates a number from zero to a target value over a specified duration.",
};

export default function UseCountUpPage() {
  return (
    <>
      <DocsPageHeader
        title="useCountUp"
        description="Animate a number from zero to a target value."
        badges={["Hook"]}
      />

      <DocSection title="Import">
        <DocCodeBlock
          code={`import { useCountUp } from "@velora/core";`}
          title="Import statement"
        />
      </DocSection>

      <DocSection title="Usage">
        <ComponentPreview
          title="Interactive demo"
          code={`const count = useCountUp(1000, 2000);`}
        >
          <UseCountUpDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Example">
        <DocCodeBlock
          code={`import { useCountUp } from "@velora/core";

export function Statistic() {
  const count = useCountUp(1000, 2000);

  return <span>{count}</span>;
}`}
          title="Basic usage"
        />
      </DocSection>

      <DocSection title="API Reference">
        <div className="text-sm text-[var(--velora-text-secondary)]">
          <p>
            <strong>Parameters:</strong>
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
            <li>
              <code className="text-[var(--velora-text-brand)]">target</code> — The target
              number to animate toward. Type: <code>number</code>.
            </li>
            <li>
              <code className="text-[var(--velora-text-brand)]">duration</code> — Duration
              of the animation in milliseconds. Type: <code>number</code>. Default:{" "}
              <code>1000</code>.
            </li>
          </ul>
          <p className="mt-3">
            <strong>Returns:</strong>
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
            <li>
              <code className="text-[var(--velora-text-brand)]">number</code> — The
              current animated value.
            </li>
          </ul>
        </div>
      </DocSection>

      <Separator className="my-8" />

      <DocsPageNav
        prev={{ title: "useCopyToClipboard", href: "/docs/hooks/use-copy-to-clipboard" }}
        next={{ title: "useToggle", href: "/docs/hooks/use-toggle" }}
      />
    </>
  );
}
