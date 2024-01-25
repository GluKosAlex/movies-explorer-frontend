import { useEffect, useState, useRef, useCallback, useContext } from 'react';

import { MoviesContext } from '../../contexts/MoviesContext.js';

import { useFilteredMovies } from './../../hooks/useFilteredMovies';
import { useViewport } from './../../hooks/useViewport';
import { useCountToShow } from './../../hooks/useCountToShow';

import './SavedMovies.css';

import Preloader from './../Preloader/Preloader';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';
import MyButton from './../ui/MyButton/MyButton';

import getMoviesToShow from './../../utils/getMoviesToShow';

import { movieSearchErrorMessages } from './../../constants/constants.js';
import { CONFIG } from './../../constants/config.js';

const { screenBreakPoints, initialCountToShow, stepsToShow } = CONFIG;

export default function SavedMovies() {
  const { savedMoviesList } = useContext(MoviesContext);

  const { width } = useViewport(); // Detect width of client's screen
  const { initialCount, nextCount } = useCountToShow(
    width,
    screenBreakPoints,
    initialCountToShow,
    stepsToShow,
  ); // Get count of movies to show depending on screen width

  const [moviesFilter, setMoviesFilter] = useState({ query: '', isShort: false }); // Search form data
  // const [isLoading, setIsLoading] = useState(false); // Loading state for Preloader
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [isCompleted, setIsCompleted] = useState(true);

  const [index, setIndex] = useState(initialCount); // Index of the last showed movie
  let sortedAndSearchedMovies = useFilteredMovies(savedMoviesList, moviesFilter.query, moviesFilter.isShort); // Array of searched and filtered movies

  const arrayForHoldingSavedMovies = useRef([]);

  useEffect(() => {
    console.log('🚀 ~ SavedMovies ~ moviesToShow:', moviesToShow);
    setIndex(initialCount); // Reset count of movies to show
    setMoviesToShow(getMoviesToShow(sortedAndSearchedMovies, arrayForHoldingSavedMovies.current, 0, index));
    checkIfCompleted(initialCount);
  }, [moviesFilter.query, moviesFilter.isShort]);

  const checkIfCompleted = (i) => {
    i >= sortedAndSearchedMovies.length ? setIsCompleted(true) : setIsCompleted(false);
  };

  const searchFormSubmitHandler = (data) => {
    setMoviesFilter({ ...moviesFilter, query: data.search });
  };

  const isShortChangeHandler = (e) => {
    setMoviesFilter({ ...moviesFilter, isShort: e.target.checked });
  };

  const showMoreHandler = useCallback(() => {
    setMoviesToShow(
      getMoviesToShow(sortedAndSearchedMovies, arrayForHoldingSavedMovies.current, index, index + nextCount),
    );
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
      {moviesToShow.length === 0 ? (
        <Preloader />
      ) : (
        <section className="saved-movies">
          {moviesToShow.length !== 0 ? (
            <MoviesCardList moviesToRender={moviesToShow} />
          ) : (
            savedMoviesList.length !== 0 && (
              <p className="movies__message">{movieSearchErrorMessages.notFoundError}</p>
            )
          )}
          {!isCompleted && (
            <MyButton onClick={showMoreHandler} className="saved-movies__more-btn">
              Ещё
            </MyButton>
          )}
        </section>
      )}
    </main>
  );
}
