import React, { useEffect, useState } from 'react';
import MovieList from '../components/MovieList'; 

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = `${import.meta.env.VITE_API_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzIwYTMxYzlkNzkyODBiYzgyZGJlNTIyNzUyZjhmNSIsIm5iZiI6MTczNTg3NzE2My4wNzEsInN1YiI6IjY3Nzc2MjJiNDk2ZGQ5NTJjODcyNDgyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5ZpDi0y2kOgyMJWJsEDHbUt63HfHbLF0pyghBGFpWxQ',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setMovies(data.results.slice(0, 10));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [apiUrl]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Popular Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
