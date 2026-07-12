import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview, PropsTable } from "@/components/ComponentPreview";
import { Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "Separator — Velora UI",
  description:
    "Visual divider for organizing content, supporting horizontal and vertical orientations.",
};

export default function SeparatorPage() {
  return (
    <>
      <DocsPageHeader
        title="Separator"
        description="Visual divider for organizing content. Supports horizontal and vertical orientations with semantic HTML."
        badges={["Radix Separator", "Accessible"]}
      />

      <DocSection title="Installation">
        <DocCodeBlock code={`import { Separator } from "@velora/core";`} />
      </DocSection>

      <DocSection title="Usage">
        <ComponentPreview
          title="Horizontal separator"
          code={`<div>
  <h4 className="text-sm font-medium">Velora UI</h4>
  <p className="text-sm text-[var(--velora-text-tertiary)]">An open-source design system.</p>
  <Separator className="my-4" />
  <div className="flex h-5 items-center space-x-4 text-sm">
    <span>Blog</span>
    <span>Docs</span>
    <span>GitHub</span>
  </div>
</div>`}
          previewClassName="flex justify-center"
        >
          <div className="w-full max-w-sm">
            <h4 className="text-sm font-medium">Velora UI</h4>
            <p className="text-sm text-[var(--velora-text-tertiary)]">An open-source design system.</p>
            <Separator className="my-4" />
            <div className="flex h-5 items-center space-x-4 text-sm">
              <span>Blog</span>
              <span>Docs</span>
              <span>GitHub</span>
            </div>
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Vertical Separator">
        <ComponentPreview
          title="Vertical orientation"
          code={`<div className="flex h-5 items-center space-x-4">
  <span className="text-sm">Blog</span>
  <Separator orientation="vertical" />
  <span className="text-sm">Docs</span>
  <Separator orientation="vertical" />
  <span className="text-sm">GitHub</span>
</div>`}
          previewClassName="flex items-center justify-center"
        >
          <div className="flex h-5 items-center space-x-4">
            <span className="text-sm">Blog</span>
            <Separator orientation="vertical" />
            <span className="text-sm">Docs</span>
            <Separator orientation="vertical" />
            <span className="text-sm">GitHub</span>
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="API Reference">
        <PropsTable
          props={[
            {
              name: "orientation",
              type: '"horizontal" | "vertical"',
              default: '"horizontal"',
              description: "Direction of the separator line.",
            },
            {
              name: "decorative",
              type: "boolean",
              default: "false",
              description: "When true, the separator is purely visual and not exposed to assistive technologies.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes to apply to the separator.",
            },
          ]}
        />
      </DocSection>

      <DocsPageNav
        prev={{ title: "Select", href: "/docs/components/select" }}
        next={{ title: "Sidebar", href: "/docs/components/sidebar" }}
      />
    </>
  );
}
