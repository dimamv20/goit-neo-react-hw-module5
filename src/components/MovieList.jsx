import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul id="movies-list">
      {movies.map(movie => (
        <li key={movie.id} className="movie-item">
          <Link 
            to={`/movies/${movie.id}`} 
            state={{ from: location }}
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
