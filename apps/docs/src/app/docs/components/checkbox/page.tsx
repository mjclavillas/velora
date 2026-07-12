import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview, PropsTable } from "@/components/ComponentPreview";
import { Checkbox, Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "Checkbox — Velora UI",
  description: "Accessible checkbox with label, description, and keyboard navigation.",
};

export default function CheckboxPage() {
  return (
    <>
      <DocsPageHeader
        title="Checkbox"
        description="Accessible checkbox with label, description, and keyboard navigation. Built on Radix UI primitives."
        badges={["Radix Primitives"]}
      />

      <DocSection title="Installation">
        <DocCodeBlock code={`import { Checkbox } from "@velora/core";`} />
      </DocSection>

      <DocSection title="Usage">
        <ComponentPreview
          code={`<Checkbox label="Accept terms and conditions" />`}
        >
          <Checkbox label="Accept terms and conditions" />
        </ComponentPreview>
      </DocSection>

      <DocSection title="With description">
        <ComponentPreview
          code={`<Checkbox
  label="Enable notifications"
  description="Receive email notifications for important updates."
  defaultChecked
/>`}
        >
          <Checkbox
            label="Enable notifications"
            description="Receive email notifications for important updates."
            defaultChecked
          />
        </ComponentPreview>
      </DocSection>

      <DocSection title="States">
        <ComponentPreview
          title="Checked and disabled"
          code={`<Checkbox label="Checked option" defaultChecked />
<Checkbox label="Disabled option" disabled />
<Checkbox label="Disabled checked" defaultChecked disabled />`}
          previewClassName="flex flex-col items-start gap-3"
        >
          <Checkbox label="Checked option" defaultChecked />
          <Checkbox label="Disabled option" disabled />
          <Checkbox label="Disabled checked" defaultChecked disabled />
        </ComponentPreview>
      </DocSection>

      <DocSection title="API Reference">
        <PropsTable
          props={[
            {
              name: "label",
              type: "string",
              required: true,
              description: "Label text displayed beside the checkbox.",
            },
            {
              name: "description",
              type: "string",
              description: "Optional description text shown below the label.",
            },
            {
              name: "checked",
              type: "boolean",
              description: "Controlled checked state. Use with onCheckedChange for controlled behavior.",
            },
            {
              name: "defaultChecked",
              type: "boolean",
              default: "false",
              description: "Initial checked state for uncontrolled usage.",
            },
            {
              name: "onCheckedChange",
              type: "(checked: boolean) => void",
              description: "Callback fired when the checked state changes.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables the checkbox.",
            },
            {
              name: "name",
              type: "string",
              description: "HTML name attribute for form integration.",
            },
          ]}
        />
      </DocSection>

      <DocsPageNav
        prev={{ title: "Card", href: "/docs/components/card" }}
        next={{ title: "Command", href: "/docs/components/command" }}
      />
    </>
  );
}
