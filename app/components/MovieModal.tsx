import { Movie, FavoriteMovie } from '../types/movie';
import { useState, useEffect } from 'react';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
  isFavorite: boolean;
  favoriteData?: FavoriteMovie;
  onToggleFavorite: () => void;
  onUpdateFavorite: (rating?: number, note?: string) => void;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieModal({
  movie,
  onClose,
  isFavorite,
  favoriteData,
  onToggleFavorite,
  onUpdateFavorite,
}: MovieModalProps) {
  const [userRating, setUserRating] = useState<number>(favoriteData?.userRating || 0);
  const [userNote, setUserNote] = useState<string>(favoriteData?.userNote || '');
  const [hoverRating, setHoverRating] = useState<number>(0);

  useEffect(() => {
    setUserRating(favoriteData?.userRating || 0);
    setUserNote(favoriteData?.userNote || '');
  }, [favoriteData]);

  const handleRatingClick = (rating: number) => {
    setUserRating(rating);
    onUpdateFavorite(rating, userNote);
  };

  const handleNoteChange = (note: string) => {
    setUserNote(note);
    onUpdateFavorite(userRating, note);
  };

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : '/placeholder.png';

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const runtime = movie.runtime ? `${movie.runtime} min` : 'N/A';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="modal-body">
          <div className="modal-poster">
            <img
              src={posterUrl}
              alt={`${movie.title} poster`}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-movie.png';
              }}
            />
          </div>

          <div className="modal-info">
            <h2>{movie.title}</h2>
            <div className="movie-meta">
              <span>{year}</span>
              <span>•</span>
              <span>{runtime}</span>
              <span>•</span>
              <span>⭐ {movie.vote_average.toFixed(1)}</span>
            </div>

            <p className="movie-description">{movie.overview || 'No description available.'}</p>

            <div className="favorite-section">
              <button
                className={`favorite-button ${isFavorite ? 'active' : ''}`}
                onClick={onToggleFavorite}
              >
                {isFavorite ? '★ Remove from Favorites' : '☆ Add to Favorites'}
              </button>
            </div>

            {isFavorite && (
              <div className="user-input-section">
                <div className="rating-input">
                  <label>Your Rating:</label>
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        className={`star ${star <= (hoverRating || userRating) ? 'filled' : ''}`}
                        onClick={() => handleRatingClick(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        aria-label={`Rate ${star} stars`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="note-input">
                  <label htmlFor="user-note">Your Notes:</label>
                  <textarea
                    id="user-note"
                    value={userNote}
                    onChange={(e) => handleNoteChange(e.target.value)}
                    placeholder="Add your thoughts about this movie..."
                    rows={4}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
