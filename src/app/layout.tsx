import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { themeBootstrap } from "@/components/navigation/theme-config";
import { defaultSite } from "@/content/site";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  title: {
    default: "Psametra — Software engineered for what’s next.",
    template: "%s — Psametra",
  },
  description: defaultSite.description,
  openGraph: {
    title: "Psametra — Software engineered for what’s next.",
    description: defaultSite.description,
    type: "website",
    siteName: defaultSite.name,
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
