import type { Metadata } from "next";
import {
  DocsPageHeader,
  DocsPageNav,
  DocSection,
  DocCodeBlock,
} from "@/components/DocsPage";
import { ComponentPreview } from "@/components/ComponentPreview";
import { UseKeyboardDemo } from "@/components/demos/use-keyboard-demo";
import { Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "useKeyboard — Velora UI",
  description:
    "A React hook that binds keyboard shortcuts to handler functions with support for modifier keys.",
};

export default function UseKeyboardPage() {
  return (
    <>
      <DocsPageHeader
        title="useKeyboard"
        description="Bind keyboard shortcuts to handler functions."
        badges={["Hook"]}
      />

      <DocSection title="Import">
        <DocCodeBlock
          code={`import { useKeyboard } from "@velora/core";`}
          title="Import statement"
        />
      </DocSection>

      <DocSection title="Usage">
        <ComponentPreview
          title="Interactive demo"
          code={`useKeyboard({
  "ctrl+s": () => console.log("Save triggered"),
  "ctrl+k": () => console.log("Search opened"),
  Escape: () => console.log("Close modal"),
});`}
        >
          <UseKeyboardDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Example">
        <DocCodeBlock
          code={`import { useKeyboard } from "@velora/core";

export function Shortcuts() {
  useKeyboard({
    "ctrl+s": () => {
      console.log("Save triggered");
    },
    Escape: () => {
      console.log("Close modal");
    },
  });

  return <div>Press Ctrl+S to save</div>;
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
              <code className="text-[var(--velora-text-brand)]">handlers</code> — A record
              mapping key combinations to handler functions. Keys can include modifiers
              joined with <code>+</code> (e.g. <code>"ctrl+s"</code>, <code>"shift+a"</code>).
              Type: <code>Partial&lt;Record&lt;string, (e: KeyboardEvent) =&gt; void&gt;&gt;</code>.
            </li>
            <li>
              <code className="text-[var(--velora-text-brand)]">enabled</code> — Whether
              the listeners are active. Type: <code>boolean</code>. Default: <code>true</code>.
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
        prev={{ title: "useToggle", href: "/docs/hooks/use-toggle" }}
        next={{ title: "FadeIn", href: "/docs/motion/fade-in" }}
      />
    </>
  );
}
