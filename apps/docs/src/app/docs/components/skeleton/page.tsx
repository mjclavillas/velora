import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview, PropsTable } from "@/components/ComponentPreview";
import { Separator } from "@velora/core";
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonTable } from "@velora/core";

export const metadata: Metadata = {
  title: "Skeleton — Velora UI",
  description:
    "Loading skeleton placeholders for text, avatars, cards, and tables with configurable dimensions.",
};

export default function SkeletonPage() {
  return (
    <>
      <DocsPageHeader
        title="Skeleton"
        description="Loading skeleton placeholders for text, avatars, cards, and tables. Provides realistic content placeholders during data loading states."
        badges={["Loading State", "Animated"]}
      />

      <DocSection title="Installation">
        <DocCodeBlock
          code={`import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonTable } from "@velora/core";`}
        />
      </DocSection>

      <DocSection title="Usage">
        <ComponentPreview
          title="Skeleton loading states"
          code={`<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-4 w-[200px]" />
<Skeleton className="h-4 w-[300px]" />`}
          previewClassName="flex flex-col gap-3 w-full max-w-sm"
        >
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Avatar Skeleton">
        <ComponentPreview
          title="SkeletonAvatar"
          code={`<SkeletonAvatar size="sm" />
<SkeletonAvatar size="md" />
<SkeletonAvatar size="lg" />`}
          previewClassName="flex items-center gap-4"
        >
          <SkeletonAvatar size="sm" />
          <SkeletonAvatar size="md" />
          <SkeletonAvatar size="lg" />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Text Skeleton">
        <ComponentPreview
          title="SkeletonText with multiple lines"
          code={`<SkeletonText lines={3} />
<SkeletonText lines={5} />`}
          previewClassName="flex flex-col gap-6 w-full max-w-sm"
        >
          <SkeletonText lines={3} />
          <SkeletonText lines={5} />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Card & Table Skeleton">
        <ComponentPreview
          title="SkeletonCard and SkeletonTable"
          code={`<SkeletonCard />
<SkeletonTable rows={4} columns={3} />`}
          previewClassName="flex flex-col gap-6 w-full max-w-md"
        >
          <SkeletonCard />
          <SkeletonTable rows={4} columns={3} />
        </ComponentPreview>
      </DocSection>

      <DocSection title="API Reference">
        <PropsTable
          props={[
            {
              name: "Skeleton",
              type: "Component",
              description: "Base skeleton element. Accepts className for custom width, height, and border radius.",
            },
            {
              name: "SkeletonText",
              type: "Component",
              description: "Renders multiple text line placeholders.",
            },
            {
              name: "SkeletonAvatar",
              type: "Component",
              description: "Renders a circular or rounded avatar placeholder.",
            },
            {
              name: "SkeletonCard",
              type: "Component",
              description: "Renders a card-shaped placeholder with image, title, and text lines.",
            },
            {
              name: "SkeletonTable",
              type: "Component",
              description: "Renders a table placeholder with configurable rows and columns.",
            },
            {
              name: "lines",
              type: "number",
              default: "3",
              description: "Number of text lines to render (SkeletonText only).",
            },
            {
              name: "size",
              type: "number",
              description: "Width and height in pixels for avatar skeletons.",
            },
            {
              name: "rows",
              type: "number",
              default: "5",
              description: "Number of table rows to render.",
            },
            {
              name: "columns",
              type: "number",
              default: "4",
              description: "Number of table columns to render.",
            },
          ]}
        />
      </DocSection>

      <DocsPageNav
        prev={{ title: "Sidebar", href: "/docs/components/sidebar" }}
        next={{ title: "Spinner", href: "/docs/components/spinner" }}
      />
    </>
  );
}
