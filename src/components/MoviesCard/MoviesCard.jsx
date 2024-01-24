import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { timeConvertor } from './../../utils/timeConvertor.js';
import mainApi from './../../utils/MainApi.js';
import { movieApiURL } from './../../constants/constants.js';

import './MoviesCard.css';

export default function MoviesCard({ nameRU, movieId, duration, image, isSaved, className: classList = '' }) {
  const [isMovieSaved, setIsMovieSaved] = useState(isSaved);
  const imageURL = `${movieApiURL}${image.url}`;

  const location = useLocation();

  const saveMovieHandler = () => {
    setIsMovieSaved(!isMovieSaved);
    if (!isMovieSaved) {
      mainApi.createMovie();
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
