const flagSavedMovies = (movies, savedMovies) => {
  const flaggedMovies = movies.map((movie) => {
    return savedMovies?.some((savedMovie) => {
      return savedMovie.movieId === movie.movieId;
    })
      ? { ...movie, saved: true }
      : { ...movie, saved: false };
  });
  return flaggedMovies;
};

export default flagSavedMovies;
