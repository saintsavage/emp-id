import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EMP ID | One identity. Every application.",
  description: "The central identity system for EMP Exclusive applications.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
