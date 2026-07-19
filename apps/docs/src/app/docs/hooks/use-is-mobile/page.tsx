import type { Metadata } from "next";
import {
  DocsPageHeader,
  DocsPageNav,
  DocSection,
  DocCodeBlock,
} from "@/components/DocsPage";
import { Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "useIsMobile — Velora UI",
  description:
    "A React hook that returns true when the viewport is less than 768px wide.",
};

export default function UseIsMobilePage() {
  return (
    <>
      <DocsPageHeader
        title="useIsMobile"
        description="Returns true when the viewport width is below 768px. Built on useMediaQuery."
        badges={["Hook"]}
      />

      <DocSection title="Import">
        <DocCodeBlock
          code={`import { useIsMobile } from "@ui-velora/core";`}
          title="Import statement"
        />
      </DocSection>

      <DocSection title="Usage">
        <DocCodeBlock
          code={`const isMobile = useIsMobile();`}
          title="Basic usage"
        />
      </DocSection>

      <DocSection title="Example">
        <DocCodeBlock
          code={`import { useIsMobile } from "@ui-velora/core";

export function ResponsiveNav() {
  const isMobile = useIsMobile();

  return (
    <nav>
      {isMobile ? <MobileMenu /> : <DesktopMenu />}
    </nav>
  );
}`}
          title="Conditional rendering"
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
              <code>true</code> when viewport width &lt; 768px.
            </li>
          </ul>
        </div>
      </DocSection>

      <Separator className="my-8" />

      <DocsPageNav
        prev={{ title: "useKeyboard", href: "/docs/hooks/use-keyboard" }}
        next={{ title: "useIsTablet", href: "/docs/hooks/use-is-tablet" }}
      />
    </>
  );
}
