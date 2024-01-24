import { useContext, useEffect, useState, useRef, useCallback } from 'react';

import { useFilteredMovies } from './../../hooks/useFilteredMovies';

import { MoviesContext } from './../../contexts/MoviesContext';

import MoviesCardList from './../MoviesCardList/MoviesCardList';
import MyButton from './../ui/MyButton/MyButton';
import { useViewport } from './../../hooks/useViewport';
import { useCountToShow } from './../../hooks/useCountToShow';

import './SavedMovies.css';
import { CONFIG } from './../../constants/config';

export default function SavedMovies() {
  const { moviesFilter } = useContext(MoviesContext);
  const { savedMoviesList } = useContext(MoviesContext);

  const { screenBreakPoints, stepsToShow } = CONFIG;
  const { width } = useViewport();
  const { nextCount } = useCountToShow(width, screenBreakPoints, stepsToShow);
  const sortedAndSearchedMovies = useFilteredMovies(
    savedMoviesList,
    moviesFilter.query,
    moviesFilter.isShort,
  );

  const [moviesToShow, setMoviesToShow] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(nextCount); // Index of the last movie

  const arrayForHoldingMovies = useRef([]);

  useEffect(() => {
    initialMoviesToShow(sortedAndSearchedMovies, 0, nextCount);
    checkIfCompleted();
  }, [moviesFilter.query, moviesFilter.isShort]);

  useEffect(() => {
    setIndex(nextCount);
  }, [moviesFilter.query, moviesFilter.isShort]);

  const checkIfCompleted = () => {
    index >= sortedAndSearchedMovies.length ? setIsCompleted(true) : setIsCompleted(false);
  };

  const initialMoviesToShow = (movies, start, end) => {
    const slicedMovies = movies.slice(start, end);
    arrayForHoldingMovies.current = slicedMovies;
    setMoviesToShow(arrayForHoldingMovies.current);
  };

  const addNextMoviesToShow = (movies, start, end) => {
    const slicedMovies = movies.slice(start, end);
    arrayForHoldingMovies.current = [...arrayForHoldingMovies.current, ...slicedMovies];
    setMoviesToShow(arrayForHoldingMovies.current);
  };

  const showMoreHandler = useCallback(() => {
    addNextMoviesToShow(sortedAndSearchedMovies, index, index + nextCount);
    setIndex(index + nextCount);
    checkIfCompleted();
  }, [index, nextCount, sortedAndSearchedMovies]);

  return (
    <section className="saved-movies">
      <MoviesCardList moviesToRender={moviesToShow} />
      {!isCompleted && (
        <MyButton onClick={showMoreHandler} className="saved-movies__more-btn">
          Ещё
        </MyButton>
      )}
    </section>
  );
}
