const getPathFirstName = () => {
  return document.location.pathname.split('/')[1];
};

const setStoreMovieSearchQuery = (searchQuery) => {
  const path = getPathFirstName();

  localStorage.setItem(`search-query_${path}`, JSON.stringify(searchQuery));
};

const setStoreSearchedMovies = (movies) => {
  const path = getPathFirstName();

  if (movies) {
    localStorage.setItem(`searched_${path}`, JSON.stringify(movies));
  }
};

const getStoreMovieSearchQuery = () => {
  const path = getPathFirstName();

  return JSON.parse(localStorage.getItem(`search-query_${path}`));
};

const getStoreSearchedMovies = () => {
  const path = getPathFirstName();

  return JSON.parse(localStorage.getItem(`searched_${path}`));
};

export {
  getPathFirstName,
  setStoreMovieSearchQuery,
  setStoreSearchedMovies,
  getStoreMovieSearchQuery,
  getStoreSearchedMovies,
};
