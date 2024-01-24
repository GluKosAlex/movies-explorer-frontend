const moviesDataAdapter = (movie) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    id: movieId,
  } = movie;

  return {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    id: movieId,
  };
};

export default moviesDataAdapter;
