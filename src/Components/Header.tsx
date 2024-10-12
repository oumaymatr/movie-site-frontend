import Link from "next/link";
import MenuItem from "./MenuItem";
import { FaHome } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import DarkModeSwitch from "./DarkModeSwitch";
import Image from "next/image"; // Import Image component

export default function Header() {
  return (
    <div className="flex justify-between items-center p-3 max-w-full mx-0">
      {" "}
      {/* Changed max-w-6xl to max-w-full and mx-auto to mx-0 */}
      {/* Container for Title and Menu Items */}
      <div className="flex items-center">
        {/* Site Title on the very left */}
        <Link href={"/"} className="flex gap-1 items-center hidden sm:inline">
        <span className='text-xl font-changa bg-indigo-700 py-1 px-3 rounded-lg'>
            BookmarkMyMovies
          </span>
        </Link>

        {/* Menu Items */}
        <div className="flex gap-4 ml-2">
          {" "}
          {/* Adjusted margin-left for closer spacing */}
          <MenuItem title="home" address="/" Icon={FaHome} />
          <MenuItem title="about" address="/about" Icon={FaInfoCircle} />
          <MenuItem title="bookmark" address="/bookmark" Icon={FaBookmark} />
        </div>
      </div>
      {/* Container for Dark Mode Switch and Profile Picture on the very right */}
      <div className="flex items-center gap-4">
        <DarkModeSwitch />

        {/* Profile Picture with SVG URL */}
        <Link href="/profile">
          <Image
            src="https://www.svgrepo.com/show/382097/female-avatar-girl-face-woman-user-9.svg" // SVG URL
            alt="Profile Picture"
            width={40}
            height={40}
            className="rounded-full cursor-pointer border-2 border-gray-800 dark:border-gray-200 transition duration-300 hover:scale-105"
          />
        </Link>
      </div>
    </div>
  );
}
