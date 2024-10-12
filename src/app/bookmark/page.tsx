'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Bookmark = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // State to store login status

  useEffect(() => {
    // Check if the user is logged in only on the client side
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Update state based on the presence of the token
  }, []); // Run effect only once when the component mounts

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {isLoggedIn ? (
        <Link href="/bookmarks" className="px-4 py-1 border border-gray-300 rounded hover:bg-gray-100">
          Bookmarks
        </Link>
      ) : (
        <div className="flex flex-col items-center text-center">
          <p className="mb-1 mt-1">
            This section is only for registered users. Please <Link href="/signup" className="text-blue-500">sign up</Link>.
          </p>
          <p className="mt-2 mb-2">Or</p>
          <p>
            Already have an account? <Link href="/login" className="text-blue-500">Log In</Link>.
          </p>
        </div>
      )}
    </div>
  );
};

export default Bookmark;
