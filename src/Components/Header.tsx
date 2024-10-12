import Link from "next/link";
import MenuItem from "./MenuItem";
import { FaHome } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import DarkModeSwitch from "./DarkModeSwitch";
import Image from "next/image"; 

export default function Header() {
  return (
    <div className="flex justify-between items-center p-3 max-w-full mx-0">
      {" "}
    
      <div className="flex items-center">
        <Link href={"/"} className="gap-1 items-center hidden sm:inline">
        <span className='text-xl font-changa bg-indigo-500 py-1 px-3 rounded-lg'>
            BookmarkMyMovies
          </span>
        </Link>

        <div className="flex gap-4 ml-2">
          {" "}
          <MenuItem title="home" address="/" Icon={FaHome} />
          <MenuItem title="about" address="/about" Icon={FaInfoCircle} />
          <MenuItem title="bookmark" address="/bookmark" Icon={FaBookmark} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <DarkModeSwitch />

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
