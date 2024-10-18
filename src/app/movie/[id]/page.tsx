import Image from 'next/image';

// Interface to define the expected structure of the parameters passed to the component
interface Params {
  params: {
    id: string; // The type of the movie ID parameter
  };
}

export default async function MoviePage({ params }: Params) {
  const movieId = params.id; // Accessing the movie ID from params
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`
  );

  // Check if the response is okay before parsing
  if (!res.ok) {
    throw new Error('Failed to fetch movie data');
  }

  const movie = await res.json();

  // Get genre names from the genres array
  const genreNames = movie.genres.map((genre: { name: string }) => genre.name).join(", ") || "No genres available";

  return (
    <div className='w-full'>
      <div className='p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6'>
        <Image
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`}
          width={500}
          height={300}
          alt={movie.title || movie.name || 'Movie Image'}
          className='rounded-lg'
          style={{ maxWidth: '100%', height: '100%' }}
        />
        <div className='p-2'>
          <h2 className='text-lg mb-3 font-bold'>
            {movie.title || movie.name}
          </h2>
          <p className='text-lg mb-3'>{movie.overview}</p>
          <p className='mb-3'>
            <span className='font-semibold mr-1'>Date Released:</span>
            {movie.release_date || movie.first_air_date}
          </p>
          {/* New genre display */}
          <p className='mb-3'>
            <span className='font-semibold mr-1'>Genres:</span>
            {genreNames}
          </p>
          <p className='mb-3'>
            <span className='font-semibold mr-1'>Votes:</span>
            {movie.vote_count}
          </p>
        </div>
      </div>
    </div>
  );
}
