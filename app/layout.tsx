import type { Metadata } from "next";
import "./globals.css";
import { MotionProvider } from "@/components/site/motion-provider";
import { SiteHeader } from "@/components/site/site-header";
import { PersistentDemo } from "@/components/site/persistent-demo";

export const metadata: Metadata = {
  title: "VSS Salesco | Security, intelligence and cinema",
  description: "A preview of the VSS Salesco smart-living, security and AV experience centre.",
  metadataBase: new URL("https://vsssalesco.example"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><MotionProvider><SiteHeader />{children}<PersistentDemo /></MotionProvider></body></html>;
}
