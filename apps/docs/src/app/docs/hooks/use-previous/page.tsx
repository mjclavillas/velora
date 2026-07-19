import type { Metadata } from "next";
import {
  DocsPageHeader,
  DocsPageNav,
  DocSection,
  DocCodeBlock,
} from "@/components/DocsPage";
import { Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "usePrevious — Velora UI",
  description:
    "A React hook that tracks the previous value of any variable across renders.",
};

export default function UsePreviousPage() {
  return (
    <>
      <DocsPageHeader
        title="usePrevious"
        description="Track the previous value of any variable."
        badges={["Hook"]}
      />

      <DocSection title="Import">
        <DocCodeBlock
          code={`import { usePrevious } from "@ui-velora/core";`}
          title="Import statement"
        />
      </DocSection>

      <DocSection title="Usage">
        <DocCodeBlock
          code={`const [count, setCount] = useState(0);
const prevCount = usePrevious(count);`}
          title="Basic usage"
        />
      </DocSection>

      <DocSection title="Example">
        <DocCodeBlock
          code={`import { useState } from "react";
import { usePrevious } from "@ui-velora/core";

export function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount ?? "none"}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}`}
          title="Compare with previous value"
        />
      </DocSection>

      <DocSection title="API Reference">
        <div className="text-sm text-[var(--velora-text-secondary)]">
          <p>
            <strong>Parameters:</strong>
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
            <li>
              <code className="text-[var(--velora-text-brand)]">value</code> — The value to
              track. Type: <code>T</code>.
            </li>
          </ul>
          <p className="mt-3">
            <strong>Returns:</strong>
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
            <li>
              <code className="text-[var(--velora-text-brand)]">T | undefined</code> — The
              previous value, or <code>undefined</code> on first render.
            </li>
          </ul>
        </div>
      </DocSection>

      <Separator className="my-8" />

      <DocsPageNav
        prev={{ title: "useCopyToClipboard", href: "/docs/hooks/use-copy-to-clipboard" }}
        next={{ title: "useScrollLock", href: "/docs/hooks/use-scroll-lock" }}
      />
    </>
  );
}
