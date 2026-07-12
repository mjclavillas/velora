import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview, PropsTable } from "@/components/ComponentPreview";
import { Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "Sidebar — Velora UI",
  description:
    "Collapsible sidebar navigation with rail mode, mobile responsive behavior, and flexible composition.",
};

const basicCode = `import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarItem,
  SidebarCollapseButton,
} from "@velora/core";

<SidebarProvider>
  <Sidebar>
    <SidebarHeader>
      <span className="font-semibold">My App</span>
      <SidebarCollapseButton />
    </SidebarHeader>
    <SidebarContent>
      <SidebarItem href="/dashboard" active>Dashboard</SidebarItem>
      <SidebarItem href="/users">Users</SidebarItem>
      <SidebarItem href="/settings">Settings</SidebarItem>
    </SidebarContent>
    <SidebarFooter>
      <SidebarItem href="/logout">Log out</SidebarItem>
    </SidebarFooter>
  </Sidebar>
</SidebarProvider>`;

const groupCode = `import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
} from "@velora/core";

<SidebarProvider>
  <Sidebar>
    <SidebarHeader>
      <span className="font-semibold">Acme Inc</span>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarItem href="/dashboard" active>Dashboard</SidebarItem>
        <SidebarItem href="/analytics">Analytics</SidebarItem>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Management</SidebarGroupLabel>
        <SidebarItem href="/users">Users</SidebarItem>
        <SidebarItem href="/roles">Roles</SidebarItem>
        <SidebarItem href="/billing">Billing</SidebarItem>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</SidebarProvider>`;

export default function SidebarPage() {
  return (
    <>
      <DocsPageHeader
        title="Sidebar"
        description="Collapsible sidebar navigation with rail mode, mobile responsive behavior, grouped items, and flexible composition."
        badges={["Composition", "Responsive"]}
      />

      <DocSection title="Installation">
        <DocCodeBlock
          code={`import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarItem, SidebarCollapseButton } from "@velora/core";`}
        />
      </DocSection>

      <DocSection title="Usage">
        <DocCodeBlock
          title="Basic sidebar with header, content, and footer"
          code={basicCode}
        />
      </DocSection>

      <DocSection title="Grouped Items">
        <DocCodeBlock
          title="Sidebar with grouped navigation sections"
          code={groupCode}
        />
      </DocSection>

      <DocSection title="API Reference">
        <PropsTable
          props={[
            {
              name: "SidebarProvider",
              type: "Component",
              description: "Context provider that manages sidebar open/collapsed state.",
            },
            {
              name: "Sidebar",
              type: "Component",
              description: "Root sidebar container. Renders as a persistent or overlay panel.",
            },
            {
              name: "SidebarHeader",
              type: "Component",
              description: "Top section of the sidebar, typically for branding or a collapse button.",
            },
            {
              name: "SidebarContent",
              type: "Component",
              description: "Scrollable middle section containing navigation items.",
            },
            {
              name: "SidebarFooter",
              type: "Component",
              description: "Bottom section of the sidebar, typically for user info or logout.",
            },
            {
              name: "SidebarItem",
              type: "Component",
              description: "Individual navigation link. Accepts href, active, and icon props.",
            },
            {
              name: "SidebarGroup",
              type: "Component",
              description: "Groups related sidebar items with a shared label.",
            },
            {
              name: "SidebarCollapseButton",
              type: "Component",
              description: "Button that toggles the sidebar between expanded and collapsed states.",
            },
            {
              name: "defaultOpen",
              type: "boolean",
              default: "true",
              description: "Initial open state of the sidebar.",
            },
          ]}
        />
      </DocSection>

      <DocsPageNav
        prev={{ title: "Separator", href: "/docs/components/separator" }}
        next={{ title: "Skeleton", href: "/docs/components/skeleton" }}
      />
    </>
  );
}
