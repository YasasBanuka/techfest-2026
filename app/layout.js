import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import SmoothScrollProvider from "@/components/providers/smooth-scroll";
import NoiseOverlay from "@/components/ui/noise-overlay";
import SparkCursor from "@/components/ui/spark-cursor";
import CyberGlitch from "@/components/ui/cyber-glitch";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://techfest2026.lk"),
  title: "TechFest Sri Lanka 2026 | Innovation Festival",
  description:
    "Join 1500+ innovators at TechFest Sri Lanka 2026. November 07, 2026 at TBA.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TechFest 2026",
  },
};

export const viewport = {
  themeColor: "#0a0d10",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <SmoothScrollProvider>
          <NoiseOverlay />
          <SparkCursor />
          <CyberGlitch />
          <Navbar />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
