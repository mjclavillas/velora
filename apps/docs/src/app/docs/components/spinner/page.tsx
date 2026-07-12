import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview, PropsTable } from "@/components/ComponentPreview";
import { Separator } from "@velora/core";
import { Spinner, SpinnerDots, SpinnerPulse, LoadingOverlay, Button } from "@velora/core";

export const metadata: Metadata = {
  title: "Spinner — Velora UI",
  description:
    "Loading indicators with multiple animation styles, sizes, and a full-screen overlay variant.",
};

export default function SpinnerPage() {
  return (
    <>
      <DocsPageHeader
        title="Spinner"
        description="Loading indicators with multiple animation styles including ring, dots, and pulse. Includes a full-screen overlay variant for blocking states."
        badges={["Loading State", "Animated"]}
      />

      <DocSection title="Installation">
        <DocCodeBlock
          code={`import { Spinner, SpinnerDots, SpinnerPulse, LoadingOverlay } from "@velora/core";`}
        />
      </DocSection>

      <DocSection title="Usage">
        <ComponentPreview
          title="Different spinner styles"
          code={`<Spinner />
<SpinnerDots />
<SpinnerPulse />`}
          previewClassName="flex items-center gap-8"
        >
          <Spinner />
          <SpinnerDots />
          <SpinnerPulse />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Sizes">
        <ComponentPreview
          title="Spinner size variants"
          code={`<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`}
          previewClassName="flex items-center gap-6"
        >
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Loading Overlay">
        <DocCodeBlock
          title="Full-screen overlay with spinner"
          code={`<LoadingOverlay isLoading={isSaving}>
  <div className="rounded-lg border p-8">
    <h3 className="text-lg font-medium">Save your changes</h3>
    <p className="mt-2 text-sm text-[var(--velora-text-tertiary)]">
      Click the button to trigger the loading overlay.
    </p>
    <Button className="mt-4" onClick={handleSave}>Save</Button>
  </div>
</LoadingOverlay>`}
        />
      </DocSection>

      <DocSection title="API Reference">
        <PropsTable
          props={[
            {
              name: "Spinner",
              type: "Component",
              description: "Ring-style spinning loader. Supports sm, md, and lg sizes.",
            },
            {
              name: "SpinnerDots",
              type: "Component",
              description: "Three-dot bouncing animation loader.",
            },
            {
              name: "SpinnerPulse",
              type: "Component",
              description: "Pulsing circle animation loader.",
            },
            {
              name: "LoadingOverlay",
              type: "Component",
              description: "Full-screen or container-level overlay with a centered spinner.",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: "Size preset controlling the spinner diameter.",
            },
            {
              name: "isLoading",
              type: "boolean",
              default: "false",
              description: "Controls whether the overlay is visible (LoadingOverlay only).",
            },
            {
              name: "label",
              type: "string",
              description: "Accessible label announced by screen readers.",
            },
          ]}
        />
      </DocSection>

      <DocsPageNav
        prev={{ title: "Skeleton", href: "/docs/components/skeleton" }}
        next={{ title: "Switch", href: "/docs/components/switch" }}
      />
    </>
  );
}
