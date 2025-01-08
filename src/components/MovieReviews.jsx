import React, { useEffect, useState } from 'react';

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US`,
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
        setReviews(data.results);
      } catch (err) {
        setError('Failed to fetch reviews');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Reviews</h2>
      <div id="reviews-list">
        {reviews.length === 0 ? (
          <p>No reviews available</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review-item">
              <h4>Author: {review.author}</h4>
              <p>{review.content}</p>
              <p>
                <strong>Written on:</strong> {new Date(review.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieReviews;
