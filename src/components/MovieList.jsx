import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = ({ movies }) => {
  return (
    <ul id="movies-list">
      {movies.map(movie => (
        <li key={movie.id} className="movie-item">
          <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
