import type { Metadata } from "next";
import {
  DocsPageHeader,
  DocsPageNav,
  DocSection,
  DocCodeBlock,
} from "@/components/DocsPage";
import { ComponentPreview } from "@/components/ComponentPreview";
import { UseDebounceDemo } from "@/components/demos/use-debounce-demo";
import { Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "useDebounce — Velora UI",
  description:
    "A React hook that debounces a value by a specified delay. Useful for filtering rapid state changes like search input.",
};

export default function UseDebouncePage() {
  return (
    <>
      <DocsPageHeader
        title="useDebounce"
        description="Debounces a value by a specified delay."
        badges={["Hook"]}
      />

      <DocSection title="Import">
        <DocCodeBlock
          code={`import { useDebounce } from "@velora/core";`}
          title="Import statement"
        />
      </DocSection>

      <DocSection title="Usage">
        <ComponentPreview
          title="Live demo"
          code={`const [query, setQuery] = useState("");\nconst debouncedQuery = useDebounce(query, 500);`}
        >
          <UseDebounceDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Example">
        <DocCodeBlock
          code={`import { useState } from "react";
import { useDebounce } from "@velora/core";

export function SearchInput() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
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
              <code className="text-[var(--velora-text-brand)]">value</code> — The
              value to debounce. Type: <code>T</code>.
            </li>
            <li>
              <code className="text-[var(--velora-text-brand)]">delay</code> — Debounce
              delay in milliseconds. Default: <code>300</code>.
            </li>
          </ul>
          <p className="mt-3">
            <strong>Returns:</strong>
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
            <li>
              <code className="text-[var(--velora-text-brand)]">T</code> — The debounced
              value that updates only after the specified delay has elapsed.
            </li>
          </ul>
        </div>
      </DocSection>

      <Separator className="my-8" />

      <DocsPageNav
        prev={{ title: "TypeScript", href: "/docs/typescript" }}
        next={{ title: "useLocalStorage", href: "/docs/hooks/use-local-storage" }}
      />
    </>
  );
}
