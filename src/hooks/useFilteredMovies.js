import { useMemo } from 'react';
import { CONFIG } from './../constants/config';

export const useShortMovies = (movies, isShort) => {
  const shortMovies = useMemo(() => {
    if (isShort) {
      return [...movies].filter((movie) => movie.duration <= CONFIG.shortDuration);
    } else {
      return movies;
    }
  }, [isShort, movies]);

  return shortMovies;
};

export const useFilteredMovies = (movies, query, isShort) => {
  const shortMovies = useShortMovies(movies, isShort);

  const sortedAndSearchedMovies = useMemo(() => {
    return shortMovies.filter((movie) => movie.nameRU.toLowerCase().includes(query.toLowerCase()));
  }, [query, shortMovies]);

  return sortedAndSearchedMovies;
};
