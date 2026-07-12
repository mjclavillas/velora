import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview, PropsTable } from "@/components/ComponentPreview";
import { Separator } from "@velora/core";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  Button,
} from "@velora/core";

export const metadata: Metadata = {
  title: "Dialog — Velora UI",
  description:
    "Modal dialog with header, body, and footer composition. Supports variants for standard and alert use cases.",
};

const basicCode = `<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. Your account will be permanently deleted.
      </DialogDescription>
    </DialogHeader>
    <DialogBody>
      <p className="text-sm text-[var(--velora-text-secondary)]">
        Please confirm that you want to proceed with this action.
      </p>
    </DialogBody>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Delete Account</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`;

const alertCode = `<Dialog variant="alert">
  <DialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Warning</DialogTitle>
      <DialogDescription>
        This action requires your immediate attention.
      </DialogDescription>
    </DialogHeader>
    <DialogBody>
      <p>Are you sure you want to delete all selected items?</p>
    </DialogBody>
    <DialogFooter>
      <Button>Cancel</Button>
      <Button variant="destructive">Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`;

export default function DialogPage() {
  return (
    <>
      <DocsPageHeader
        title="Dialog"
        description="Modal dialog overlay with composable header, body, and footer sections. Supports standard and alert variants for different interaction patterns."
        badges={["Radix Dialog", "Composition"]}
      />

      <DocSection title="Installation">
        <DocCodeBlock
          code={`import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter } from "@velora/core";`}
        />
      </DocSection>

      <DocSection title="Usage">
        <ComponentPreview
          title="Basic dialog"
          code={basicCode}
          previewClassName="flex items-center justify-center"
        >
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. Your account will be permanently deleted.
                </DialogDescription>
              </DialogHeader>
              <DialogBody>
                <p className="text-sm text-[var(--velora-text-secondary)]">
                  Please confirm that you want to proceed with this action.
                </p>
              </DialogBody>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button variant="destructive">Delete Account</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Alert Variant">
        <DocCodeBlock title="variant=&quot;alert&quot;" code={alertCode} />
      </DocSection>

      <DocSection title="API Reference">
        <PropsTable
          props={[
            {
              name: "variant",
              type: '"default" | "alert"',
              default: '"default"',
              description: "Controls the visual style. Alert variant uses a more prominent destructive styling.",
            },
            {
              name: "open",
              type: "boolean",
              description: "Controls the open state of the dialog when used as a controlled component.",
            },
            {
              name: "onOpenChange",
              type: "(open: boolean) => void",
              description: "Callback fired when the dialog requests to open or close.",
            },
          ]}
        />
      </DocSection>

      <DocsPageNav
        prev={{ title: "DataTable", href: "/docs/components/data-table" }}
        next={{ title: "Dropdown Menu", href: "/docs/components/dropdown-menu" }}
      />
    </>
  );
}
