import type { Metadata } from "next";
import {
  DocsPageHeader,
  DocsPageNav,
  DocSection,
  DocCodeBlock,
} from "@/components/DocsPage";
import { Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "usePrefersDark — Velora UI",
  description:
    "A React hook that returns true when the user's OS prefers dark color scheme.",
};

export default function UsePrefersDarkPage() {
  return (
    <>
      <DocsPageHeader
        title="usePrefersDark"
        description="Returns true when the OS color scheme preference is dark."
        badges={["Hook"]}
      />

      <DocSection title="Import">
        <DocCodeBlock
          code={`import { usePrefersDark } from "@ui-velora/core";`}
          title="Import statement"
        />
      </DocSection>

      <DocSection title="Usage">
        <DocCodeBlock
          code={`const prefersDark = usePrefersDark();`}
          title="Basic usage"
        />
      </DocSection>

      <DocSection title="Example">
        <DocCodeBlock
          code={`import { usePrefersDark } from "@ui-velora/core";

export function ThemeHint() {
  const prefersDark = usePrefersDark();

  return (
    <p>
      Your system prefers {prefersDark ? "dark" : "light"} mode.
    </p>
  );
}`}
          title="Detect system preference"
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
              <code>true</code> when <code>prefers-color-scheme: dark</code> matches.
            </li>
          </ul>
        </div>
      </DocSection>

      <Separator className="my-8" />

      <DocsPageNav
        prev={{ title: "useIsDesktop", href: "/docs/hooks/use-is-desktop" }}
        next={{ title: "usePrefersReducedMotion", href: "/docs/hooks/use-prefers-reduced-motion" }}
      />
    </>
  );
}
