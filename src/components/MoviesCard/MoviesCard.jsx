import React from 'react';

import './MoviesCard.css';

export default function MoviesCard() {
  return (
    <li className="movie-card">
      <h2 className="movie-card__header">
        33 слова о дизайне33 слова о дизайне33 слова о дизайне33 слова о дизайне 33 слова о дизайне33 слова о
        дизайне33 слова о дизайне33 слова о дизайне
      </h2>
      <span className="movie-card__time">1ч 17м</span>
      <img
        className="movie-card__image"
        src="https://images.unsplash.com/photo-1670384072128-1ce7823678cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="33 слова о дизайне"
      />
      <button className="movie-card__btn">Сохранить</button>
    </li>
  );
}
