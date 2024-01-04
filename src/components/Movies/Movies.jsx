import React from 'react';

import MoviesCardList from './../MoviesCardList/MoviesCardList';
import MoviesCard from './../MoviesCard/MoviesCard';

export default function Movies() {
  return (
    <>
      <h1>компонент страницы с поиском по фильмам</h1>
      <MoviesCardList />
      <MoviesCard />
    </>
  );
}
