import type { Metadata } from "next";
import {
  DocsPageHeader,
  DocsPageNav,
  DocSection,
  DocCodeBlock,
} from "@/components/DocsPage";
import { ComponentPreview } from "@/components/ComponentPreview";
import { UseLocalStorageDemo } from "@/components/demos/use-local-storage-demo";
import { Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "useLocalStorage — Velora UI",
  description:
    "A React hook for persisting state in localStorage with automatic serialization and hydration support.",
};

export default function UseLocalStoragePage() {
  return (
    <>
      <DocsPageHeader
        title="useLocalStorage"
        description="Persist and synchronize state with localStorage."
        badges={["Hook"]}
      />

      <DocSection title="Import">
        <DocCodeBlock
          code={`import { useLocalStorage } from "@velora/core";`}
          title="Import statement"
        />
      </DocSection>

      <DocSection title="Usage">
        <ComponentPreview
          title="Interactive demo"
          code={`const [theme, setTheme, removeTheme] = useLocalStorage("theme", "light");`}
        >
          <UseLocalStorageDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Example">
        <DocCodeBlock
          code={`import { useLocalStorage } from "@velora/core";

export function ThemeToggle() {
  const [theme, setTheme, removeTheme] = useLocalStorage("theme", "light");

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle
      </button>
      <button onClick={removeTheme}>Reset</button>
    </div>
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
              <code className="text-[var(--velora-text-brand)]">key</code> — The
              localStorage key to store the value under. Type: <code>string</code>.
            </li>
            <li>
              <code className="text-[var(--velora-text-brand)]">defaultValue</code> — The
              initial value if nothing is stored. Type: <code>T</code>.
            </li>
          </ul>
          <p className="mt-3">
            <strong>Returns:</strong>
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--velora-text-secondary)]">
            <li>
              <code className="text-[var(--velora-text-brand)]">[value, setValue,
              removeValue]</code> — A tuple containing the current value, a setter
              function, and a function to remove the stored value.
            </li>
          </ul>
        </div>
      </DocSection>

      <Separator className="my-8" />

      <DocsPageNav
        prev={{ title: "useDebounce", href: "/docs/hooks/use-debounce" }}
        next={{ title: "useMediaQuery", href: "/docs/hooks/use-media-query" }}
      />
    </>
  );
}
