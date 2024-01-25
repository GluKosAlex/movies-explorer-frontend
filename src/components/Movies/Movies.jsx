import { useEffect, useState, useCallback, useContext } from 'react';

import { MoviesContext } from '../../contexts/MoviesContext.js';

import { useFilteredMovies } from './../../hooks/useFilteredMovies';
import { useViewport } from './../../hooks/useViewport';
import { useCountToShow } from './../../hooks/useCountToShow';

import './Movies.css';

import Preloader from './../Preloader/Preloader';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';
import MyButton from './../ui/MyButton/MyButton';

import movieApi from './../../utils/MoviesApi';
import {
  setStoreMovieSearchQuery,
  setStoreSearchedMovies,
  getStoreMovieSearchQuery,
  getStoreSearchedMovies,
} from './../../utils/storeMovieSearchData';
// import getMoviesToShow from './../../utils/getMoviesToShow';

import { movieSearchErrorMessages } from './../../constants/constants.js';
import { CONFIG } from './../../constants/config.js';
import moviesDataAdapter from './../../utils/moviesDataAdapter';

const { screenBreakPoints, initialCountToShow, stepsToShow } = CONFIG;

export default function Movies() {
  const { moviesList, setMoviesList } = useContext(MoviesContext);

  const { width } = useViewport(); // Detect width of client's screen
  const { initialCount, nextCount } = useCountToShow(
    width,
    screenBreakPoints,
    initialCountToShow,
    stepsToShow,
  ); // Get count of movies to show depending on screen width

  const [moviesFilter, setMoviesFilter] = useState(
    getStoreMovieSearchQuery() || { query: '', isShort: false },
  ); // Search form data
  const [isLoading, setIsLoading] = useState(false); // Loading state for Preloader
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [isCompleted, setIsCompleted] = useState(true);
  const [isApiError, setIsApiError] = useState(false);
  const [sortedAndSearchedMovies, setSortedAndSearchedMovies] = useState([]);

  const [index, setIndex] = useState(initialCount); // Index of the last showed movie
  const sortedAndSearched = useFilteredMovies(moviesList, moviesFilter.query, moviesFilter.isShort); // Array of searched and filtered movies

  useEffect(() => {
    const searchedMoviesFormStore = getStoreSearchedMovies();
    if (searchedMoviesFormStore) {
      setSortedAndSearchedMovies(searchedMoviesFormStore);
    }
  }, []);

  useEffect(() => {
    if (sortedAndSearched.length !== 0) {
      setSortedAndSearchedMovies(sortedAndSearched);
    }
  }, [moviesFilter.query, moviesFilter.isShort]);

  useEffect(() => {
    setIndex(initialCount); // Reset count of movies to show
    setMoviesToShow(getMoviesToShow(sortedAndSearchedMovies, moviesToShow, 0, index));
    checkIfCompleted(initialCount);
    if (sortedAndSearchedMovies.length !== 0) {
      setStoreSearchedMovies(sortedAndSearchedMovies);
    }
  }, [sortedAndSearchedMovies]);

  const checkIfCompleted = (i) => {
    i >= sortedAndSearchedMovies.length ? setIsCompleted(true) : setIsCompleted(false);
  };

  const getMoviesToShow = (movies, showedMovies, start, end) => {
    const slicedMovies = movies.slice(start, end);
    const result = start === 0 ? slicedMovies : [...showedMovies, ...slicedMovies];
    return result;
  };

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
          setMoviesFilter(newMoviesFilter);
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
  };

  const showMoreHandler = useCallback(() => {
    setMoviesToShow(getMoviesToShow(sortedAndSearchedMovies, moviesToShow, index, index + nextCount));
    setIndex(index + nextCount);
    checkIfCompleted(index + nextCount);
  }, [index, nextCount, sortedAndSearchedMovies, moviesToShow]);

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
          {moviesToShow.length !== 0 ? (
            <MoviesCardList moviesToRender={moviesToShow} />
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
          {!isCompleted && (
            <MyButton onClick={showMoreHandler} className="movies__more-btn">
              Ещё
            </MyButton>
          )}
        </section>
      )}
    </main>
  );
}
