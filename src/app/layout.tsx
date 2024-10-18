import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";
import { ReactNode } from "react";
import { Inter } from 'next/font/google';
import ClientHeader from "@/Components/ClientHeader"; 
import Footer from "@/Components/Footer";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "BookmarkMyMovies",
  description:
    "This is a movie site where you can log in, bookmark your favorite films, and explore detailed information about each one!",
};

interface RootLayoutProps {
  children: ReactNode; 
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <ClientHeader /> 
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
