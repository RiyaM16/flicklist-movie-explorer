import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
  isFavorite: boolean;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieCard({ movie, onSelect, isFavorite }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : '/placeholder.png';

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <div
      className="movie-card"
      onClick={() => onSelect(movie)}
      role="button"
    >
      <div className="poster-container">
        <img
          src={posterUrl}
          alt={`${movie.title} poster`}
          className="poster"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-movie.png';
          }}
        />
        {isFavorite && (
          <div className="favorite-badge">
            <span>★</span>
          </div>
        )}
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-year">{year}</p>
        <p className="movie-overview">{movie.overview || 'No description available.'}</p>
      </div>
    </div>
  );
}
