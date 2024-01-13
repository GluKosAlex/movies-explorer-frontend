import { useContext, useEffect, useState, useRef, useCallback } from 'react';

import { useFilteredMovies } from './../../hooks/useFilteredMovies';

import { MoviesFilterContext } from '../../contexts/MoviesFilterContext';
import { MoviesContext } from './../../contexts/MoviesContext';

import MoviesCardList from './../MoviesCardList/MoviesCardList';
import MyButton from './../ui/MyButton/MyButton';
import { useViewport } from './../../hooks/useViewport';
import { useCountToShow } from './../../hooks/useCountToShow';

import './Movies.css';
import { CONFIG } from './../../constants/config';

export default function Movies() {
  const { moviesFilter } = useContext(MoviesFilterContext);
  const { moviesList, savedMoviesList } = useContext(MoviesContext);

  const { screenBreakPoints, stepsToShow } = CONFIG;
  const { width } = useViewport();
  const { nextCount } = useCountToShow(width, screenBreakPoints, stepsToShow);
  const sortedAndSearchedMovies = useFilteredMovies(moviesList, moviesFilter.query, moviesFilter.isShort);

  const [moviesToShow, setMoviesToShow] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(nextCount); // Index of the last movie
  const arrayForFlaggedMovies = useRef([]);

  useEffect(() => {
    addNextMoviesToShow(sortedAndSearchedMovies, savedMoviesList, 0, nextCount);
  }, [sortedAndSearchedMovies, savedMoviesList, nextCount]);

  const flagSavedMovies = (movies, savedMovies) => {
    return movies.map((movie) => {
      savedMovies.some((savedMovie) => {
        savedMovie.movieId === movie.movieId;
      })
        ? (movie.saved = true)
        : (movie.saved = false);
    });
  };

  const addNextMoviesToShow = (movies, savedMovies, start, end) => {
    const slicedMovies = movies.slice(start, end);
    const slicedAndFlaggedMovies = flagSavedMovies(slicedMovies, savedMovies);
    arrayForFlaggedMovies.current = [...arrayForFlaggedMovies.current, ...slicedAndFlaggedMovies];
    setMoviesToShow(arrayForFlaggedMovies.current);
  };

  const showMoreHandler = () => {
    index >= sortedAndSearchedMovies.length ? setIsCompleted(true) : setIsCompleted(false);
    addNextMoviesToShow(sortedAndSearchedMovies, savedMoviesList, index, index + nextCount);
    setIndex(index + nextCount);
  };

  return (
    <section className="movies">
      <MoviesCardList moviesToRender={moviesToShow} />
      {!isCompleted && (
        <MyButton onClick={showMoreHandler} className="movie__more-btn">
          Ещё
        </MyButton>
      )}
    </section>
  );
}
