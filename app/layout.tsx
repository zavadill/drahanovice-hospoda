import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Playfair_Display, Inter } from "next/font/google";
import ClientReveal from "./components/ClientReveal";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className={`${playfair.variable} ${inter.variable} antialiased font-[family-name:var(--font-inter)]`}>
        <ClientReveal>
          <Navbar />
          {children}
          <Footer />
        </ClientReveal>
      </body>
    </html>
  );
}
