import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview, PropsTable } from "@/components/ComponentPreview";
import { Separator } from "@velora/core";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@velora/core";

export const metadata: Metadata = {
  title: "Tabs — Velora UI",
  description:
    "Tabbed interface for organizing content into switchable panels with keyboard navigation.",
};

export default function TabsPage() {
  return (
    <>
      <DocsPageHeader
        title="Tabs"
        description="Tabbed interface for organizing content into switchable panels. Supports keyboard navigation, controlled and uncontrolled modes."
        badges={["Radix Tabs", "Keyboard Nav"]}
      />

      <DocSection title="Installation">
        <DocCodeBlock
          code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@velora/core";`}
        />
      </DocSection>

      <DocSection title="Usage">
        <ComponentPreview
          title="Tabbed interface"
          code={`<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <p className="text-sm text-[var(--velora-text-secondary)]">
      Manage your account settings and preferences.
    </p>
  </TabsContent>
  <TabsContent value="password">
    <p className="text-sm text-[var(--velora-text-secondary)]">
      Change your password here. After saving, you will be logged out.
    </p>
  </TabsContent>
  <TabsContent value="notifications">
    <p className="text-sm text-[var(--velora-text-secondary)]">
      Configure how you receive notifications.
    </p>
  </TabsContent>
</Tabs>`}
          previewClassName="flex justify-center"
        >
          <div className="w-full max-w-md">
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <p className="text-sm text-[var(--velora-text-secondary)]">
                  Manage your account settings and preferences.
                </p>
              </TabsContent>
              <TabsContent value="password">
                <p className="text-sm text-[var(--velora-text-secondary)]">
                  Change your password here. After saving, you will be logged out.
                </p>
              </TabsContent>
              <TabsContent value="notifications">
                <p className="text-sm text-[var(--velora-text-secondary)]">
                  Configure how you receive notifications.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="API Reference">
        <PropsTable
          props={[
            {
              name: "Tabs",
              type: "Component",
              description: "Root container that manages active tab state and context.",
            },
            {
              name: "TabsList",
              type: "Component",
              description: "Horizontal list container for tab triggers.",
            },
            {
              name: "TabsTrigger",
              type: "Component",
              description: "Button that activates its associated tab panel on click.",
            },
            {
              name: "TabsContent",
              type: "Component",
              description: "Panel that displays content when its associated tab is active.",
            },
            {
              name: "defaultValue",
              type: "string",
              description: "Initial active tab for uncontrolled usage.",
            },
            {
              name: "value",
              type: "string",
              description: "Controlled active tab value.",
            },
            {
              name: "onValueChange",
              type: "(value: string) => void",
              description: "Callback fired when the active tab changes.",
            },
          ]}
        />
      </DocSection>

      <DocsPageNav
        prev={{ title: "Switch", href: "/docs/components/switch" }}
        next={{ title: "Textarea", href: "/docs/components/textarea" }}
      />
    </>
  );
}
