import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Playfair_Display, Inter } from "next/font/google";
import ClientReveal from "./components/ClientReveal";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hostinec na Nové",
  description: "Přijďte navštívit Hostinec na Nové v Drahanovicích.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        <ClientReveal>
          <Navbar />
          {children}
          <Footer />
        </ClientReveal>
      </body>
    </html>
  );
}
