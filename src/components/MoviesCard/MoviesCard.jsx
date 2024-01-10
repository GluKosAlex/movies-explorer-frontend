import { useState } from 'react';
import { timeConvertor } from './../../utils/timeConvertor';

import './MoviesCard.css';

export default function MoviesCard({ name, duration, image, isSaved, className: classList }) {
  const [cardSaved, setCardSaved] = useState(isSaved);

  const saveMovieHandler = () => {
    setCardSaved(!cardSaved);
  };

  return (
    <li className={`movie-card ${classList}`}>
      <img className="movie-card__image" src={image} alt="33 слова о дизайне" />
      <div className="movie-card__caption">
        <h2 className="movie-card__header">{name}</h2>
        <span className="movie-card__time">{timeConvertor(duration)}</span>
      </div>
      <button
        className={`movie-card__btn movie-card__btn_type${cardSaved ? '_saved' : '_unsaved'}`}
        onClick={saveMovieHandler}
      >
        Сохранить
      </button>
    </li>
  );
}
