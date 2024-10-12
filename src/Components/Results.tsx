import Card from '@/Components/Card';

// Define an interface for the movie result
interface Result {
  id: number; // or string, depending on your ID type
  title: string;
  overview: string; // Add this property
  vote_count: number; // Add this property
  vote_average: number; // Include the vote_average property
  genre_ids: number[]; // Include the genre_ids property
  backdrop_path?: string; // Optional, if used in Card component
  poster_path?: string; // Optional, if used in Card component
  release_date?: string; // Optional, if used in Card component
  first_air_date?: string; // Optional, if used in Card component
}

interface ResultsProps {
  results: Result[];
}

export default function Results({ results }: ResultsProps) {
  return (
    <div className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 max-w-6xl mx-auto py-4 gap-4'> {/* Added gap-4 for spacing */}
      {results.map((result) => (
        <Card key={result.id} result={result} />
      ))}
    </div>
  );
}
