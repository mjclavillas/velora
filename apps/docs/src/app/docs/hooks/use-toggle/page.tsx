import type { Metadata } from "next";
import {
  DocsPageHeader,
  DocsPageNav,
  DocSection,
  DocCodeBlock,
} from "@/components/DocsPage";
import { ComponentPreview } from "@/components/ComponentPreview";
import { UseToggleDemo } from "@/components/demos/use-toggle-demo";
import { Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "useToggle — Velora UI",
  description:
    "A React hook that manages a boolean toggle state with a toggle function and direct setter.",
};

export default function UseTogglePage() {
  return (
    <>
      <DocsPageHeader
        title="useToggle"
        description="Manage a boolean toggle state."
        badges={["Hook"]}
      />

      <DocSection title="Import">
        <DocCodeBlock
          code={`import { useToggle } from "@velora/core";`}
          title="Import statement"
        />
      </DocSection>

      <DocSection title="Usage">
        <ComponentPreview
          title="Interactive demo"
          code={`const [isOpen, toggleOpen, setOpen] = useToggle(false);`}
        >
          <UseToggleDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Example">
        <DocCodeBlock
          code={`import { useToggle } from "@velora/core";

export function Modal() {
  const [isOpen, toggleOpen, setOpen] = useToggle(false);

  return (
    <div>
      <button onClick={toggleOpen}>Toggle</button>
      <button onClick={() => setOpen(true)}>Open</button>
      {isOpen && <div className="modal">Modal content</div>}
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
              <code className="text-[var(--velora-text-brand)]">initial</code> — The
              initial boolean value. Type: <code>boolean</code>. Default:{" "}
              <code>false</code>.
            </li>
          </ul>
          <p className="mt-3">
            <strong>Returns:</strong>
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
            <li>
              <code className="text-[var(--velora-text-brand)]">[value, toggle,
              setValue]</code> — A tuple containing the current boolean value, a toggle
              function, and a direct setter function.
            </li>
          </ul>
        </div>
      </DocSection>

      <Separator className="my-8" />

      <DocsPageNav
        prev={{ title: "useCountUp", href: "/docs/hooks/use-count-up" }}
        next={{ title: "useKeyboard", href: "/docs/hooks/use-keyboard" }}
      />
    </>
  );
}
