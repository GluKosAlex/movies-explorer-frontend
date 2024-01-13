import { useContext, useEffect, useState, useRef } from 'react';

import { useFilteredMovies } from './../../hooks/useFilteredMovies';

import { MoviesFilterContext } from '../../contexts/MoviesFilterContext';
import { MoviesContext } from './../../contexts/MoviesContext';

import MoviesCardList from './../MoviesCardList/MoviesCardList';
import MyButton from './../ui/MyButton/MyButton';
import { useViewport } from './../../hooks/useViewport';
import { useCountToShow } from './../../hooks/useCountToShow';

import './SavedMovies.css';
import { CONFIG } from './../../constants/config';

export default function SavedMovies() {
  const { moviesFilter } = useContext(MoviesFilterContext);
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
  const [index, setIndex] = useState(0); // Index of the last movie

  const arrayForHoldingMovies = useRef([]);

  useEffect(() => {
    addNextMoviesToShow(sortedAndSearchedMovies, index, nextCount);
    setIndex(nextCount);
    index >= sortedAndSearchedMovies.length ? setIsCompleted(true) : setIsCompleted(false);
  }, [index, nextCount]);

  useEffect(() => {
    arrayForHoldingMovies.current = [];
  }, [moviesFilter]);

  const addNextMoviesToShow = (movies, start, end) => {
    const slicedMovies = movies.slice(start, end);
    arrayForHoldingMovies.current = [...arrayForHoldingMovies.current, ...slicedMovies];
    setMoviesToShow(arrayForHoldingMovies.current);
  };

  const showMoreHandler = () => {
    index >= sortedAndSearchedMovies.length ? setIsCompleted(true) : setIsCompleted(false);
    addNextMoviesToShow(sortedAndSearchedMovies, index, index + nextCount);
    setIndex(index + nextCount);
  };

  return (
    <section className="saved-movies">
      <MoviesCardList moviesToRender={moviesToShow} />
      {!isCompleted && (
        <MyButton onClick={showMoreHandler} className="movie__more-btn">
          Ещё
        </MyButton>
      )}
    </section>
  );
}
