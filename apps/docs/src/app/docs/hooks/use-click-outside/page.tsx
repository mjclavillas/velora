import type { Metadata } from "next";
import {
  DocsPageHeader,
  DocsPageNav,
  DocSection,
  DocCodeBlock,
} from "@/components/DocsPage";
import { ComponentPreview } from "@/components/ComponentPreview";
import { UseClickOutsideDemo } from "@/components/demos/use-click-outside-demo";
import { Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "useClickOutside — Velora UI",
  description:
    "A React hook that detects clicks outside a referenced element and invokes a callback handler.",
};

export default function UseClickOutsidePage() {
  return (
    <>
      <DocsPageHeader
        title="useClickOutside"
        description="Detect clicks outside a referenced element."
        badges={["Hook"]}
      />

      <DocSection title="Import">
        <DocCodeBlock
          code={`import { useClickOutside } from "@velora/core";`}
          title="Import statement"
        />
      </DocSection>

      <DocSection title="Usage">
        <ComponentPreview
          title="Interactive demo"
          code={`const ref = useRef<HTMLDivElement>(null);\nuseClickOutside(ref, () => {\n  console.log("Clicked outside");\n});`}
        >
          <UseClickOutsideDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Example">
        <DocCodeBlock
          code={`import { useRef } from "react";
import { useClickOutside } from "@velora/core";

export function Popover() {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    console.log("Clicked outside");
  });

  return (
    <div ref={ref} className="popover">
      <p>Content</p>
    </div>
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
              <code className="text-[var(--velora-text-brand)]">ref</code> — A React ref
              pointing to the target element. Type: <code>RefObject&lt;T&gt;</code>.
            </li>
            <li>
              <code className="text-[var(--velora-text-brand)]">handler</code> — Callback
              invoked when a click occurs outside the element. Type: <code>() =&gt;
              void</code>.
            </li>
            <li>
              <code className="text-[var(--velora-text-brand)]">options</code> — Optional
              configuration. Type: <code>{`{ enabled?: boolean; events?: string[] }`}</code>.
              Default: <code>undefined</code>.
            </li>
          </ul>
          <p className="mt-3">
            <strong>Returns:</strong>
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
            <li>
              <code className="text-[var(--velora-text-brand)]">void</code> — This hook
              does not return a value.
            </li>
          </ul>
        </div>
      </DocSection>

      <Separator className="my-8" />

      <DocsPageNav
        prev={{ title: "useMediaQuery", href: "/docs/hooks/use-media-query" }}
        next={{ title: "useCopyToClipboard", href: "/docs/hooks/use-copy-to-clipboard" }}
      />
    </>
  );
}
