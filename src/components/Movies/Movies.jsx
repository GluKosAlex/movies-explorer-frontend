import { useEffect, useState, useRef, useCallback } from 'react';

import { useFilteredMovies } from './../../hooks/useFilteredMovies';
import { useViewport } from './../../hooks/useViewport';
import { useCountToShow } from './../../hooks/useCountToShow';

import Preloader from './../Preloader/Preloader';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';
import MyButton from './../ui/MyButton/MyButton';

import movieApi from './../../utils/MoviesApi';
import { CONFIG } from './../../constants/config.js';
const { screenBreakPoints, initialCountToShow, stepsToShow } = CONFIG;
import { movieSearchErrorMessages } from './../../constants/constants.js';
import './Movies.css';

export default function Movies({ savedMoviesList }) {
  const { width } = useViewport(); // Detect width of client's screen
  const { initialCount, nextCount } = useCountToShow(
    width,
    screenBreakPoints,
    initialCountToShow,
    stepsToShow,
  ); // Get count of movies to show depending on screen width

  const [moviesList, setMoviesList] = useState([]); // All movies fetched from server
  const [moviesFilter, setMoviesFilter] = useState({ query: '', isShort: false }); // Search form data
  const [isLoading, setIsLoading] = useState(false); // Loading state for Preloader
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [isCompleted, setIsCompleted] = useState(true);
  const [isApiError, setIsApiError] = useState(false);

  const [index, setIndex] = useState(initialCount); // Index of the last showed movie
  const sortedAndSearchedMovies = useFilteredMovies(moviesList, moviesFilter.query, moviesFilter.isShort); // Array of searched and filtered movies

  const arrayForFlaggedMovies = useRef([]);

  useEffect(() => {
    setIndex(initialCount); // Reset count of movies to show
    setMoviesToShow(getMoviesToShow(sortedAndSearchedMovies, savedMoviesList, 0, index));
    checkIfCompleted(initialCount);
  }, [moviesFilter.query, moviesFilter.isShort]);

  const searchFormSubmitHandler = (data) => {
    if (moviesList.length === 0) {
      setIsLoading(true);
      movieApi
        .getMovies()
        .then((movies) => {
          setMoviesList(movies);
          setIsApiError(false);
          setMoviesFilter({ ...moviesFilter, query: data.search });
        })
        .catch((err) => {
          console.error(err);
          setIsApiError(true);
        })
        .finally(() => setIsLoading(false));
    } else {
      setMoviesFilter({ ...moviesFilter, query: data.search });
    }
  };

  const isShortChangeHandler = (e) => {
    setMoviesFilter({ ...moviesFilter, isShort: e.target.checked });
  };

  const checkIfCompleted = (i) => {
    i >= sortedAndSearchedMovies.length ? setIsCompleted(true) : setIsCompleted(false);
  };

  const flagSavedMovies = (movies, savedMovies) => {
    const flaggedMovies = movies.map((movie) => {
      return savedMovies?.some((savedMovie) => {
        return savedMovie.movieId === movie.movieId;
      })
        ? { ...movie, saved: true }
        : { ...movie, saved: false };
    });
    return flaggedMovies;
  };

  const getMoviesToShow = (movies, savedMovies, start, end) => {
    const slicedMovies = movies.slice(start, end);
    const slicedAndFlaggedMovies = flagSavedMovies(slicedMovies, savedMovies);
    arrayForFlaggedMovies.current =
      start === 0 ? slicedAndFlaggedMovies : [...arrayForFlaggedMovies.current, ...slicedAndFlaggedMovies];
    return arrayForFlaggedMovies.current;
  };

  const showMoreHandler = useCallback(() => {
    setMoviesToShow(getMoviesToShow(sortedAndSearchedMovies, savedMoviesList, index, index + nextCount));
    setIndex(index + nextCount);
    checkIfCompleted(index + nextCount);
  }, [index, nextCount, sortedAndSearchedMovies]);

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
