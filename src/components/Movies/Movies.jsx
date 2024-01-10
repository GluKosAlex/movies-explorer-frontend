import { useState } from 'react';

import MoviesCardList from './../MoviesCardList/MoviesCardList';
import MyButton from './../ui/MyButton/MyButton';
import './Movies.css';

import { MoviesMock } from './../../constants/db_mock';

export default function Movies() {
  const [moviesList, setMoviesList] = useState(MoviesMock);

  return (
    <section className="movies">
      <MoviesCardList moviesList={moviesList} onSetMoviesList={setMoviesList} />
      <MyButton className="movie__more-btn">Ещё</MyButton>
    </section>
  );
}
