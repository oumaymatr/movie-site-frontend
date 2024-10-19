"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiThumbsUp, FiHeart } from 'react-icons/fi';

interface Genre {
  id: number;
  name: string;
}

interface Result {
  id: number;
  title?: string;
  overview: string;
  vote_count: number;
  vote_average: number;
  genres: Genre[];
  backdrop_path?: string;
  poster_path?: string;
  release_date?: string;
  first_air_date?: string;
}

export default function BookmarkPage() {
  const [bookmarkedMovies, setBookmarkedMovies] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarkedMovies = async () => {
      const token = localStorage.getItem('token'); // Get the token

      if (!token) {
        setLoading(false); // Stop loading if no token
        return; // Exit if there's no token
      }

      try {
        const response = await fetch('http://localhost:3000/user/bookmark', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          // Handle errors silently, just stop loading
          setLoading(false);
          return;
        }

        const movieIds: string[] = await response.json();
        console.log("Fetched Movie IDs:", movieIds);

        const fetchMovieDetails = async (movieId: string) => {
          const movieResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=5ff5ac0316e4eb78f03d5336bd580b55`
          );

          if (!movieResponse.ok) {
            throw new Error(`Failed to fetch details for movie ID: ${movieId}`);
          }

          const movieData = await movieResponse.json();
          console.log(`Fetched Movie Details for ID ${movieId}:`, movieData);
          return movieData;
        };

        const movies = await Promise.all(movieIds.map(fetchMovieDetails));
        setBookmarkedMovies(movies);
      } catch {
        // Handle errors silently, just stop loading
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedMovies();
  }, []);

  const removeBookmark = async (movieId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/user/bookmark/${movieId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove bookmark');
      }

      // Update the state to remove the movie from the UI
      setBookmarkedMovies((prev) => prev.filter((movie) => movie.id !== movieId));
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      {bookmarkedMovies.length === 0 ? (
        <p className="text-gray-500">You still have no bookmarked movies.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {bookmarkedMovies.map((movie) => {
            // Get genre names from the genres array
            const genreNames = movie.genres.map((genre) => genre.name).join(", ") || "No genres available";

            return (
              <div key={movie.id} className="group cursor-pointer sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border sm:border-slate-400 sm:m-4 p-4 transition-shadow duration-200 w-full max-w-md">
                <Link href={`/movie/${movie.id}`}>
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`}
                    alt={movie.title || "No Title Available"}
                    width={700}
                    height={400}
                    className="rounded-lg group-hover:opacity-80 transition-opacity duration-300"
                  />
                </Link>
                <div className="p-4">
                  <p className="line-clamp-5 text-md mb-2">{movie.overview}</p>
                  <h2 className="text-lg font-bold mb-2 line-clamp-1">{movie.title || "No Title Available"}</h2>
                  <p className="text-sm mb-2 text-gray-500">Release Date: {movie.release_date || movie.first_air_date || "Unknown"}</p>
                  <p className="text-sm text-gray-500 mb-2 line-clamp-1">{genreNames}</p>

                  <div className="flex justify-between items-center text-gray-600">
                    <div>
                      <p className="text-sm">Votes:</p>
                      <p className="font-bold">{movie.vote_count}</p>
                    </div>
                    <div className="flex items-center">
                      <FiThumbsUp className="h-5 mr-2" />
                      <span>{movie.vote_average}</span>
                    </div>
                    <div 
                      className="cursor-pointer" 
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent link click
                        removeBookmark(movie.id);
                      }}
                    >
                      <FiHeart className={`h-5 ml-3 ${true ? "text-red-500" : "text-gray-400"}`} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
