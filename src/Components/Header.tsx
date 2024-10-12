import Link from "next/link";
import MenuItem from "./MenuItem";
import { FaHome } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import DarkModeSwitch from "./DarkModeSwitch";
import AuthDropdown from "./AuthDropdown"; 

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
        <AuthDropdown/>
      </div>
    </div>
  );
}
