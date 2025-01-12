import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import MovieList from "../components/MovieList";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("query") || "";

  useEffect(() => {
    if (!searchQuery.trim()) {
      setMovies([]);
      setError("");
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/search/movie",
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            },
            params: {
              query: searchQuery,
              page: 1,
              include_adult: false,
            },
          }
        );

        const results = response.data.results;

        if (results.length === 0) {
          setError("No movies found");
        }
        setMovies(results);
      } catch (err) {
        setError("Failed to fetch movies");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.elements.search.value.trim();
    if (query) {
      setSearchParams({ query });
    }
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          defaultValue={searchQuery}
          placeholder="Search for a movie"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && movies.length === 0 && <div>No results found.</div>}

      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
