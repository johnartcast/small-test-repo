import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Small Test Site",
  description: "A small Next.js test site with several pages.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Nav />
          <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
