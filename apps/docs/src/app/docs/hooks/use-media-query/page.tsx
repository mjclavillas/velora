import type { Metadata } from "next";
import {
  DocsPageHeader,
  DocsPageNav,
  DocSection,
  DocCodeBlock,
} from "@/components/DocsPage";
import { ComponentPreview } from "@/components/ComponentPreview";
import { UseMediaQueryDemo } from "@/components/demos/use-media-query-demo";
import { Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "useMediaQuery — Velora UI",
  description:
    "A React hook that tracks CSS media query matches. Includes convenience hooks for common breakpoints.",
};

export default function UseMediaQueryPage() {
  return (
    <>
      <DocsPageHeader
        title="useMediaQuery"
        description="Track CSS media query matches with convenience breakpoint hooks."
        badges={["Hook"]}
      />

      <DocSection title="Import">
        <DocCodeBlock
          code={`import { useMediaQuery, useIsMobile, useIsTablet, useIsDesktop } from "@velora/core";`}
          title="Import statement"
        />
      </DocSection>

      <DocSection title="Usage">
        <ComponentPreview
          title="Interactive demo"
          code={`const isLarge = useMediaQuery("(min-width: 1024px)");\nconst isMobile = useIsMobile();`}
        >
          <UseMediaQueryDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Example">
        <DocCodeBlock
          code={`import { useMediaQuery, useIsMobile } from "@velora/core";

export function ResponsiveLayout() {
  const isLarge = useMediaQuery("(min-width: 1024px)");
  const isMobile = useIsMobile();

  return (
    <div>
      {isMobile ? <MobileNav /> : <DesktopNav />}
      {isLarge ? <Sidebar layout="side" /> : <Sidebar layout="overlay" />}
    </div>
  );
}`}
          title="Basic usage"
        />
      </DocSection>

      <DocSection title="API Reference">
        <div className="text-sm text-[var(--velora-text-secondary)]">
          <p>
            <strong>useMediaQuery Parameters:</strong>
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
            <li>
              <code className="text-[var(--velora-text-brand)]">query</code> — A CSS
              media query string to match against. Type: <code>string</code>.
            </li>
          </ul>
          <p className="mt-3">
            <strong>Returns:</strong>
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
            <li>
              <code className="text-[var(--velora-text-brand)]">boolean</code> — Whether
              the media query currently matches.
            </li>
          </ul>
          <p className="mt-3">
            <strong>Convenience Hooks:</strong>
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
            <li>
              <code className="text-[var(--velora-text-brand)]">useIsMobile</code> —
              Matches below 640px.
            </li>
            <li>
              <code className="text-[var(--velora-text-brand)]">useIsTablet</code> —
              Matches 640px to 1024px.
            </li>
            <li>
              <code className="text-[var(--velora-text-brand)]">useIsDesktop</code> —
              Matches above 1024px.
            </li>
          </ul>
        </div>
      </DocSection>

      <Separator className="my-8" />

      <DocsPageNav
        prev={{ title: "useLocalStorage", href: "/docs/hooks/use-local-storage" }}
        next={{ title: "useClickOutside", href: "/docs/hooks/use-click-outside" }}
      />
    </>
  );
}
