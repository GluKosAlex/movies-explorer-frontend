import { useEffect, useState, useContext } from 'react';

import { MoviesContext } from '../../contexts/MoviesContext.js';
import { IsLoadingContext } from './../../contexts/IsLoadingContext';

import './Movies.css';

import Preloader from './../Preloader/Preloader';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';
import MyButton from './../ui/MyButton/MyButton';

import { useViewport } from './../../hooks/useViewport';
import { useCountToShow } from './../../hooks/useCountToShow';

import {
  setStoreMovieSearchQuery,
  setStoreSearchedMovies,
  getStoreMovieSearchQuery,
  getStoreSearchedMovies,
} from './../../utils/storeMovieSearchData';
import { filterMoviesByName, filterShortMovies } from './../../utils/filterMovies.js';

import { movieSearchErrorMessages } from './../../constants/constants.js';
import { CONFIG } from './../../constants/config.js';
const { screenBreakPoints, initialCountToShow, stepsToShow } = CONFIG;

export default function Movies({ fetchAllMovies, isApiError, setIsApiError }) {
  const { moviesList } = useContext(MoviesContext); // Lists of all movies from server and saved movies
  const { isLoading, setIsLoading } = useContext(IsLoadingContext);

  const { width } = useViewport(); // Detect width of client's screen
  const { initialCount, nextCount } = useCountToShow(
    width,
    screenBreakPoints,
    initialCountToShow,
    stepsToShow,
  ); // Get count of movies to show depending on screen width

  const [index, setIndex] = useState(initialCount); // Index of the last showed movie
  const [isCompleted, setIsCompleted] = useState(true); // Indicate if the list of searched movies is complete
  const [moviesToShow, setMoviesToShow] = useState([]); // List of searched movies that going to be show

  const [moviesFilter, setMoviesFilter] = useState(
    getStoreMovieSearchQuery() || { query: '', isShort: false },
  ); // Search form query data
  const [searchedMovies, setSearchedMovies] = useState([]); // List of movies filtered by name
  const [moviesToRender, setMoviesToRender] = useState([]); // List of movies filtered by name and shortness

  useEffect(() => {
    const searchedMoviesFormStore = getStoreSearchedMovies();
    const searchQueryFormStore = getStoreMovieSearchQuery();
    if (searchedMoviesFormStore && searchedMoviesFormStore.length !== 0 && searchedMoviesFormStore) {
      filterMoviesHandler(searchedMoviesFormStore, searchQueryFormStore);
    }
  }, []);

  useEffect(() => {
    if (searchedMovies.length !== 0) {
      setStoreSearchedMovies(searchedMovies); // Save searched movies list to local storage
    }
  }, [searchedMovies]);

  useEffect(() => {
    setIndex(initialCount); // Reset count of movies to show
    setMoviesToShow(getMoviesToShow(moviesToRender, moviesToShow, 0, initialCount));
    checkIfCompleted(initialCount); // Check if list complete on initial movies render
  }, [moviesToRender, initialCount]);

  const getMoviesToShow = (movies, showedMovies, start, end) => {
    const slicedMovies = movies.slice(start, end);
    return start === 0 ? slicedMovies : [...showedMovies, ...slicedMovies];
  };

  const checkIfCompleted = (i) => {
    i >= moviesToRender.length ? setIsCompleted(true) : setIsCompleted(false);
  };

  const showMoreHandler = () => {
    setMoviesToShow(getMoviesToShow(moviesToRender, moviesToShow, index, index + nextCount));
    setIndex(index + nextCount);
    checkIfCompleted(index + nextCount); // Check if list complete
  };

  const filterMoviesHandler = (movies, filterQuery) => {
    const filteredMoviesByName = filterMoviesByName(movies, filterQuery.query);
    setSearchedMovies(filteredMoviesByName);
    if (!filterQuery.isShort) {
      setMoviesToRender(filteredMoviesByName);
    } else {
      const filteredMoviesByNameAndShort = filterShortMovies(filteredMoviesByName, filterQuery.isShort);
      setMoviesToRender(filteredMoviesByNameAndShort);
    }
  };

  const searchFormSubmitHandler = (data) => {
    const newMoviesFilter = { ...moviesFilter, query: data.search };
    if (moviesList.length === 0) {
      fetchAllMovies()
        .then((adaptedMovies) => {
          setStoreMovieSearchQuery(newMoviesFilter); // Save search filter query to local storage
          setMoviesFilter(newMoviesFilter);

          filterMoviesHandler(adaptedMovies, newMoviesFilter);
        })
        .catch((err) => {
          console.error(err);
          setIsApiError(true);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(true);
      setStoreMovieSearchQuery(newMoviesFilter); // Save search filter query to local storage
      setMoviesFilter(newMoviesFilter);

      filterMoviesHandler(moviesList, newMoviesFilter);
      setIsLoading(false);
    }
  };

  const isShortChangeHandler = (e) => {
    const newMoviesFilter = { ...moviesFilter, isShort: e.target.checked };
    setMoviesFilter(newMoviesFilter);
    setStoreMovieSearchQuery(newMoviesFilter); // Save search filter query to local storage

    const filteredMoviesByNameAndShort = filterShortMovies(searchedMovies, newMoviesFilter.isShort);
    setMoviesToRender(filteredMoviesByNameAndShort);
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
            <MoviesCardList moviesToShow={moviesToShow} />
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
