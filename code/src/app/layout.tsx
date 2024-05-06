import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitGym44",
  description: "per un fisico migliore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="mx-auto max-w-5xl text-2xl gap-2 mb-10">
          <Navbar></Navbar>
          {children}
        </div>
        
      </body>
    </html>
  );
}
