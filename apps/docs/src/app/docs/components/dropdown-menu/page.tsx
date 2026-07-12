import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview, PropsTable } from "@/components/ComponentPreview";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Button,
} from "@velora/core";

export const metadata: Metadata = {
  title: "DropdownMenu — Velora UI",
  description:
    "Dropdown menu with icon support, keyboard shortcuts, separators, and destructive item variants.",
};

const basicCode = `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem shortcut="⌘P">Profile</DropdownMenuItem>
    <DropdownMenuItem shortcut="⌘B">Billing</DropdownMenuItem>
    <DropdownMenuItem shortcut="⌘S">Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem shortcut="⌘N">New Team</DropdownMenuItem>
    <DropdownMenuItem destructive>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;

export default function DropdownMenuPage() {
  return (
    <>
      <DocsPageHeader
        title="DropdownMenu"
        description="Floating dropdown menu with icon support, keyboard shortcuts, separators, and destructive item variants. Built on Radix UI."
        badges={["Radix Menu", "Keyboard Nav"]}
      />

      <DocSection title="Installation">
        <DocCodeBlock
          code={`import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@velora/core";`}
        />
      </DocSection>

      <DocSection title="Usage">
        <ComponentPreview
          title="Dropdown with shortcuts and separators"
          code={basicCode}
          previewClassName="flex items-center justify-center"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem shortcut="⌘P">Profile</DropdownMenuItem>
              <DropdownMenuItem shortcut="⌘B">Billing</DropdownMenuItem>
              <DropdownMenuItem shortcut="⌘S">Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem shortcut="⌘N">New Team</DropdownMenuItem>
              <DropdownMenuItem destructive>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ComponentPreview>
      </DocSection>

      <DocSection title="API Reference">
        <PropsTable
          props={[
            {
              name: "DropdownMenu",
              type: "Component",
              description: "Root container that manages open state and context for all menu parts.",
            },
            {
              name: "DropdownMenuTrigger",
              type: "Component",
              description: "Button or element that toggles the menu open on click.",
            },
            {
              name: "DropdownMenuContent",
              type: "Component",
              description: "Floating panel containing the menu items. Auto-aligns to the trigger.",
            },
            {
              name: "DropdownMenuItem",
              type: "Component",
              description: "Individual menu action. Supports shortcut, separator, and destructive props.",
            },
            {
              name: "shortcut",
              type: "string",
              description: "Keyboard shortcut hint displayed on the right side of the item.",
            },
            {
              name: "separator",
              type: "boolean",
              default: "false",
              description: "Renders a visual separator above this item.",
            },
            {
              name: "destructive",
              type: "boolean",
              default: "false",
              description: "Applies destructive styling to the item.",
            },
          ]}
        />
      </DocSection>

      <DocsPageNav
        prev={{ title: "Dialog", href: "/docs/components/dialog" }}
        next={{ title: "Form", href: "/docs/components/form" }}
      />
    </>
  );
}
