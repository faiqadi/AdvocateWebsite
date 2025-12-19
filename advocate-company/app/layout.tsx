import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import { ThemeProvider } from "./components/ThemeProvider";
import { getBuildingImage } from "@/lib/building-images";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bagus Law Firm - Konsultan Hukum Terpercaya",
  description: "Bagus Law Firm (BAGUS LAW) - Firma hukum profesional dengan pengalaman lebih dari satu dekade. Menyediakan konsultan hukum terbaik untuk berbagai sektor industri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 dark:bg-gray-950 transition-colors duration-200`}
        style={{
          backgroundImage: `url(${getBuildingImage(6)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="fixed inset-0 bg-white/50 dark:bg-gray-900/70 pointer-events-none -z-10"></div>
        <ThemeProvider>
          {children}
          <FloatingWhatsApp />
        </ThemeProvider>
      </body>
    </html>
  );
}
