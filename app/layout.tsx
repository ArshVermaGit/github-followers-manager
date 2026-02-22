import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GitHub Non-Followers Cleaner",
  description:
    "Find and manage GitHub users who don't follow you back",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased text-zinc-50 bg-zinc-950 min-h-screen`}>
        <Providers>{children}</Providers>
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
