import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import MusicPlayer from "@/components/MusicPlayer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "For Syafira Aulia",
  description: "A little something for you.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${inter.variable}`}>
        {children}
        <MusicPlayer />
      </body>
    </html>
  );
}
