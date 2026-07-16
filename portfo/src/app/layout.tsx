import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Govind S | Platform Engineering Console",
  description: "SRE & Backend Infrastructure Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
