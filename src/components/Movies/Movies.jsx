import React from 'react';

import MoviesCardList from './../MoviesCardList/MoviesCardList';
import MyButton from './../ui/MyButton/MyButton';
import './Movies.css';

export default function Movies() {
  return (
    <section className="movies">
      <MoviesCardList />
      <MyButton className="movie__more-btn">Ещё</MyButton>
    </section>
  );
}
