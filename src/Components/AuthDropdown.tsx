import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
}

export default function AuthDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode<DecodedToken>(token!);
      const userId = decodedToken.sub;

      const fetchUserPhoto = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/user/${userId}/profile-picture`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const userData = await response.json();
            // Check if photo_de_profil is an absolute URL
            if (userData.photo_de_profil) {
              // If it is already an absolute URL, use it directly
              setUserPhoto(
                userData.photo_de_profil.startsWith("http")
                  ? userData.photo_de_profil
                  : `http://localhost:3000${userData.photo_de_profil}`
              );
            } else {
              setUserPhoto(null);
            }
          }
        } catch (error) {
          console.error("Error fetching user photo:", error);
        }
      };

      fetchUserPhoto();
    }
  }, [isLoggedIn]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="focus:outline-none">
        {userPhoto ? (
           <div className="rounded-full overflow-hidden w-10 h-10 border-2 border-gray-800 dark:border-gray-200 transition duration-300 hover:scale-105 cursor-pointer">
           <Image
             src={userPhoto}
             alt="Profile Picture"
             width={40} // Ensure this matches the parent div size
             height={40} // Ensure this matches the parent div size
             className="object-cover w-full h-full" // Fills the entire circular area
           />
         </div>
        
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            {" "}
            {/* Placeholder if no photo */}
            <span className="text-gray-500">?</span>{" "}
            {/* Optional: show a placeholder icon */}
          </div>
        )}
      </button>
      {isOpen && (
        <div
          className="
            absolute right-0 mt-2 w-48
            dark:bg-gray-600 bg-indigo-200
            shadow-lg rounded-md z-10
            sm:w-48 md:w-56 lg:w-64
            transition-all duration-300 ease-in-out
          "
        >
          {isLoggedIn && (
            <Link href="/profile" className="block px-4 py-2 hover:bg-gray-200">
              Profile
            </Link>
          )}
          {!isLoggedIn && (
            <Link href="/signup" className="block px-4 py-2 hover:bg-gray-200">
              Sign Up
            </Link>
          )}
          {isLoggedIn ? (
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
