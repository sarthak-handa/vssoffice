import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/site/motion-provider";
import { SiteHeader } from "@/components/site/site-header";
import { PersistentDemo } from "@/components/site/persistent-demo";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "VSS Salesco | Security, intelligence and cinema",
  description: "A preview of the VSS Salesco smart-living, security and AV experience centre.",
  metadataBase: new URL("https://vsssalesco.example"),
};

export const viewport: Viewport = {
  themeColor: "#201b18",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body>
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
