import React from 'react';

import MoviesCard from './../MoviesCard/MoviesCard';
import MyButton from './../ui/MyButton/MyButton';
import './MoviesCardList.css';

export default function MoviesCardList() {
  return (
    <>
      <ul className="movie-card-list">
        <MoviesCard />
      </ul>
      <MyButton className="movie-card-list__btn">Ещё</MyButton>
    </>
  );
}
