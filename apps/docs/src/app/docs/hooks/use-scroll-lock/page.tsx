import type { Metadata } from "next";
import {
  DocsPageHeader,
  DocsPageNav,
  DocSection,
  DocCodeBlock,
} from "@/components/DocsPage";
import { Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "useScrollLock — Velora UI",
  description:
    "A React hook that locks body scroll, commonly used with modals and dialogs.",
};

export default function UseScrollLockPage() {
  return (
    <>
      <DocsPageHeader
        title="useScrollLock"
        description="Lock body scroll when a modal or overlay is open."
        badges={["Hook"]}
      />

      <DocSection title="Import">
        <DocCodeBlock
          code={`import { useScrollLock } from "@ui-velora/core";`}
          title="Import statement"
        />
      </DocSection>

      <DocSection title="Usage">
        <DocCodeBlock
          code={`const [isLocked, setIsLocked] = useState(false);
useScrollLock(isLocked);`}
          title="Basic usage"
        />
      </DocSection>

      <DocSection title="Example">
        <DocCodeBlock
          code={`import { useState } from "react";
import { useScrollLock } from "@ui-velora/core";

export function Modal({ children, onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  useScrollLock(isOpen);

  return isOpen ? (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  ) : null;
}`}
          title="Custom modal with scroll lock"
        />
      </DocSection>

      <DocSection title="API Reference">
        <div className="text-sm text-[var(--velora-text-secondary)]">
          <p>
            <strong>Parameters:</strong>
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
            <li>
              <code className="text-[var(--velora-text-brand)]">locked</code> — Whether to
              lock body scroll. Type: <code>boolean</code>.
            </li>
          </ul>
          <p className="mt-3 text-xs text-[var(--velora-text-tertiary)]">
            Automatically compensates for scrollbar width to prevent layout shift.
            Restores original scroll position on unlock.
          </p>
        </div>
      </DocSection>

      <Separator className="my-8" />

      <DocsPageNav
        prev={{ title: "usePrevious", href: "/docs/hooks/use-previous" }}
        next={{ title: "useIntersectionObserver", href: "/docs/hooks/use-intersection-observer" }}
      />
    </>
  );
}
