'use client';

import { useState } from 'react';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import { useFavorites } from './hooks/useFavorites';
import { Movie, TMDBSearchResponse } from './types/movie';
import './styles.css';

export default function Home() {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'search' | 'favorites'>('search');

  const {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    updateFavorite,
    getFavorite,
    isLoaded,
  } = useFavorites();

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/movies?query=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Failed to search movies');
      }

      const data: TMDBSearchResponse = await response.json();
      
      if (data.results.length === 0) {
        setError('No movies found. Try a different search term.');
      }
      
      setSearchResults(data.results);
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMovie = async (movie: Movie) => {
    try {
      // Fetch full movie details including runtime
      const response = await fetch(`/api/movies?id=${movie.id}`);
      if (response.ok) {
        const detailedMovie = await response.json();
        setSelectedMovie(detailedMovie);
      } else {
        setSelectedMovie(movie);
      }
    } catch (err) {
      console.error('Error fetching movie details:', err);
      setSelectedMovie(movie);
    }
  };

  const handleToggleFavorite = () => {
    if (!selectedMovie) return;

    if (isFavorite(selectedMovie.id)) {
      removeFavorite(selectedMovie.id);
    } else {
      addFavorite(selectedMovie);
    }
  };

  const handleUpdateFavorite = (rating?: number, note?: string) => {
    if (!selectedMovie) return;

    updateFavorite(selectedMovie.id, {
      userRating: rating,
      userNote: note,
    });
  };

  return (
    <main className="container">
      <header className="header">
        <h1 className="title"><img src="/icon.png" alt="Flicklist icon" className="title-icon" />Flicklist</h1>
        <p className="subtitle">Discover and save your favorite movies</p>
      </header>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          Search Movies
        </button>
        <button
          className={`tab ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          My Favorites ({favorites.length})
        </button>
      </div>

      {activeTab === 'search' && (
        <>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />

          {error && <div className="error-message">{error}</div>}

          {searchResults.length > 0 && (
            <div className="movies-grid">
              {searchResults.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onSelect={handleSelectMovie}
                  isFavorite={isFavorite(movie.id)}
                />
              ))}
            </div>
          )}

          {!isLoading && searchResults.length === 0 && !error && (
            <div className="empty-state">
              <p>Search for movies to get started!</p>
            </div>
          )}
        </>
      )}

      {activeTab === 'favorites' && (
        <>
          {favorites.length > 0 ? (
            <div className="movies-grid">
              {favorites.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onSelect={handleSelectMovie}
                  isFavorite={true}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No favorites yet. Search for movies and add them to your favorites!</p>
            </div>
          )}
        </>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          isFavorite={isFavorite(selectedMovie.id)}
          favoriteData={getFavorite(selectedMovie.id)}
          onToggleFavorite={handleToggleFavorite}
          onUpdateFavorite={handleUpdateFavorite}
        />
      )}
    </main>
  );
}

