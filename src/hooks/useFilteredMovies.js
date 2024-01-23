import { useMemo } from 'react';
import { CONFIG } from './../constants/config';

export const useShortMovies = (movies, isShort) => {
  const shortMovies = useMemo(() => {
    if (isShort) {
      return [...movies].filter((movie) => movie.duration <= CONFIG.shortMovieDuration);
    } else {
      return movies;
    }
  }, [isShort, movies]);

  return shortMovies;
};

export const useFilteredMovies = (movies, query, isShort) => {
  const sortedMovies = useShortMovies(movies, isShort);

  const sortedAndSearchedMovies = useMemo(() => {
    return sortedMovies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, sortedMovies]);

  return sortedAndSearchedMovies;
};
