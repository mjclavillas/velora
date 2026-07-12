import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview, PropsTable } from "@/components/ComponentPreview";
import { Input } from "@velora/core";
import { Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Input — Velora UI",
  description:
    "Text input with label, helper text, error state, icon prefix, and password toggle.",
};

export default function InputPage() {
  return (
    <>
      <DocsPageHeader
        title="Input"
        description="Text input with label, helper text, error state, icon prefix, and password toggle. Supports all standard HTML input types."
        badges={["Form Field", "Accessible"]}
      />

      <DocSection title="Installation">
        <DocCodeBlock code={`import { Input } from "@velora/core";`} />
      </DocSection>

      <DocSection title="Usage">
        <ComponentPreview
          title="Input with label and helper text"
          code={`<Input label="Email" placeholder="Enter your email" helperText="We'll never share your email." />`}
          previewClassName="flex justify-center"
        >
          <div className="w-full max-w-sm">
            <Input label="Email" placeholder="Enter your email" helperText="We'll never share your email." />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Error State">
        <ComponentPreview
          title="Input with validation error"
          code={`<Input label="Password" type="password" placeholder="Enter password" errorMessage="Password must be at least 8 characters." />`}
          previewClassName="flex justify-center"
        >
          <div className="w-full max-w-sm">
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              errorMessage="Password must be at least 8 characters."
            />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="With Icon">
        <ComponentPreview
          title="Icon prefix"
          code={`<Input label="Search" placeholder="Search components..." leadingIcon={<Search />} />`}
          previewClassName="flex justify-center"
        >
          <div className="w-full max-w-sm">
            <Input label="Search" placeholder="Search components..." leadingIcon={<Search />} />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="API Reference">
        <PropsTable
          props={[
            {
              name: "label",
              type: "string",
              description: "Label text rendered above the input field.",
            },
            {
              name: "placeholder",
              type: "string",
              description: "Placeholder text shown when the input is empty.",
            },
            {
              name: "helperText",
              type: "string",
              description: "Helper text displayed below the input for additional context.",
            },
            {
              name: "error",
              type: "string",
              description: "Error message displayed below the input. Replaces helperText when set.",
            },
            {
              name: "icon",
              type: "string",
              description: "Icon name rendered as a prefix inside the input field.",
            },
            {
              name: "type",
              type: "string",
              default: '"text"',
              description: "HTML input type. Supports text, password, email, number, etc.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables the input field.",
            },
          ]}
        />
      </DocSection>

      <DocsPageNav
        prev={{ title: "Form", href: "/docs/components/form" }}
        next={{ title: "Navigation Menu", href: "/docs/components/navigation-menu" }}
      />
    </>
  );
}
