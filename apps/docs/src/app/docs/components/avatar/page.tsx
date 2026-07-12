import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview, PropsTable } from "@/components/ComponentPreview";
import { Avatar, AvatarGroup, Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "Avatar — Velora UI",
  description: "User avatars with image fallbacks, status indicators, and groups.",
};

export default function AvatarPage() {
  return (
    <>
      <DocsPageHeader
        title="Avatar"
        description="User avatars with image fallbacks, status indicators, and avatar groups for displaying multiple users."
        badges={["Radix Primitives"]}
      />

      <DocSection title="Installation">
        <DocCodeBlock code={`import { Avatar, AvatarGroup } from "@velora/core";`} />
      </DocSection>

      <DocSection title="Usage">
        <ComponentPreview
          title="Avatar with fallback"
          code={`<Avatar src="/avatar.png" alt="Jane Doe" name="Jane Doe" />
<Avatar src="/avatar.png" alt="Jane Doe" name="Jane Doe" size="lg" />
<Avatar src="/avatar.png" alt="Jane Doe" name="Jane Doe" size="xl" status="online" />`}
          previewClassName="flex items-center gap-4"
        >
          <Avatar src="" alt="Jane Doe" name="Jane Doe" />
          <Avatar src="" alt="Jane Doe" name="Jane Doe" size="lg" />
          <Avatar src="" alt="Jane Doe" name="Jane Doe" size="xl" status="online" />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Avatar Group">
        <ComponentPreview
          title="Grouped avatars"
          code={`<AvatarGroup max={3}>
  <Avatar src="/user1.png" alt="User 1" name="User 1" />
  <Avatar src="/user2.png" alt="User 2" name="User 2" />
  <Avatar src="/user3.png" alt="User 3" name="User 3" />
  <Avatar src="/user4.png" alt="User 4" name="User 4" />
</AvatarGroup>`}
          previewClassName="flex items-center gap-4"
        >
          <AvatarGroup max={3}>
            <Avatar src="" alt="User 1" name="User 1" />
            <Avatar src="" alt="User 2" name="User 2" />
            <Avatar src="" alt="User 3" name="User 3" />
            <Avatar src="" alt="User 4" name="User 4" />
          </AvatarGroup>
        </ComponentPreview>
      </DocSection>

      <DocSection title="API Reference">
        <h3 className="mb-2 mt-6 text-base font-semibold text-[var(--velora-text-primary)]">
          Avatar
        </h3>
        <PropsTable
          props={[
            {
              name: "src",
              type: "string",
              description: "Image source URL. When invalid or missing, the fallback is displayed.",
            },
            {
              name: "alt",
              type: "string",
              description: "Alternative text for the avatar image.",
            },
            {
              name: "name",
              type: "string",
              description: "Full name — initials are auto-generated when the image fails.",
            },
            {
              name: "fallbackIcon",
              type: "ReactNode",
              description: "Custom fallback content when image fails and name not provided.",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg" | "xl"',
              default: '"md"',
              description: "Size preset controlling the avatar diameter.",
            },
            {
              name: "status",
              type: '"online" | "offline" | "away" | "busy"',
              description: "Optional status indicator badge displayed on the avatar.",
            },
          ]}
        />
        <h3 className="mb-2 mt-6 text-base font-semibold text-[var(--velora-text-primary)]">
          AvatarGroup
        </h3>
        <PropsTable
          props={[
            {
              name: "max",
              type: "number",
              default: "5",
              description: "Maximum number of avatars to display before showing a +N counter.",
            },
            {
              name: "children",
              type: "ReactNode",
              required: true,
              description: "Avatar components to render in the group.",
            },
          ]}
        />
      </DocSection>

      <DocsPageNav
        prev={{ title: "Accordion", href: "/docs/components/accordion" }}
        next={{ title: "Badge", href: "/docs/components/badge" }}
      />
    </>
  );
}
