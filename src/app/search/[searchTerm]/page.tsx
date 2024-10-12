import Results from '@/Components/Results';

interface SearchPageProps {
  params: {
    searchTerm: string; // Define the type for searchTerm
  };
}

export default async function SearchPage({ params }: SearchPageProps) {
  const searchTerm = params.searchTerm;
  console.log('Search Term:', searchTerm); // Log the search term
  
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${searchTerm}&language=en-US&page=1&include_adult=false`
  );

  // Ensure the response is handled correctly
  if (!res.ok) {
    console.error('Failed to fetch data:', res.statusText);
    return <h1 className='text-center pt-6'>Error fetching results</h1>;
  }

  const data = await res.json();
  const results = data.results;
  
  console.log('API Response:', data); // Log the entire response to see its structure
  console.log('Results:', results); // Log the results array to verify its contents

  return (
    <div>
      {results && results.length === 0 ? (
        <h1 className='text-center pt-6'>No results found</h1>
      ) : (
        results && <Results results={results} />
      )}
    </div>
  );
}
