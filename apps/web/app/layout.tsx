import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SelfControl",
  description: "Multi-modal memory system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

