import React from 'react';

import MoviesCard from './../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList() {
  return (
    <ul className="movie-card-list">
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
    </ul>
  );
}
