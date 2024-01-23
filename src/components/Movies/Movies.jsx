import { useContext, useEffect, useState, useRef, useCallback } from 'react';

import { useFilteredMovies } from './../../hooks/useFilteredMovies';
import { useViewport } from './../../hooks/useViewport';
import { useCountToShow } from './../../hooks/useCountToShow';

import { MoviesFilterContext } from './../../contexts/MoviesFilterContext';
import { MoviesContext } from './../../contexts/MoviesContext';

import MoviesCardList from './../MoviesCardList/MoviesCardList';
import MyButton from './../ui/MyButton/MyButton';

import './Movies.css';
import { CONFIG } from './../../constants/config';

export default function Movies() {
  const { moviesFilter } = useContext(MoviesFilterContext);
  const { moviesList, savedMoviesList } = useContext(MoviesContext);

  const { screenBreakPoints, stepsToShow } = CONFIG;
  const { width } = useViewport();
  const { nextCount } = useCountToShow(width, screenBreakPoints, stepsToShow); // count of movies to show
  const sortedAndSearchedMovies = useFilteredMovies(moviesList, moviesFilter.query, moviesFilter.isShort);

  const [moviesToShow, setMoviesToShow] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(nextCount); // Index of the last showed movie

  const arrayForFlaggedMovies = useRef([]);

  useEffect(() => {
    initialMoviesToShow(sortedAndSearchedMovies, savedMoviesList, 0, nextCount);
    checkIfCompleted();
  }, [moviesFilter.query, moviesFilter.isShort]);

  useEffect(() => {
    setIndex(nextCount);
  }, [moviesFilter.query, moviesFilter.isShort]);

  const checkIfCompleted = () => {
    index >= sortedAndSearchedMovies.length ? setIsCompleted(true) : setIsCompleted(false);
  };

  const flagSavedMovies = (movies, savedMovies) => {
    const flaggedMovies = movies.map((movie) => {
      return savedMovies.some((savedMovie) => {
        return savedMovie.movieId === movie.movieId;
      })
        ? { ...movie, saved: true }
        : { ...movie, saved: false };
    });
    return flaggedMovies;
  };

  const initialMoviesToShow = (movies, savedMovies, start, end) => {
    const slicedMovies = movies.slice(start, end);
    const slicedAndFlaggedMovies = flagSavedMovies(slicedMovies, savedMovies);
    arrayForFlaggedMovies.current = slicedAndFlaggedMovies;
    setMoviesToShow(arrayForFlaggedMovies.current);
  };

  const addNextMoviesToShow = (movies, savedMovies, start, end) => {
    const slicedMovies = movies.slice(start, end);
    const slicedAndFlaggedMovies = flagSavedMovies(slicedMovies, savedMovies);
    arrayForFlaggedMovies.current = [...arrayForFlaggedMovies.current, ...slicedAndFlaggedMovies];
    setMoviesToShow(arrayForFlaggedMovies.current);
  };

  const showMoreHandler = useCallback(() => {
    addNextMoviesToShow(sortedAndSearchedMovies, savedMoviesList, index, index + nextCount);
    setIndex(index + nextCount);
    checkIfCompleted();
  }, [index, nextCount, sortedAndSearchedMovies]);

  return (
    <section className="movies">
      <MoviesCardList moviesToRender={moviesToShow} />
      {!isCompleted && (
        <MyButton onClick={showMoreHandler} className="movies__more-btn">
          Ещё
        </MyButton>
      )}
    </section>
  );
}
