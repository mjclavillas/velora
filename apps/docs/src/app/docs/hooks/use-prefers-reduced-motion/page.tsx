import type { Metadata } from "next";
import {
  DocsPageHeader,
  DocsPageNav,
  DocSection,
  DocCodeBlock,
} from "@/components/DocsPage";
import { Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "usePrefersReducedMotion — Velora UI",
  description:
    "A React hook that returns true when the user prefers reduced motion for accessibility.",
};

export default function UsePrefersReducedMotionPage() {
  return (
    <>
      <DocsPageHeader
        title="usePrefersReducedMotion"
        description="Returns true when the OS prefers reduced motion."
        badges={["Hook", "a11y"]}
      />

      <DocSection title="Import">
        <DocCodeBlock
          code={`import { usePrefersReducedMotion } from "@ui-velora/core";`}
          title="Import statement"
        />
      </DocSection>

      <DocSection title="Usage">
        <DocCodeBlock
          code={`const prefersReduced = usePrefersReducedMotion();`}
          title="Basic usage"
        />
      </DocSection>

      <DocSection title="Example">
        <DocCodeBlock
          code={`import { usePrefersReducedMotion } from "@ui-velora/core";
import { motion } from "framer-motion";

export function FadeIn({ children }) {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}`}
          title="Skip animation for accessibility"
        />
      </DocSection>

      <DocSection title="API Reference">
        <div className="text-sm text-[var(--velora-text-secondary)]">
          <p>
            <strong>Returns:</strong>
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
            <li>
              <code className="text-[var(--velora-text-brand)]">boolean</code> —{" "}
              <code>true</code> when <code>prefers-reduced-motion: reduce</code> matches.
            </li>
          </ul>
          <p className="mt-3 text-xs text-[var(--velora-text-tertiary)]">
            All Velora animated components (Button, Dialog, motion primitives) already
            respect this preference automatically.
          </p>
        </div>
      </DocSection>

      <Separator className="my-8" />

      <DocsPageNav
        prev={{ title: "usePrefersDark", href: "/docs/hooks/use-prefers-dark" }}
        next={{ title: "useClickOutside", href: "/docs/hooks/use-click-outside" }}
      />
    </>
  );
}
