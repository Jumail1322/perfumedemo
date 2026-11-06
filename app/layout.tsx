import type { Metadata } from "next";
import { DM_Sans, Frank_Ruhl_Libre, MonteCarlo } from "next/font/google";
import "./globals.css";

const script = MonteCarlo({ subsets: ["latin"], weight: "400", variable: "--font-script" });
const serif = Frank_Ruhl_Libre({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-serif" });
const sans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Élara — Fragrances for real life",
  description: "Honest, small-batch eaux de parfum made to sit close to your skin.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${script.variable} ${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
