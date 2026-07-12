import "@velora/core/styles";
import "./globals.css";
import { Providers } from "../../components/Providers";

export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Providers>{children}</Providers>;
}
