import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { MoviesFilterContext } from './../../contexts/MoviesFilterContext';
import { MoviesContext } from './../../contexts/MoviesContext';

import movieApi from '../../utils/MoviesApi';

export default function MoviesLayout() {
  const [moviesList, setMoviesList] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [moviesFilter, setMoviesFilter] = useState({ query: '', isShort: false });
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    setIsLoaded(false);
    if (moviesFilter.query) {
      console.log('hey', isLoaded);
      movieApi
        .getMovies()
        .then((movies) => {
          setMoviesList(movies);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(setIsLoaded(true));
    }
  }, [moviesFilter.query]);

  return (
    <main className="page__content main">
      <MoviesContext.Provider value={{ moviesList, setMoviesList, savedMoviesList, setSavedMoviesList }}>
        <MoviesFilterContext.Provider value={{ moviesFilter, setMoviesFilter }}>
          <Outlet />
        </MoviesFilterContext.Provider>
      </MoviesContext.Provider>
    </main>
  );
}
