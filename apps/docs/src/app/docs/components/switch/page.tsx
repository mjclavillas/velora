import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview, PropsTable } from "@/components/ComponentPreview";
import { Separator } from "@velora/core";
import { Switch } from "@velora/core";

export const metadata: Metadata = {
  title: "Switch — Velora UI",
  description:
    "Toggle switch for binary on/off states with optional label, disabled state, and accessible markup.",
};

export default function SwitchPage() {
  return (
    <>
      <DocsPageHeader
        title="Switch"
        description="Toggle switch for binary on/off states. Supports optional labels, disabled state, and full keyboard accessibility."
        badges={["Radix Switch", "Accessible"]}
      />

      <DocSection title="Installation">
        <DocCodeBlock code={`import { Switch } from "@velora/core";`} />
      </DocSection>

      <DocSection title="Usage">
        <ComponentPreview
          title="Basic switch toggles"
          code={`<Switch />
<Switch label="Enable notifications" />
<Switch label="Dark mode" defaultChecked />`}
          previewClassName="flex flex-col gap-4"
        >
          <Switch />
          <Switch label="Enable notifications" />
          <Switch label="Dark mode" defaultChecked />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Disabled State">
        <ComponentPreview
          title="Disabled switches"
          code={`<Switch disabled />
<Switch disabled label="Unavailable option" />
<Switch disabled defaultChecked label="Locked on" />`}
          previewClassName="flex flex-col gap-4"
        >
          <Switch disabled />
          <Switch disabled label="Unavailable option" />
          <Switch disabled defaultChecked label="Locked on" />
        </ComponentPreview>
      </DocSection>

      <DocSection title="API Reference">
        <PropsTable
          props={[
            {
              name: "checked",
              type: "boolean",
              description: "Controlled checked state of the switch.",
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
              description: "Callback fired when the switch is toggled.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables the switch, preventing user interaction.",
            },
            {
              name: "label",
              type: "string",
              description: "Optional label text rendered next to the switch.",
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
        prev={{ title: "Spinner", href: "/docs/components/spinner" }}
        next={{ title: "Tabs", href: "/docs/components/tabs" }}
      />
    </>
  );
}
