import { useState, useEffect } from 'react';
import { FavoriteMovie } from '../types/movie';

const STORAGE_KEY = 'movie-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error('Error saving favorites:', error);
      }
    }
  }, [favorites, isLoaded]);

  const isFavorite = (movieId: number): boolean => {
    return favorites.some((fav) => fav.id === movieId);
  };

  const addFavorite = (movie: FavoriteMovie) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === movie.id)) {
        return prev;
      }
      return [...prev, movie];
    });
  };

  const removeFavorite = (movieId: number) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== movieId));
  };

  const updateFavorite = (movieId: number, updates: Partial<FavoriteMovie>) => {
    setFavorites((prev) =>
      prev.map((fav) => (fav.id === movieId ? { ...fav, ...updates } : fav))
    );
  };

  const getFavorite = (movieId: number): FavoriteMovie | undefined => {
    return favorites.find((fav) => fav.id === movieId);
  };

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    updateFavorite,
    getFavorite,
    isLoaded,
  };
}
