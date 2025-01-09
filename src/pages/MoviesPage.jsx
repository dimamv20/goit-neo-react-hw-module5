import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const queryFromParams = searchParams.get('query') || '';
    setSearchQuery(queryFromParams);
  }, [searchParams]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setMovies([]);
      return;
    }

    setLoading(true);
    setError('');

    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzIwYTMxYzlkNzkyODBiYzgyZGJlNTIyNzUyZjhmNSIsIm5iZiI6MTczNTg3NzE2My4wNzEsInN1YiI6IjY3Nzc2MjJiNDk2ZGQ5NTJjODcyNDgyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5ZpDi0y2kOgyMJWJsEDHbUt63HfHbLF0pyghBGFpWxQ',
          },
          params: {
            query: searchQuery,
            page: 1,
            include_adult: false,
          },
        });

        if (response.data.results.length === 0) {
          setError('No movies found');
        } else {
          setMovies(response.data.results);
        }
      } catch (err) {
        setError('Failed to fetch movies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      setMovies([]);
      return;
    }
    setSearchParams({ query: searchQuery });
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a movie"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
