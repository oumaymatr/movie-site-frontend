"use client";
import Image from "next/image";
import Link from "next/link";
import { FiThumbsUp, FiHeart } from "react-icons/fi";
import { useState } from "react"; // Import useState to manage heart state
import axios from "axios"; // Import axios to make API calls

// Genre ID to Name Mapping
const genreMap: { [key: number]: string } = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10759: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  10765: "War",
  37: "Western",
};

interface Result {
  id: number;
  backdrop_path?: string;
  poster_path?: string;
  overview: string;
  title?: string;
  name?: string;
  original_title?: string;
  release_date?: string;
  first_air_date?: string;
  vote_count: number;
  vote_average: number;
  genre_ids: number[];
}

interface CardProps {
  result: Result;
}

export default function Card({ result }: CardProps) {
  const [isFavorite, setIsFavorite] = useState(false); // State to track if the card is a favorite

  // Convert genre IDs to names
  const genreNames = result.genre_ids.map((id) => genreMap[id]).join(", ");

  // Set a fallback name if title or name is missing
  const movieTitle =
    result.title ||
    result.name ||
    result.original_title ||
    "No Title Available";

  // Limit overview to 5 lines (approx. 300 characters)
  const maxOverviewLength = 300;
  const limitedOverview =
    result.overview.length > maxOverviewLength
      ? `${result.overview.slice(0, maxOverviewLength)}...`
      : result.overview;

  // Limit title to 1 line
  const limitedTitle =
    movieTitle.length > 100 ? `${movieTitle.slice(0, 100)}...` : movieTitle;

  // Convert genres to a string (single line)
  const limitedGenres =
    genreNames.length > 100 ? `${genreNames.slice(0, 100)}...` : genreNames;

  // Toggle favorite state and call the backend
  const toggleFavorite = async () => {
    const token = localStorage.getItem("token"); // Get the token from local storage
    if (!token) {
      alert("You need to be logged in to bookmark a movie."); // Prompt user to log in
      return;
    }
    setIsFavorite(true);
    try {
       await axios.post(
        "http://localhost:3000/user/bookmark/",
        {
          movieId: result.id, // Send movie ID to the backend
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the header
          },
        }
      );
      // Check if the movie was successfully added to bookmarks
        setIsFavorite(true); // Set favorite state to true
      
    } catch (error) {
      console.error("Error bookmarking the movie:", error); // Log any errors
      alert("Failed to bookmark the movie. Please try again."); // User feedback
    }
  };

  return (
    <div className="group cursor-pointer sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border sm:border-slate-400 sm:m-4 p-4 transition-shadow duration-200 w-full max-w-md">
      <Link href={`/movie/${result.id}`}>
        <Image
          src={`https://image.tmdb.org/t/p/original/${result.backdrop_path || result.poster_path}`}
          alt={limitedTitle}
          width={700}
          height={400}
          className="rounded-lg group-hover:opacity-80 transition-opacity duration-300"
        />
      </Link>
      <div className="p-4">
        {/* Overview first */}
        <p className="line-clamp-5 text-md mb-2">{limitedOverview}</p>

        {/* Movie Title - limited to 1 line */}
        <h2 className="text-lg font-bold mb-2 line-clamp-1">{limitedTitle}</h2>

        {/* Release Date */}
        <p className="text-sm mb-2 text-gray-500">
          Release Date: {result.release_date || result.first_air_date || "Unknown"}
        </p>

        {/* Genres - Limited to 1 line */}
        <p className="text-sm text-gray-500 mb-2 line-clamp-1">{limitedGenres}</p>

        <div className="flex justify-between items-center text-gray-600">
          <div>
            {/* Votes - formatted to show 'Votes:' and number on two lines */}
            <p className="text-sm">Votes:</p>
            <p className="font-bold">{result.vote_count}</p>
          </div>
          <div className="flex items-center">
            <FiThumbsUp className="h-5 mr-2" />
            <span>{result.vote_count}</span>
          </div>
          {/* Heart Icon */}
          <div onClick={toggleFavorite} className="cursor-pointer">
            <FiHeart className={`h-5 ml-3 ${isFavorite ? "text-red-500" : "text-gray-400"}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
