'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { Movie } from "./types"; // Import the Movie type

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]); // Use the Movie type

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get<Movie[]>(
          "http://localhost:3000/movie"
        ); 
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Movies List</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <h2>{movie.titre}</h2>
            <p>{movie.description}</p>
            <img src={movie.affiche} alt={movie.titre} width="100" />
            <p>Note: {movie.note}</p>
            <p>Date: {new Date(movie.date_de_sortie).toDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
