const getMoviesToShow = (movies, clipboard, start, end) => {
  const slicedMovies = movies.slice(start, end);
  console.log('🚀 ~ getMoviesToShow ~ slicedMovies:', slicedMovies);
  console.log('🚀 ~ getMoviesToShow ~ clipboard:', clipboard);
  clipboard = start === 0 ? slicedMovies : [...clipboard, ...slicedMovies];
  return clipboard;
};

export default getMoviesToShow;
