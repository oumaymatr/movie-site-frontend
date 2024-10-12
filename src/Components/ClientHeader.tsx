// src/Components/ClientHeader.tsx

"use client"; // Mark this component as client-side

import Navbar from "@/Components/Navbar";
import SearchBox from "@/Components/SearchBox";
import Header from "@/Components/Header";
import { usePathname } from 'next/navigation';

export default function ClientHeader() {
  const pathname = usePathname();

  return (
    <>
      <Header />
      {(pathname === '/' || pathname.startsWith('/movie/') || pathname.startsWith('/search/')) && (
        <>
          <Navbar />
          <SearchBox />
        </>
      )}
    </>
  );
}
