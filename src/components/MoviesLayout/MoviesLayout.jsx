import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { MoviesFilterContext } from './../../contexts/MoviesFilterContext';
import { MoviesContext } from './../../contexts/MoviesContext';

import SearchForm from './../SearchForm/SearchForm';
import Preloader from './../Preloader/Preloader';

import { MoviesMock } from './../../constants/db_mock';
import { MoviesSavedMock } from './../../constants/db_mock';

export default function MoviesLayout() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [moviesList, setMoviesList] = useState(MoviesMock);
  const [savedMoviesList, setSavedMoviesList] = useState(MoviesSavedMock);
  const [moviesFilter, setMoviesFilter] = useState({ query: '', isShort: false });

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  console.count();

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
