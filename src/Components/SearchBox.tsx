"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search/${search}`);
  };

  return (
    <form
      className="flex justify-between px-5 max-w-6xl mx-auto mt-4 w-full" // Ensure full width
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Search keywords..."
        className="w-full h-14 rounded-md placeholder-gray-500 outline-none bg-transparent flex-1"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className={`border border-amber-600 text-amber-600 disabled:text-gray-400 
              rounded-md h-14 px-4 transition-colors duration-200
              hover:bg-amber-600 hover:text-white`}
        disabled={search === ""}
      >
        Search
      </button>
    </form>
  );
}
