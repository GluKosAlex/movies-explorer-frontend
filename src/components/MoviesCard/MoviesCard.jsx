import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { MoviesContext } from './../../contexts/MoviesContext';

import { timeConvertor } from './../../utils/timeConvertor.js';
import mainApi from './../../utils/MainApi.js';

import './MoviesCard.css';

export default function MoviesCard({ movie, className: classList = '' }) {
  const { savedMoviesList, setSavedMoviesList } = useContext(MoviesContext);

  const { duration, image: imageURL, nameRU, movieId } = movie;

  useEffect(() => {
    const isSaved = savedMoviesList.some((savedMovie) => savedMovie.movieId === movie.movieId);
    setIsMovieSaved(isSaved);
  }, [savedMoviesList, movie]);

  const [isMovieSaved, setIsMovieSaved] = useState(false);

  const location = useLocation();

  const saveMovieHandler = () => {
    if (!isMovieSaved) {
      mainApi
        .createMovie(movie)
        .then((movieData) => {
          setSavedMoviesList([...savedMoviesList, movieData]);
          setIsMovieSaved(true);
        })
        .catch((err) => console.error(err));
    } else {
      const savedMovie = savedMoviesList.find((item) => item.movieId === movieId);
      mainApi
        .deleteMovie(savedMovie._id)
        .then((movieData) => {
          setSavedMoviesList(savedMoviesList.filter((savedMovie) => savedMovie._id !== movieData.id));
          setIsMovieSaved(false);
        })
        .catch((err) => console.error(err));
    }
  };

  const deleteMovieHandler = () => {
    console.log(movieId);
  };

  return (
    <li className={`movie-card ${classList}`}>
      <img className="movie-card__image" src={imageURL} alt={nameRU} />
      <div className="movie-card__caption">
        <h2 className="movie-card__header">{nameRU}</h2>
        <span className="movie-card__time">{timeConvertor(duration)}</span>
      </div>
      {location.pathname === '/movies' && (
        <button
          className={`movie-card__btn movie-card__btn_type${isMovieSaved ? '_saved' : '_unsaved'}`}
          onClick={saveMovieHandler}
        >
          Сохранить
        </button>
      )}
      {location.pathname === '/saved-movies' && (
        <button className={`movie-card__btn movie-card__btn_type_delete`} onClick={deleteMovieHandler}>
          Удалить
        </button>
      )}
    </li>
  );
}
