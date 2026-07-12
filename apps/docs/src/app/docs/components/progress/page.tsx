import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview, PropsTable } from "@/components/ComponentPreview";
import { Separator } from "@velora/core";
import { Progress, CircularProgress } from "@velora/core";

export const metadata: Metadata = {
  title: "Progress — Velora UI",
  description:
    "Linear and circular progress indicators for showing completion status with multiple variants.",
};

export default function ProgressPage() {
  return (
    <>
      <DocsPageHeader
        title="Progress"
        description="Linear and circular progress indicators for showing completion status. Supports multiple variants, configurable values, and accessible labels."
        badges={["Accessible", "Animated"]}
      />

      <DocSection title="Installation">
        <DocCodeBlock
          code={`import { Progress, CircularProgress } from "@velora/core";`}
        />
      </DocSection>

      <DocSection title="Usage">
        <ComponentPreview
          title="Progress bars at different values"
          code={`<Progress value={25} />
<Progress value={50} />
<Progress value={75} />
<Progress value={100} />`}
          previewClassName="flex flex-col gap-4 w-full max-w-md"
        >
          <Progress value={25} />
          <Progress value={50} />
          <Progress value={75} />
          <Progress value={100} />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Variants">
        <ComponentPreview
          title="Progress bar variants"
          code={`<Progress value={60} variant="default" />
<Progress value={60} variant="success" />
<Progress value={60} variant="warning" />
<Progress value={60} variant="danger" />`}
          previewClassName="flex flex-col gap-4 w-full max-w-md"
        >
          <Progress value={60} variant="default" />
          <Progress value={60} variant="success" />
          <Progress value={60} variant="warning" />
          <Progress value={60} variant="danger" />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Circular">
        <ComponentPreview
          title="Circular progress indicators"
          code={`<CircularProgress value={25} size={48} />
<CircularProgress value={50} size={48} />
<CircularProgress value={75} size={48} />`}
          previewClassName="flex items-center gap-6"
        >
          <CircularProgress value={25} size={48} />
          <CircularProgress value={50} size={48} />
          <CircularProgress value={75} size={48} />
        </ComponentPreview>
      </DocSection>

      <DocSection title="API Reference">
        <PropsTable
          props={[
            {
              name: "value",
              type: "number",
              required: true,
              description: "Current progress value between 0 and max.",
            },
            {
              name: "max",
              type: "number",
              default: "100",
              description: "Maximum value of the progress range.",
            },
            {
              name: "variant",
              type: '"default" | "success" | "warning" | "danger"',
              default: '"default"',
              description: "Visual variant controlling the color of the progress indicator.",
            },
            {
              name: "size",
              type: "number",
              description: "Height in pixels for linear, or diameter for circular progress.",
            },
            {
              name: "label",
              type: "string",
              description: "Accessible label announced by screen readers.",
            },
            {
              name: "showValue",
              type: "boolean",
              default: "false",
              description: "Displays the current value as a percentage next to the bar.",
            },
          ]}
        />
      </DocSection>

      <DocsPageNav
        prev={{ title: "Popover", href: "/docs/components/popover" }}
        next={{ title: "Scroll Area", href: "/docs/components/scroll-area" }}
      />
    </>
  );
}
