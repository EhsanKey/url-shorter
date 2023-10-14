import Footer from "@/components/Footer";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "URL SHORTENER",
  description: "A simple URL shortening tool for easy link management.",
  keywords: "URL shortener, link management, shorten URLs, easy link",
  authors: [{ name: "ehsan keyhani" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="overflow-hidden h-screen flex justify-between flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
