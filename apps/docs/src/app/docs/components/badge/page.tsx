import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview, PropsTable } from "@/components/ComponentPreview";
import { Badge, Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "Badge — Velora UI",
  description: "Labels and status indicators with variants, sizes, icons, and pulse dot.",
};

export default function BadgePage() {
  return (
    <>
      <DocsPageHeader
        title="Badge"
        description="Compact labels and status indicators with 10+ visual variants including gradient, success, warning, and an animated pulse dot."
        badges={["CVA"]}
      />

      <DocSection title="Installation">
        <DocCodeBlock code={`import { Badge } from "@velora/core";`} />
      </DocSection>

      <DocSection title="Usage">
        <ComponentPreview
          code={`<Badge variant="default">Default</Badge>`}
        >
          <Badge variant="default">Default</Badge>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Variants">
        <ComponentPreview
          title="All variants"
          code={`<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="gradient">Gradient</Badge>
<Badge variant="glass">Glass</Badge>`}
          previewClassName="flex flex-wrap gap-3"
        >
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="gradient">Gradient</Badge>
          <Badge variant="glass">Glass</Badge>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Sizes">
        <ComponentPreview
          title="Size scale"
          code={`<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`}
          previewClassName="flex items-center gap-3"
        >
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Pulse dot">
        <ComponentPreview
          title="With animated pulse dot"
          code={`<Badge dot>Online</Badge>
<Badge variant="success" dot>Active</Badge>
<Badge variant="warning" dot>Away</Badge>
<Badge variant="danger" dot>Offline</Badge>`}
          previewClassName="flex flex-wrap gap-3"
        >
          <Badge dot>Online</Badge>
          <Badge variant="success" dot>Active</Badge>
          <Badge variant="warning" dot>Away</Badge>
          <Badge variant="danger" dot>Offline</Badge>
        </ComponentPreview>
      </DocSection>

      <DocSection title="API Reference">
        <PropsTable
          props={[
            {
              name: "variant",
              type: '"default" | "secondary" | "outline" | "solid" | "success" | "warning" | "danger" | "info" | "gradient" | "glass"',
              default: '"default"',
              description: "Visual variant of the badge.",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: "Size preset controlling height and padding.",
            },
            {
              name: "icon",
              type: "ReactNode",
              description: "Optional icon rendered before the label.",
            },
            {
              name: "dot",
              type: "boolean",
              default: "false",
              description: "Shows an animated pulse dot before the label.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes applied to the badge.",
            },
          ]}
        />
      </DocSection>

      <DocsPageNav
        prev={{ title: "Avatar", href: "/docs/components/avatar" }}
        next={{ title: "Button", href: "/docs/components/button" }}
      />
    </>
  );
}
