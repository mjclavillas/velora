import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview, PropsTable } from "@/components/ComponentPreview";
import { Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "Select — Velora UI",
  description:
    "Dropdown select with searchable options, grouping, custom rendering, and keyboard navigation.",
};

const basicCode = `import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@velora/core";

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Choose an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="one">Option One</SelectItem>
    <SelectItem value="two">Option Two</SelectItem>
    <SelectItem value="three">Option Three</SelectItem>
  </SelectContent>
</Select>`;

const groupedCode = `import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectGroup, SelectLabel } from "@velora/core";

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select a framework" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Frontend</SelectLabel>
      <SelectItem value="react">React</SelectItem>
      <SelectItem value="vue">Vue</SelectItem>
      <SelectItem value="svelte">Svelte</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>Backend</SelectLabel>
      <SelectItem value="node">Node.js</SelectItem>
      <SelectItem value="python">Python</SelectItem>
      <SelectItem value="go">Go</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`;

export default function SelectPage() {
  return (
    <>
      <DocsPageHeader
        title="Select"
        description="Dropdown select component with searchable options, grouped items, custom rendering, and full keyboard navigation. Built on Radix UI."
        badges={["Radix Select", "Keyboard Nav"]}
      />

      <DocSection title="Installation">
        <DocCodeBlock
          code={`import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@velora/core";`}
        />
      </DocSection>

      <DocSection title="Usage">
        <DocCodeBlock
          title="Basic select with placeholder"
          code={basicCode}
        />
      </DocSection>

      <DocSection title="Grouped Options">
        <DocCodeBlock
          title="Select with grouped items"
          code={groupedCode}
        />
      </DocSection>

      <DocSection title="API Reference">
        <PropsTable
          props={[
            {
              name: "Select",
              type: "Component",
              description: "Root container that manages select state and context.",
            },
            {
              name: "SelectTrigger",
              type: "Component",
              description: "Button that displays the current value and toggles the dropdown.",
            },
            {
              name: "SelectValue",
              type: "Component",
              description: "Renders the selected value or placeholder text.",
            },
            {
              name: "SelectContent",
              type: "Component",
              description: "Floating panel containing the list of options.",
            },
            {
              name: "SelectItem",
              type: "Component",
              description: "Individual selectable option.",
            },
            {
              name: "value",
              type: "string",
              description: "Controlled value for the select.",
            },
            {
              name: "onValueChange",
              type: "(value: string) => void",
              description: "Callback fired when a new option is selected.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables the select trigger.",
            },
          ]}
        />
      </DocSection>

      <DocsPageNav
        prev={{ title: "Scroll Area", href: "/docs/components/scroll-area" }}
        next={{ title: "Separator", href: "/docs/components/separator" }}
      />
    </>
  );
}
