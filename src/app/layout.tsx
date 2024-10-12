import type { Metadata } from "next";
import "./globals.css";
import Header from "@/Components/Header";
import Providers from "./Providers";
import { ReactNode } from "react";
import { Inter } from 'next/font/google';

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
          <Header />
          {/* <Navbar /> */}
          {/* <SearchBox /> */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
