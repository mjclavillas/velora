import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview, PropsTable } from "@/components/ComponentPreview";
import { Separator } from "@velora/core";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent, SimpleTooltip, Button } from "@velora/core";

export const metadata: Metadata = {
  title: "Tooltip — Velora UI",
  description:
    "Hover tooltips for showing contextual information with a simple shorthand or fully composed API.",
};

export default function TooltipPage() {
  return (
    <>
      <DocsPageHeader
        title="Tooltip"
        description="Hover tooltips for showing contextual information. Supports a simple shorthand API and a fully composed API with custom content and positioning."
        badges={["Radix Tooltip", "Accessible"]}
      />

      <DocSection title="Installation">
        <DocCodeBlock
          code={`import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent, SimpleTooltip } from "@velora/core";`}
        />
      </DocSection>

      <DocSection title="Usage">
        <ComponentPreview
          title="Simple tooltip on hover"
          code={`<SimpleTooltip content="Click to save your changes">
  <Button>Save</Button>
</SimpleTooltip>`}
          previewClassName="flex items-center justify-center"
        >
          <TooltipProvider>
            <SimpleTooltip content="Click to save your changes">
              <Button>Save</Button>
            </SimpleTooltip>
          </TooltipProvider>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Composed API">
        <ComponentPreview
          title="Full composition with custom content"
          code={`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p className="font-medium">Keyboard shortcut</p>
      <p className="text-xs text-[var(--velora-text-tertiary)]">⌘ + S</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`}
          previewClassName="flex items-center justify-center"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-medium">Keyboard shortcut</p>
                <p className="text-xs text-[var(--velora-text-tertiary)]">⌘ + S</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </ComponentPreview>
      </DocSection>

      <DocSection title="API Reference">
        <PropsTable
          props={[
            {
              name: "Tooltip",
              type: "Component",
              description: "Root container that manages tooltip visibility and positioning context.",
            },
            {
              name: "TooltipTrigger",
              type: "Component",
              description: "Element that triggers the tooltip on hover or focus.",
            },
            {
              name: "TooltipContent",
              type: "Component",
              description: "Floating panel containing the tooltip content.",
            },
            {
              name: "SimpleTooltip",
              type: "Component",
              description: "Shorthand component that wraps a trigger with a tooltip in one step.",
            },
            {
              name: "content",
              type: "string",
              required: true,
              description: "Tooltip text content (SimpleTooltip only).",
            },
            {
              name: "side",
              type: '"top" | "right" | "bottom" | "left"',
              default: '"top"',
              description: "Preferred side for tooltip placement.",
            },
            {
              name: "sideOffset",
              type: "number",
              default: "4",
              description: "Distance in pixels between the trigger and the tooltip.",
            },
            {
              name: "delayDuration",
              type: "number",
              default: "200",
              description: "Delay in milliseconds before the tooltip appears.",
            },
          ]}
        />
      </DocSection>

      <DocsPageNav
        prev={{ title: "Toast", href: "/docs/components/toast" }}
      />
    </>
  );
}
