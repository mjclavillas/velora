import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview, PropsTable } from "@/components/ComponentPreview";
import { Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "Form — Velora UI",
  description:
    "Composable form components with field-level validation, error messaging, and label integration.",
};

const basicCode = `import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@velora/core";
import { Input, Button } from "@velora/core";

<Form onSubmit={handleSubmit}>
  <FormField name="username" rules={{ required: "Username is required" }}>
    <FormItem>
      <FormLabel>Username</FormLabel>
      <FormControl>
        <Input placeholder="Enter username" />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>

  <FormField
    name="email"
    rules={{
      required: "Email is required",
      pattern: {
        value: /^[^@]+@[^@]+\\.[^@]+$/,
        message: "Please enter a valid email address",
      },
    }}
  >
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input type="email" placeholder="Enter email" />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>

  <Button type="submit">Submit</Button>
</Form>`;

const validationCode = `import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@velora/core";
import { Textarea } from "@velora/core";

<FormField
  name="bio"
  rules={{
    required: "Bio is required",
    minLength: { value: 20, message: "Bio must be at least 20 characters" },
    maxLength: { value: 500, message: "Bio cannot exceed 500 characters" },
  }}
>
  <FormItem>
    <FormLabel>Bio</FormLabel>
    <FormControl>
      <Textarea placeholder="Tell us about yourself" rows={4} />
    </FormControl>
    <FormMessage />
  </FormItem>
</FormField>`;

export default function FormPage() {
  return (
    <>
      <DocsPageHeader
        title="Form"
        description="Composable form components with field-level validation, error messaging, and accessible label integration. Works with any form library."
        badges={["Validation", "Composition"]}
      />

      <DocSection title="Installation">
        <DocCodeBlock
          code={`import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@velora/core";`}
        />
      </DocSection>

      <DocSection title="Usage">
        <DocCodeBlock
          title="Form with field validation and error messages"
          code={basicCode}
        />
      </DocSection>

      <DocSection title="Validation Rules">
        <DocCodeBlock
          title="Min/max length validation on a textarea field"
          code={validationCode}
        />
      </DocSection>

      <DocSection title="API Reference">
        <PropsTable
          props={[
            {
              name: "Form",
              type: "Component",
              description: "Root form element. Accepts onSubmit and renders a <form> tag.",
            },
            {
              name: "FormField",
              type: "Component",
              description: "Connects a field to form state. Requires name and optional validation rules.",
            },
            {
              name: "name",
              type: "string",
              required: true,
              description: "The field name used as the key in form values.",
            },
            {
              name: "rules",
              type: "ValidationRules",
              description: "Validation rules including required, pattern, minLength, and maxLength.",
            },
            {
              name: "FormItem",
              type: "Component",
              description: "Layout wrapper that groups label, control, and message for a field.",
            },
            {
              name: "FormLabel",
              type: "Component",
              description: "Accessible label linked to the form control via htmlFor.",
            },
            {
              name: "FormControl",
              type: "Component",
              description: "Wrapper that connects the input element to field state and validation.",
            },
            {
              name: "FormMessage",
              type: "Component",
              description: "Displays validation error message for the nearest FormField.",
            },
          ]}
        />
      </DocSection>

      <DocsPageNav
        prev={{ title: "Dropdown Menu", href: "/docs/components/dropdown-menu" }}
        next={{ title: "Input", href: "/docs/components/input" }}
      />
    </>
  );
}
