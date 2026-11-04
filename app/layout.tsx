import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EMP ID | Welcome to the EMP Exclusive Ecosystem",
  description: "One secure identity for the EMP Exclusive ecosystem.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
