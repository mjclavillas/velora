import type { Metadata } from "next";
import {
  DocsPageHeader,
  DocsPageNav,
  DocSection,
  DocCodeBlock,
} from "@/components/DocsPage";
import { Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "useIsTablet — Velora UI",
  description:
    "A React hook that returns true when the viewport is between 768px and 1023px wide.",
};

export default function UseIsTabletPage() {
  return (
    <>
      <DocsPageHeader
        title="useIsTablet"
        description="Returns true when viewport width is between 768px and 1023px."
        badges={["Hook"]}
      />

      <DocSection title="Import">
        <DocCodeBlock
          code={`import { useIsTablet } from "@ui-velora/core";`}
          title="Import statement"
        />
      </DocSection>

      <DocSection title="Usage">
        <DocCodeBlock
          code={`const isTablet = useIsTablet();`}
          title="Basic usage"
        />
      </DocSection>

      <DocSection title="Example">
        <DocCodeBlock
          code={`import { useIsTablet } from "@ui-velora/core";

export function SidebarLayout({ children }) {
  const isTablet = useIsTablet();

  return (
    <div className={isTablet ? "sidebar-compact" : "sidebar-full"}>
      {children}
    </div>
  );
}`}
          title="Adaptive layout"
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
              <code>true</code> when viewport width is 768px–1023px.
            </li>
          </ul>
        </div>
      </DocSection>

      <Separator className="my-8" />

      <DocsPageNav
        prev={{ title: "useIsMobile", href: "/docs/hooks/use-is-mobile" }}
        next={{ title: "useIsDesktop", href: "/docs/hooks/use-is-desktop" }}
      />
    </>
  );
}
