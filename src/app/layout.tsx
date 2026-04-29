import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jezdecký klub — Závody",
  description: "Přihlašování na jezdecké závody",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="bg-green-700 text-white p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              Jezdecký klub
            </Link>
            <Link
              href="/zavody/novy"
              className="bg-white text-green-700 px-4 py-2 rounded hover:bg-green-100"
            >
              + Nový závod
            </Link>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
