import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview, PropsTable } from "@/components/ComponentPreview";
import { Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "Toast — Velora UI",
  description:
    "Toast notification system with multiple variants, auto-dismiss, positions, and promise-based toasts.",
};

const providerCode = `import { ToastProvider } from "@velora/core";

// Wrap your app with the provider at the root layout
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}`;

const usageCode = `import { useToast } from "@velora/core";

function SaveButton() {
  const { toast } = useToast();

  return (
    <button
      onClick={() =>
        toast({
          title: "Changes saved",
          description: "Your profile has been updated successfully.",
          variant: "success",
        })
      }
    >
      Save Changes
    </button>
  );
}`;

const variantsCode = `import { useToast } from "@velora/core";

function ToastDemos() {
  const { toast } = useToast();

  return (
    <div className="flex gap-3">
      <button onClick={() => toast({ title: "Success!", variant: "success" })}>
        Success
      </button>
      <button onClick={() => toast({ title: "Error!", variant: "error" })}>
        Error
      </button>
      <button onClick={() => toast({ title: "Warning!", variant: "warning" })}>
        Warning
      </button>
      <button onClick={() => toast({ title: "Info", variant: "info" })}>
        Info
      </button>
    </div>
  );
}`;

const promiseCode = `import { useToast } from "@velora/core";

function DeleteButton() {
  const { toast } = useToast();

  return (
    <button
      onClick={() =>
        toast.promise(deleteAccount(), {
          loading: "Deleting account...",
          success: "Account deleted successfully.",
          error: "Failed to delete account.",
        })
      }
    >
      Delete Account
    </button>
  );
}`;

export default function ToastPage() {
  return (
    <>
      <DocsPageHeader
        title="Toast"
        description="Toast notification system with multiple variants, auto-dismiss, configurable positions, and promise-based toasts for async operations."
        badges={["Provider", "Promise API"]}
      />

      <DocSection title="Installation">
        <DocCodeBlock
          code={`import { ToastProvider, useToast } from "@velora/core";`}
        />
      </DocSection>

      <DocSection title="Setup">
        <DocCodeBlock
          title="Add ToastProvider to your root layout"
          code={providerCode}
        />
      </DocSection>

      <DocSection title="Usage">
        <DocCodeBlock
          title="Trigger a toast from any component"
          code={usageCode}
        />
      </DocSection>

      <DocSection title="Variants">
        <DocCodeBlock
          title="Built-in toast variants"
          code={variantsCode}
        />
      </DocSection>

      <DocSection title="Promise Toasts">
        <DocCodeBlock
          title="Auto-manage loading, success, and error states"
          code={promiseCode}
        />
      </DocSection>

      <DocSection title="API Reference">
        <PropsTable
          props={[
            {
              name: "ToastProvider",
              type: "Component",
              description: "Root provider that manages toast state and rendering. Add once at the app root.",
            },
            {
              name: "useToast",
              type: "hook",
              description: "Returns { toast, dismiss, toasts } for triggering and managing toasts.",
            },
            {
              name: "toast.title",
              type: "string",
              required: true,
              description: "Title text displayed in the toast.",
            },
            {
              name: "toast.description",
              type: "string",
              description: "Optional description text below the title.",
            },
            {
              name: "toast.variant",
              type: '"default" | "success" | "error" | "warning" | "info"',
              default: '"default"',
              description: "Visual variant controlling the toast color and icon.",
            },
            {
              name: "toast.duration",
              type: "number",
              default: "5000",
              description: "Auto-dismiss delay in milliseconds. Set to Infinity to disable.",
            },
            {
              name: "toast.promise",
              type: "(promise, { loading, success, error }) => void",
              description: "Auto-manages toast state through a promise lifecycle.",
            },
          ]}
        />
      </DocSection>

      <DocsPageNav
        prev={{ title: "Textarea", href: "/docs/components/textarea" }}
        next={{ title: "Tooltip", href: "/docs/components/tooltip" }}
      />
    </>
  );
}
