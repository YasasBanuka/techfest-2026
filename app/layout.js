import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",    
  subsets: ["latin"],          
});
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "IEEE TechFest 2026 | Innovation Festival",
  description: "Join 1000+ innovators at TechFest 2026. December 20, 2026 at Trace Expert City, Colombo.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
