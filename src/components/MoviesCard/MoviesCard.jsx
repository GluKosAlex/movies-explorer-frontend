import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { MoviesContext } from './../../contexts/MoviesContext';
import { InfoTooltipContext } from './../../contexts/InfoTooltipContext.js';

import { timeConvertor } from './../../utils/timeConvertor.js';

import './MoviesCard.css';

export default function MoviesCard({ movie, className: classList = '' }) {
  const { savedMoviesList, saveMovie, deleteMovie } = useContext(MoviesContext);
  const { setInfoTooltipContent, setIsInfoTooltipOpen } = useContext(InfoTooltipContext);

  const { duration, image: imageURL, nameRU, movieId, trailerLink } = movie;

  useEffect(() => {
    const isSaved = savedMoviesList.some((savedMovie) => savedMovie.movieId === movie.movieId);
    setIsMovieSaved(isSaved);
  }, [savedMoviesList, movie]);

  const [isMovieSaved, setIsMovieSaved] = useState(false);

  const location = useLocation();

  const saveMovieHandler = () => {
    if (!isMovieSaved) {
      saveMovie(movie)
        .then(() => setIsMovieSaved(true))
        .catch((err) => {
          setIsInfoTooltipOpen(true);
          setInfoTooltipContent({ isFail: true, text: err.message });
          console.error(err);
        });
    } else {
      deleteMovie(movieId)
        .then((res) => {
          setIsMovieSaved(false);
          console.log(res.message);
        })
        .catch((err) => {
          setIsInfoTooltipOpen(true);
          setInfoTooltipContent({ isFail: true, text: err.message });
          console.error(err);
        });
    }
  };

  const deleteMovieHandler = () => {
    deleteMovie(movieId)
      .then((res) => {
        console.log(res.message);
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setInfoTooltipContent({ isFail: true, text: err.message });
        console.error(err);
      });
  };

  return (
    <li className={`movie-card ${classList}`}>
      <a
        className="movie-card__link"
        href={trailerLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Трейлер к фильму ${nameRU}`}
      ></a>
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
