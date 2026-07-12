import type { Metadata } from "next";
import {
  DocsPageHeader,
  DocsPageNav,
  DocSection,
  DocCodeBlock,
} from "@/components/DocsPage";
import { ComponentPreview } from "@/components/ComponentPreview";
import { UseCopyToClipboardDemo } from "@/components/demos/use-copy-to-clipboard-demo";
import { Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "useCopyToClipboard — Velora UI",
  description:
    "A React hook that copies text to the clipboard and tracks the copied state with an optional auto-reset delay.",
};

export default function UseCopyToClipboardPage() {
  return (
    <>
      <DocsPageHeader
        title="useCopyToClipboard"
        description="Copy text to the clipboard with automatic state tracking."
        badges={["Hook"]}
      />

      <DocSection title="Import">
        <DocCodeBlock
          code={`import { useCopyToClipboard } from "@velora/core";`}
          title="Import statement"
        />
      </DocSection>

      <DocSection title="Usage">
        <ComponentPreview
          title="Interactive demo"
          code={`const [copied, copy] = useCopyToClipboard(2000);`}
        >
          <UseCopyToClipboardDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Example">
        <DocCodeBlock
          code={`import { useCopyToClipboard } from "@velora/core";

export function CopyButton() {
  const [copied, copy] = useCopyToClipboard(2000);

  return (
    <button onClick={() => copy("Hello, world!")}>
      {copied ? "Copied!" : "Copy"}
    </button>
  );
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
              <code className="text-[var(--velora-text-brand)]">resetDelay</code> — Time
              in milliseconds before the copied state resets. Type:{" "}
              <code>number</code>. Default: <code>undefined</code> (manual reset only).
            </li>
          </ul>
          <p className="mt-3">
            <strong>Returns:</strong>
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
            <li>
              <code className="text-[var(--velora-text-brand)]">[copied, copy]</code> — A
              tuple containing a boolean indicating whether text was recently copied, and
              a function to copy a string to the clipboard.
            </li>
          </ul>
        </div>
      </DocSection>

      <Separator className="my-8" />

      <DocsPageNav
        prev={{ title: "useClickOutside", href: "/docs/hooks/use-click-outside" }}
        next={{ title: "useCountUp", href: "/docs/hooks/use-count-up" }}
      />
    </>
  );
}
