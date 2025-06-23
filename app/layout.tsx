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

export const metadata = {
  title: 'Hostinec Na Nové',
  description: 'Tradiční český hostinec s domácí kuchyní a širokým výběrem jídel a nápojů.',
  keywords: ['Hostinec', 'Na Nové', 'česká kuchyně', 'restaurace', 'jídelní lístek'],
  authors: [{ name: 'Adam Zavadil' }],
  creator: 'Adam Zavadil',
  publisher: 'Hostinec Na Nové',
  openGraph: {
    title: 'Hostinec Na Nové',
    description: 'Tradiční český hostinec s domácí kuchyní a širokým výběrem jídel a nápojů.',
    url: 'https://www.hostinecnanove.cz',
    siteName: 'Hostinec Na Nové',
    images: [
      {
        url: 'https://www.hostinecnanove.cz/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hostinec Na Nové',
      },
    ],
    locale: 'cs_CZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hostinec Na Nové',
    description: 'Tradiční český hostinec s domácí kuchyní a širokým výběrem jídel a nápojů.',
    images: ['https://www.hostinecnanove.cz/images/twitter-image.jpg'],
  },
};


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
