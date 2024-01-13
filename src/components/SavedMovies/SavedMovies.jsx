import { useContext, useEffect, useState, useRef, useCallback } from 'react';

import { useFilteredMovies } from './../../hooks/useFilteredMovies';

import { MoviesFilterContext } from './../../contexts/MoviesFilterContext';
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
  let index = moviesToShow.length;
  console.log('🚀 ~ SavedMovies ~ index:', index);

  const arrayForHoldingMovies = useRef([]);

  useEffect(() => {
    index = 0;
    initialMoviesToShow(sortedAndSearchedMovies, index, nextCount);
    index >= sortedAndSearchedMovies.length ? setIsCompleted(true) : setIsCompleted(false);
  }, [moviesFilter.query, moviesFilter.isShort]);

  const initialMoviesToShow = (movies, start, end) => {
    console.log('🚀 ~ initialMoviesToShow ~ movies, start, end:', movies, start, end);
    const slicedMovies = movies.slice(start, end);
    arrayForHoldingMovies.current = slicedMovies;
    setMoviesToShow(arrayForHoldingMovies.current);
  };

  const addNextMoviesToShow = (movies, start, end = 0) => {
    console.log('🚀 ~ addNextMoviesToShow ~ movies, start, end:', movies, start, end);
    const slicedMovies = movies.slice(start, end);
    arrayForHoldingMovies.current = [...arrayForHoldingMovies.current, ...slicedMovies];
    setMoviesToShow(arrayForHoldingMovies.current);
  };

  const showMoreHandler = useCallback(() => {
    const index = moviesToShow.length;
    console.log('showMoreHandler');
    console.log('index', index);
    addNextMoviesToShow(sortedAndSearchedMovies, index, index + nextCount);
  }, [nextCount, sortedAndSearchedMovies]);
  console.count('rerender count');

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
