import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { timeConvertor } from './../../utils/timeConvertor';

import './MoviesCard.css';

export default function MoviesCard({ name, movieId, duration, image, isSaved, className: classList }) {
  const [cardSaved, setCardSaved] = useState(isSaved);

  const location = useLocation();

  const saveMovieHandler = () => {
    setCardSaved(!cardSaved);
  };

  const deleteMovieHandler = () => {
    console.log(movieId);
  };

  return (
    <li className={`movie-card ${classList}`}>
      <img className="movie-card__image" src={image} alt="33 слова о дизайне" />
      <div className="movie-card__caption">
        <h2 className="movie-card__header">{name}</h2>
        <span className="movie-card__time">{timeConvertor(duration)}</span>
      </div>
      {location.pathname === '/movies' && (
        <button
          className={`movie-card__btn movie-card__btn_type${cardSaved ? '_saved' : '_unsaved'}`}
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
