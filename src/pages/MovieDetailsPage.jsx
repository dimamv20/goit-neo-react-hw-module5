import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, NavLink, useNavigate, Outlet } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const previousLocation = location.state?.from || '/movies';

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzIwYTMxYzlkNzkyODBiYzgyZGJlNTIyNzUyZjhmNSIsIm5iZiI6MTczNTg3NzE2My4wNzEsInN1YiI6IjY3Nzc2MjJiNDk2ZGQ5NTJjODcyNDgyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5ZpDi0y2kOgyMJWJsEDHbUt63HfHbLF0pyghBGFpWxQ',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }

      const data = await response.json();
      setMovie(data);
    } catch (err) {
      setError('Failed to fetch movie details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(previousLocation);
  };

  if (loading) {
    return <div>Loading movie details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image+Available';

  return (
    <div>
      <button onClick={handleGoBack} style={{ marginBottom: '20px' }}>
        Go Back
      </button>

      <h1>{movie.title}</h1>
      <img
        src={posterUrl}
        alt={movie.title}
        style={{ width: '300px', height: 'auto' }}
      />
      <p>{movie.overview}</p>
      <p>
        <strong>User Score:</strong> {movie.vote_average}
      </p>
      <p>
        <strong>Genres:</strong> {movie.genres.map((genre) => genre.name).join(', ')}
      </p>

      <nav>
        <NavLink to="cast" style={{ marginRight: '10px' }}>
          Cast
        </NavLink>
        <NavLink to="reviews">Reviews</NavLink>
      </nav>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
