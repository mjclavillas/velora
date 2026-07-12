import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview, PropsTable } from "@/components/ComponentPreview";
import { Separator } from "@velora/core";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@velora/core";

export const metadata: Metadata = {
  title: "Popover — Velora UI",
  description:
    "Floating popover panel anchored to a trigger element. Supports click and focus triggers with auto-alignment.",
};

export default function PopoverPage() {
  return (
    <>
      <DocsPageHeader
        title="Popover"
        description="Floating popover panel anchored to a trigger element. Supports click and focus triggers with automatic alignment. Built on Radix UI."
        badges={["Radix Popover", "Floating UI"]}
      />

      <DocSection title="Installation">
        <DocCodeBlock
          code={`import { Popover, PopoverTrigger, PopoverContent } from "@velora/core";`}
        />
      </DocSection>

      <DocSection title="Usage">
        <ComponentPreview
          title="Simple popover"
          code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p className="text-sm font-medium">Popover Content</p>
    <p className="mt-1 text-sm text-[var(--velora-text-tertiary)]">
      This is a floating panel anchored to the trigger.
    </p>
  </PopoverContent>
</Popover>`}
          previewClassName="flex items-center justify-center"
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <p className="text-sm font-medium">Popover Content</p>
              <p className="mt-1 text-sm text-[var(--velora-text-tertiary)]">
                This is a floating panel anchored to the trigger.
              </p>
            </PopoverContent>
          </Popover>
        </ComponentPreview>
      </DocSection>

      <DocSection title="API Reference">
        <PropsTable
          props={[
            {
              name: "Popover",
              type: "Component",
              description: "Root container that manages open state and positioning context.",
            },
            {
              name: "PopoverTrigger",
              type: "Component",
              description: "Element that toggles the popover open on click.",
            },
            {
              name: "PopoverContent",
              type: "Component",
              description: "Floating panel containing the popover content. Auto-aligns to the trigger.",
            },
            {
              name: "open",
              type: "boolean",
              description: "Controls the open state for a controlled popover.",
            },
            {
              name: "onOpenChange",
              type: "(open: boolean) => void",
              description: "Callback fired when the popover requests to open or close.",
            },
            {
              name: "sideOffset",
              type: "number",
              default: "4",
              description: "Distance in pixels between the trigger and the popover content.",
            },
          ]}
        />
      </DocSection>

      <DocsPageNav
        prev={{ title: "Navigation Menu", href: "/docs/components/navigation-menu" }}
        next={{ title: "Progress", href: "/docs/components/progress" }}
      />
    </>
  );
}
