import { CONFIG } from './../constants/config.js';

export const filterShortMovies = (movies, isShort) => {
  if (isShort) {
    return [...movies].filter((movie) => movie.duration <= CONFIG.shortMovieDuration);
  } else {
    return movies;
  }
};

export const filterMoviesByName = (movies, query) => {
  return movies.filter(
    (movie) =>
      movie.nameRU.toLowerCase().includes(query.toLowerCase().trim()) ||
      movie.nameEN.toLowerCase().includes(query.toLowerCase().trim()),
  );
};
