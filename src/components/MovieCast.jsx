import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieCast = () => {
  const { movieId } = useParams(); // Отримуємо movieId з маршруту
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzIwYTMxYzlkNzkyODBiYzgyZGJlNTIyNzUyZjhmNSIsIm5iZiI6MTczNTg3NzE2My4wNzEsInN1YiI6IjY3Nzc2MjJiNDk2ZGQ5NTJjODcyNDgyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5ZpDi0y2kOgyMJWJsEDHbUt63HfHbLF0pyghBGFpWxQ',
            },
          }
        );
        const data = await response.json();
        setCast(data.cast);
      } catch (err) {
        setError('Failed to load cast information');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) {
    return <div>Loading cast...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Cast</h2>
      <div id="cast-list">
        {cast.length === 0 ? (
          <p>No cast information available</p>
        ) : (
          cast.map((actor) => (
            <div key={actor.cast_id} className="cast-member">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : 'https://via.placeholder.com/150?text=No+Image'
                }
                alt={actor.name}
                style={{ width: '100px', height: '150px', objectFit: 'cover' }}
              />
              <h4>{actor.name}</h4>
              <p>{actor.character}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieCast;
