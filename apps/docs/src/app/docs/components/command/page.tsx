import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview } from "@/components/ComponentPreview";
import { Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "Command — Velora UI",
  description: "Command palette (Cmd+K) with search, filtering, and keyboard navigation.",
};

export default function CommandPage() {
  return (
    <>
      <DocsPageHeader
        title="Command"
        description="A fast, composable command palette with search, filtering, grouped items, and full keyboard navigation. Trigger with Cmd+K."
        badges={["cmdk", "Radix Primitives"]}
      />

      <DocSection title="Installation">
        <DocCodeBlock code={`import { Command, useCommandPalette } from "@velora/core";`} />
      </DocSection>

      <DocSection title="Setup">
        <DocCodeBlock
          title="page.tsx"
          code={`const { open, setOpen } = useCommandPalette();

<Command open={open} onOpenChange={setOpen}>
  <Command.Input placeholder="Type a command or search..." />
  <Command.List>
    <Command.Empty>No results found.</Command.Empty>
    <Command.Group heading="Suggestions">
      <Command.Item>Calendar</Command.Item>
      <Command.Item>Search Emoji</Command.Item>
      <Command.Item>Calculator</Command.Item>
    </Command.Group>
    <Command.Separator />
    <Command.Group heading="Settings">
      <Command.Item>Profile</Command.Item>
      <Command.Item>Billing</Command.Item>
      <Command.Item>Settings</Command.Item>
    </Command.Group>
  </Command.List>
</Command>`}
        />
      </DocSection>

      <DocSection title="Preview">
        <ComponentPreview
          title="Command palette"
          code={`<Command>\n  <Command.Input placeholder="Type a command or search..." />\n  <Command.List>\n    <Command.Group heading="Suggestions">\n      <Command.Item>Calendar</Command.Item>\n      <Command.Item>Search Emoji</Command.Item>\n      <Command.Item>Calculator</Command.Item>\n    </Command.Group>\n  </Command.List>\n</Command>`}
          previewClassName="flex justify-center"
        >
          <div className="w-full max-w-md rounded-xl border border-[var(--velora-border-base)] bg-[var(--velora-bg-base)] shadow-lg overflow-hidden">
            <div className="border-b border-[var(--velora-border-base)] p-3">
              <div className="flex items-center gap-2 text-sm text-[var(--velora-text-tertiary)]">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                Type a command or search...
              </div>
            </div>
            <div className="p-2">
              <p className="px-2 py-1 text-xs font-medium text-[var(--velora-text-tertiary)]">Suggestions</p>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-[var(--velora-text-primary)] hover:bg-[var(--velora-bg-subtle)]">
                  <span className="rounded bg-[var(--velora-bg-tertiary)] p-1">📅</span> Calendar
                </div>
                <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-[var(--velora-text-primary)] hover:bg-[var(--velora-bg-subtle)]">
                  <span className="rounded bg-[var(--velora-bg-tertiary)] p-1">😀</span> Search Emoji
                </div>
                <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-[var(--velora-text-primary)] hover:bg-[var(--velora-bg-subtle)]">
                  <span className="rounded bg-[var(--velora-bg-tertiary)] p-1">🔢</span> Calculator
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Keyboard shortcut">
        <DocCodeBlock
          title="Listen for Cmd+K"
          code={`useEffect(() => {
  const down = (e: KeyboardEvent) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
  };
  document.addEventListener("keydown", down);
  return () => document.removeEventListener("keydown", down);
}, [setOpen]);`}
        />
      </DocSection>

      <DocSection title="Dynamic results">
        <DocCodeBlock
          title="Fetching items dynamically"
          code={`const [query, setQuery] = useState("");

// Filter items based on query
const filtered = items.filter((item) =>
  item.label.toLowerCase().includes(query.toLowerCase())
);

<Command open={open} onOpenChange={setOpen}>
  <Command.Input
    placeholder="Search..."
    value={query}
    onValueChange={setQuery}
  />
  <Command.List>
    <Command.Empty>No results found.</Command.Empty>
    {filtered.map((item) => (
      <Command.Item
        key={item.id}
        value={item.label}
        onSelect={() => {
          handleSelect(item);
          setOpen(false);
        }}
      >
        {item.label}
      </Command.Item>
    ))}
  </Command.List>
</Command>`}
        />
      </DocSection>

      <DocSection title="API Reference">
        <h3 className="mb-2 mt-6 text-base font-semibold text-[var(--velora-text-primary)]">
          useCommandPalette
        </h3>
        <DocCodeBlock code={`const { open, setOpen } = useCommandPalette();`} />

        <h3 className="mb-2 mt-6 text-base font-semibold text-[var(--velora-text-primary)]">
          Command
        </h3>
        <DocCodeBlock
          code={`<Command open={open} onOpenChange={setOpen} filter={(value, search) => { ... }}>
  <Command.Input />
  <Command.List>
    <Command.Empty />
    <Command.Group heading="..." />
    <Command.Item onSelect={() => { ... }} />
    <Command.Separator />
  </Command.List>
</Command>`}
        />
      </DocSection>

      <DocsPageNav
        prev={{ title: "Checkbox", href: "/docs/components/checkbox" }}
        next={{ title: "DataTable", href: "/docs/components/data-table" }}
      />
    </>
  );
}
