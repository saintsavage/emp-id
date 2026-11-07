import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EMP ID | Step Inside",
  description: "Step inside. You're part of something bigger. Your identity across the EMP Exclusive ecosystem.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
