import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { MoviesFilterContext } from './../../contexts/MoviesFilterContext';
import { MoviesContext } from './../../contexts/MoviesContext';

import SearchForm from './../SearchForm/SearchForm';
import Preloader from './../Preloader/Preloader';

export default function MoviesLayout() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [moviesFilter, setMoviesFilter] = useState({ query: '', isShort: false });

  useEffect(() => {
    // Promise.all([getMovies, getSavedMovies])
    //   .then(([movies, savedMovies]) => {
    //     setMoviesList(movies);
    //     setSavedMoviesList(savedMovies);
    //     return true;
    //   })
    //   .then((isLoaded) => setIsLoaded(isLoaded))
    //   .catch((e) => {
    //     console.log(e);
    //   });
  }, []);

  return (
    <main className="page__content main">
      <MoviesContext.Provider value={{ moviesList, setMoviesList, savedMoviesList, setSavedMoviesList }}>
        <MoviesFilterContext.Provider value={{ moviesFilter, setMoviesFilter }}>
          <SearchForm />
          {!isLoaded ? <Preloader /> : <Outlet />}
        </MoviesFilterContext.Provider>
      </MoviesContext.Provider>
    </main>
  );
}
