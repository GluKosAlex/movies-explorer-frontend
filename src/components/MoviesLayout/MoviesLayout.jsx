import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { MoviesFilterContext } from './../../contexts/MoviesFilterContext';
import { MoviesContext } from './../../contexts/MoviesContext';

import SearchForm from './../SearchForm/SearchForm';
import Preloader from './../Preloader/Preloader';

import mainApi from './../../utils/MainApi';
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

  useEffect(() => {
    mainApi.setAuthorizationHeader(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg4NGI0YTNiYzVjY2JlMWNjY2Y0MTEiLCJpYXQiOjE3MDU5NDQ5MzAsImV4cCI6MTcwNjU0OTczMH0.iPhZ46_YR_0R2za7Wmi8Y3D0K8i7E0AP9sxiIcUPkeU',
    );
    mainApi
      .getMovies()
      .then((savedMovies) => {
        setSavedMoviesList(savedMovies);
      })
      .catch((err) => console.error('ОШИБКА СЕРВЕРА', err));
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
