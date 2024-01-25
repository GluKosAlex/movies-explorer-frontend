import { useEffect, useState, useContext } from 'react';

import { MoviesContext } from '../../contexts/MoviesContext.js';

import './Movies.css';

import Preloader from './../Preloader/Preloader';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';

import movieApi from './../../utils/MoviesApi';
import {
  setStoreMovieSearchQuery,
  setStoreSearchedMovies,
  getStoreMovieSearchQuery,
  getStoreSearchedMovies,
} from './../../utils/storeMovieSearchData';
import { filterMoviesByName, filterShortMovies } from './../../utils/filterMovies.js';

import { movieSearchErrorMessages } from './../../constants/constants.js';
import moviesDataAdapter from './../../utils/moviesDataAdapter';

export default function Movies() {
  const { moviesList, setMoviesList } = useContext(MoviesContext);

  const [moviesFilter, setMoviesFilter] = useState(
    getStoreMovieSearchQuery() || { query: '', isShort: false },
  ); // Search form data
  const [isLoading, setIsLoading] = useState(false); // Loading state for Preloader
  const [isApiError, setIsApiError] = useState(false);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [moviesToRender, setMoviesToRender] = useState([]);

  useEffect(() => {
    const searchedMoviesFormStore = getStoreSearchedMovies();
    if (searchedMoviesFormStore) {
      setSearchedMovies(searchedMoviesFormStore);
    }
  }, []);

  useEffect(() => {
    if (searchedMovies.length !== 0) {
      setStoreSearchedMovies(searchedMovies);
    }
  }, [searchedMovies]);

  const searchFormSubmitHandler = (data) => {
    const newMoviesFilter = { ...moviesFilter, query: data.search };
    if (moviesList.length === 0) {
      setIsLoading(true);
      movieApi
        .getMovies()
        .then((movies) => {
          const adaptedMovies = movies.map((movie) => moviesDataAdapter(movie)); // Convert movies data for frontend and main api
          setMoviesList(adaptedMovies);
          setIsApiError(false);
          setStoreMovieSearchQuery(newMoviesFilter);

          const filteredMoviesByName = filterMoviesByName(movies, newMoviesFilter.query);
          setSearchedMovies(filteredMoviesByName);
          if (!newMoviesFilter.isShort) {
            setMoviesToRender(filteredMoviesByName);
          } else {
            const filteredMoviesByNameAndShort = filterShortMovies(filteredMoviesByName);
            setMoviesToRender(filteredMoviesByNameAndShort);
          }
        })
        .catch((err) => {
          console.error(err);
          setIsApiError(true);
        })
        .finally(() => setIsLoading(false));
    } else {
      setStoreMovieSearchQuery(newMoviesFilter);
      setMoviesFilter(newMoviesFilter);
    }
  };

  const isShortChangeHandler = (e) => {
    const newMoviesFilter = { ...moviesFilter, isShort: e.target.checked };
    setMoviesFilter(newMoviesFilter);
    setStoreMovieSearchQuery(newMoviesFilter);

    if (newMoviesFilter.isShort) {
      const filteredMoviesByNameAndShort = filterShortMovies(searchedMovies);
      setMoviesToRender(filteredMoviesByNameAndShort);
    }
  };

  return (
    <main className="page__content main">
      <SearchForm
        onSearchFormSubmit={searchFormSubmitHandler}
        onIsShortChangeHandler={isShortChangeHandler}
        moviesFilter={moviesFilter}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <section className="movies">
          {moviesToRender.length !== 0 ? (
            <MoviesCardList moviesToRender={moviesToRender} />
          ) : (
            (moviesList.length !== 0 && (
              <p className="movies__message">{movieSearchErrorMessages.notFoundError}</p>
            )) ||
            (isApiError && (
              <p className="movies__message movies__message_type_error">
                {movieSearchErrorMessages.serverError}
              </p>
            ))
          )}
        </section>
      )}
    </main>
  );
}
