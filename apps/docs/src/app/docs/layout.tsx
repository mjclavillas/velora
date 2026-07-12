import { DocsSidebar } from "@/components/DocsSidebar";
import { DocsHeader } from "@/components/DocsHeader";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <DocsHeader />
      <div className="flex w-full flex-1">
        <DocsSidebar />
        <main className="flex-1 min-w-0 px-6 py-10 sm:px-8 xl:px-12">
          <div className="mx-auto max-w-3xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
