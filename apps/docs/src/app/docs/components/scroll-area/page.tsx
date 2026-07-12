import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview, PropsTable } from "@/components/ComponentPreview";
import { Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "ScrollArea — Velora UI",
  description:
    "Custom styled scroll areas with thin, rounded scrollbars for both vertical and horizontal overflow.",
};

const basicCode = `import { ScrollArea } from "@velora/core";

<ScrollArea className="h-[200px] w-[350px]">
  <div className="p-4">
    <h4 className="mb-4 text-sm font-medium">Tags</h4>
    {tags.map((tag) => (
      <div key={tag} className="mb-2 text-sm">
        {tag}
      </div>
    ))}
  </div>
</ScrollArea>`;

const horizontalCode = `import { ScrollArea, ScrollBar } from "@velora/core";

<ScrollArea className="w-full whitespace-nowrap">
  <div className="flex gap-4 p-4">
    {items.map((item) => (
      <div
        key={item}
        className="shrink-0 rounded-md border p-3 text-sm"
      >
        {item}
      </div>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`;

export default function ScrollAreaPage() {
  return (
    <>
      <DocsPageHeader
        title="ScrollArea"
        description="Custom styled scroll areas with thin, rounded scrollbars. Supports vertical, horizontal, and both-axis overflow."
        badges={["Radix ScrollArea", "Custom Scrollbars"]}
      />

      <DocSection title="Installation">
        <DocCodeBlock
          code={`import { ScrollArea, ScrollBar } from "@velora/core";`}
        />
      </DocSection>

      <DocSection title="Usage">
        <DocCodeBlock
          title="Vertical scroll area"
          code={basicCode}
        />
      </DocSection>

      <DocSection title="Horizontal Scroll">
        <DocCodeBlock
          title="Horizontal scroll with explicit ScrollBar"
          code={horizontalCode}
        />
      </DocSection>

      <DocSection title="API Reference">
        <PropsTable
          props={[
            {
              name: "ScrollArea",
              type: "Component",
              description: "Root container that manages overflow scrolling with custom scrollbars.",
            },
            {
              name: "ScrollBar",
              type: "Component",
              description: "Custom scrollbar element. Use orientation prop for horizontal scroll areas.",
            },
            {
              name: "orientation",
              type: '"vertical" | "horizontal"',
              default: '"vertical"',
              description: "Direction of the scrollbar.",
            },
            {
              name: "className",
              type: "string",
              description: "CSS classes applied to the scroll area container. Set height/width to enable scrolling.",
            },
          ]}
        />
      </DocSection>

      <DocsPageNav
        prev={{ title: "Progress", href: "/docs/components/progress" }}
        next={{ title: "Select", href: "/docs/components/select" }}
      />
    </>
  );
}
