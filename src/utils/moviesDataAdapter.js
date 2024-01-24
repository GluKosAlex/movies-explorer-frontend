import { movieApiURL } from './../constants/constants.js';

const moviesDataAdapter = (movie) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
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
    image: `${movieApiURL}${image.url}`,
    trailerLink,
    thumbnail: `${movieApiURL}${image.formats.thumbnail.url}`,
    nameRU,
    nameEN,
    movieId,
  };
};

export default moviesDataAdapter;
