import "@velora/core/styles";
import "./globals.css";
import { Providers } from "../../components/Providers";
import { DocsHeader } from "../../components/DocsHeader";
import { DocsSidebar } from "../../components/DocsSidebar";

export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <DocsHeader />
      <div className="flex w-full flex-1">
        <DocsSidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </Providers>
  );
}
