import type { Metadata } from "next";
import {
  DocsPageHeader,
  DocsPageNav,
  DocSection,
  DocCodeBlock,
} from "@/components/DocsPage";
import { Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "useIsDesktop — Velora UI",
  description:
    "A React hook that returns true when the viewport is 1024px or wider.",
};

export default function UseIsDesktopPage() {
  return (
    <>
      <DocsPageHeader
        title="useIsDesktop"
        description="Returns true when viewport width is 1024px or above."
        badges={["Hook"]}
      />

      <DocSection title="Import">
        <DocCodeBlock
          code={`import { useIsDesktop } from "@ui-velora/core";`}
          title="Import statement"
        />
      </DocSection>

      <DocSection title="Usage">
        <DocCodeBlock
          code={`const isDesktop = useIsDesktop();`}
          title="Basic usage"
        />
      </DocSection>

      <DocSection title="Example">
        <DocCodeBlock
          code={`import { useIsDesktop } from "@ui-velora/core";

export function Dashboard() {
  const isDesktop = useIsDesktop();

  return (
    <div className="flex">
      {isDesktop && <Sidebar />}
      <main className="flex-1">{/* content */}</main>
    </div>
  );
}`}
          title="Show sidebar only on desktop"
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
              <code>true</code> when viewport width &gt;= 1024px.
            </li>
          </ul>
        </div>
      </DocSection>

      <Separator className="my-8" />

      <DocsPageNav
        prev={{ title: "useIsTablet", href: "/docs/hooks/use-is-tablet" }}
        next={{ title: "usePrefersDark", href: "/docs/hooks/use-prefers-dark" }}
      />
    </>
  );
}
