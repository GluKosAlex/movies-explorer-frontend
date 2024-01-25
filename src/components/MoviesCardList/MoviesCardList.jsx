import MoviesCard from './../MoviesCard/MoviesCard';
import MyButton from './../ui/MyButton/MyButton';

import { useViewport } from './../../hooks/useViewport';
import { useCountToShow } from './../../hooks/useCountToShow';

import { CONFIG } from './../../constants/config.js';
const { screenBreakPoints, initialCountToShow, stepsToShow } = CONFIG;

import { useCallback, useState, useEffect } from 'react';

import './MoviesCardList.css';

export default function MoviesCardList({ moviesToRender }) {
  const { width } = useViewport(); // Detect width of client's screen
  const { initialCount, nextCount } = useCountToShow(
    width,
    screenBreakPoints,
    initialCountToShow,
    stepsToShow,
  ); // Get count of movies to show depending on screen width

  const [index, setIndex] = useState(initialCount); // Index of the last showed movie
  const [isCompleted, setIsCompleted] = useState(true);
  const [moviesToShow, setMoviesToShow] = useState([]);

  useEffect(() => {
    setIndex(initialCount); // Reset count of movies to show
    setMoviesToShow(getMoviesToShow(moviesToRender, moviesToShow, 0, index));
    checkIfCompleted(initialCount);
  }, [moviesToRender]);

  const getMoviesToShow = (movies, showedMovies, start, end) => {
    const slicedMovies = movies.slice(start, end);
    return [...showedMovies, ...slicedMovies];
  };

  const checkIfCompleted = (i) => {
    i >= moviesToRender.length ? setIsCompleted(true) : setIsCompleted(false);
  };

  const showMoreHandler = useCallback(() => {
    setMoviesToShow(getMoviesToShow(moviesToRender, moviesToShow, index, index + nextCount));
    setIndex(index + nextCount);
    checkIfCompleted(index + nextCount);
  }, [index, nextCount, moviesToRender, moviesToShow]);

  return (
    <>
      <ul className="movie-card-list">
        {moviesToShow.map((item) => {
          return <MoviesCard key={item.movieId} movie={item} />;
        })}
      </ul>
      {!isCompleted && (
        <MyButton onClick={showMoreHandler} className="movie-card-list__more-btn">
          Ещё
        </MyButton>
      )}
    </>
  );
}
