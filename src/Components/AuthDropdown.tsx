import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function AuthDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // Create an instance of useRouter for redirection

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    
    // Redirect to the login page or homepage
    router.push("/login");
  };

  // Check if the user is logged in by looking for the token
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="focus:outline-none">
        <Image
          src="https://www.svgrepo.com/show/382097/female-avatar-girl-face-woman-user-9.svg" // SVG URL
          alt="Profile Picture"
          width={40}
          height={40}
          className="rounded-full cursor-pointer border-2 border-gray-800 dark:border-gray-200 transition duration-300 hover:scale-105"
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 dark:bg-gray-600 bg-indigo-200 shadow-lg rounded-md z-10">
          {isLoggedIn && ( // Show profile only if logged in
            <Link href="/profile" className="block px-4 py-2 hover:bg-gray-200">
              Profile
            </Link>
          )}
          {!isLoggedIn && ( // Show sign-up only if not logged in
            <Link href="/signup" className="block px-4 py-2 hover:bg-gray-200">
              Sign Up
            </Link>
          )}
          {isLoggedIn ? ( // Conditional rendering for logout
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              Log Out
            </button>
          ) : (
            <Link href="/login" className="block px-4 py-2 hover:bg-gray-200">
              Log In
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
