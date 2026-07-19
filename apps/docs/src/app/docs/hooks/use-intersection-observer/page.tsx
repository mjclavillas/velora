import type { Metadata } from "next";
import {
  DocsPageHeader,
  DocsPageNav,
  DocSection,
  DocCodeBlock,
} from "@/components/DocsPage";
import { Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "useIntersectionObserver — Velora UI",
  description:
    "A React hook that observes an element's visibility within the viewport using the Intersection Observer API.",
};

export default function UseIntersectionObserverPage() {
  return (
    <>
      <DocsPageHeader
        title="useIntersectionObserver"
        description="Track when an element enters or leaves the viewport."
        badges={["Hook"]}
      />

      <DocSection title="Import">
        <DocCodeBlock
          code={`import { useIntersectionObserver } from "@ui-velora/core";`}
          title="Import statement"
        />
      </DocSection>

      <DocSection title="Usage">
        <DocCodeBlock
          code={`const ref = useRef<HTMLDivElement>(null);
const entry = useIntersectionObserver(ref, {
  threshold: 0.5,
  freezeOnceVisible: true,
});

const isVisible = entry?.isIntersecting ?? false;`}
          title="Basic usage"
        />
      </DocSection>

      <DocSection title="Example">
        <DocCodeBlock
          code={`import { useRef } from "react";
import { useIntersectionObserver } from "@ui-velora/core";

export function LazySection({ children }) {
  const ref = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  return (
    <div ref={ref} className={entry?.isIntersecting ? "visible" : "hidden"}>
      {children}
    </div>
  );
}`}
          title="Lazy load on scroll"
        />
      </DocSection>

      <DocSection title="API Reference">
        <div className="text-sm text-[var(--velora-text-secondary)]">
          <p>
            <strong>Parameters:</strong>
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
            <li>
              <code className="text-[var(--velora-text-brand)]">elementRef</code> — React ref
              to the target element.
            </li>
            <li>
              <code className="text-[var(--velora-text-brand)]">options.threshold</code> —
              Visibility threshold (0–1). Default: <code>0</code>.
            </li>
            <li>
              <code className="text-[var(--velora-text-brand)]">options.root</code> — Scrollable
              ancestor element. Default: <code>null</code> (viewport).
            </li>
            <li>
              <code className="text-[var(--velora-text-brand)]">options.rootMargin</code> —
              Margin around root. Default: <code>"0%"</code>.
            </li>
            <li>
              <code className="text-[var(--velora-text-brand)]">options.freezeOnceVisible</code> —
              Stop observing once visible. Default: <code>false</code>.
            </li>
          </ul>
          <p className="mt-3">
            <strong>Returns:</strong>
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
            <li>
              <code className="text-[var(--velora-text-brand)]">IntersectionObserverEntry | undefined</code> —
              The latest intersection entry.
            </li>
          </ul>
        </div>
      </DocSection>

      <Separator className="my-8" />

      <DocsPageNav
        prev={{ title: "useScrollLock", href: "/docs/hooks/use-scroll-lock" }}
        next={{ title: "useCountUp", href: "/docs/hooks/use-count-up" }}
      />
    </>
  );
}
