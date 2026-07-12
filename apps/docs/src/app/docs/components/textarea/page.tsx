import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview, PropsTable } from "@/components/ComponentPreview";
import { Separator } from "@velora/core";
import { Textarea } from "@velora/core";

export const metadata: Metadata = {
  title: "Textarea — Velora UI",
  description:
    "Multi-line text input with label, helper text, character count, and validation states.",
};

export default function TextareaPage() {
  return (
    <>
      <DocsPageHeader
        title="Textarea"
        description="Multi-line text input with label, helper text, character count, and validation states. Supports auto-resize and controlled modes."
        badges={["Form Field", "Accessible"]}
      />

      <DocSection title="Installation">
        <DocCodeBlock code={`import { Textarea } from "@velora/core";`} />
      </DocSection>

      <DocSection title="Usage">
        <ComponentPreview
          title="Textarea with label"
          code={`<Textarea label="Message" placeholder="Type your message here..." rows={4} />`}
          previewClassName="flex justify-center"
        >
          <div className="w-full max-w-md">
            <Textarea label="Message" placeholder="Type your message here..." rows={4} />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="With Helper Text">
        <ComponentPreview
          title="Textarea with helper text and character limit"
          code={`<Textarea
  label="Bio"
  placeholder="Tell us about yourself..."
  helperText="Max 500 characters"
  maxLength={500}
  rows={4}
/>`}
          previewClassName="flex justify-center"
        >
          <div className="w-full max-w-md">
            <Textarea
              label="Bio"
              placeholder="Tell us about yourself..."
              helperText="Max 500 characters"
              maxLength={500}
              rows={4}
            />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Error State">
        <ComponentPreview
          title="Textarea with validation error"
          code={`<Textarea
  label="Feedback"
  placeholder="Provide your feedback..."
  errorMessage="This field is required."
  rows={3}
/>`}
          previewClassName="flex justify-center"
        >
          <div className="w-full max-w-md">
            <Textarea
              label="Feedback"
              placeholder="Provide your feedback..."
              errorMessage="This field is required."
              rows={3}
            />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="API Reference">
        <PropsTable
          props={[
            {
              name: "label",
              type: "string",
              description: "Label text rendered above the textarea.",
            },
            {
              name: "placeholder",
              type: "string",
              description: "Placeholder text shown when the textarea is empty.",
            },
            {
              name: "helperText",
              type: "string",
              description: "Helper text displayed below the textarea.",
            },
            {
              name: "error",
              type: "string",
              description: "Error message displayed below the textarea. Replaces helperText when set.",
            },
            {
              name: "rows",
              type: "number",
              default: "3",
              description: "Number of visible text rows.",
            },
            {
              name: "maxLength",
              type: "number",
              description: "Maximum character count for the textarea.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables the textarea field.",
            },
          ]}
        />
      </DocSection>

      <DocsPageNav
        prev={{ title: "Tabs", href: "/docs/components/tabs" }}
        next={{ title: "Toast", href: "/docs/components/toast" }}
      />
    </>
  );
}
