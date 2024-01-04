import React from 'react';

import MoviesCardList from './../MoviesCardList/MoviesCardList';
import MoviesCard from './../MoviesCard/MoviesCard';

export default function SavedMovies() {
  return (
    <>
      <h1>компонент страницы с сохранёнными карточками фильмов</h1>
      <MoviesCardList />
      <MoviesCard />
    </>
  );
}
