import { useState } from 'react';

import MoviesCardList from './../MoviesCardList/MoviesCardList';
import MyButton from './../ui/MyButton/MyButton';
import './SavedMovies.css';

import { MoviesSavedMock } from './../../constants/db_mock';

export default function SavedMovies() {
  const [savedMoviesList, setSavedMoviesList] = useState(MoviesSavedMock);

  return (
    <section className="saved-movies">
      <MoviesCardList moviesList={savedMoviesList} onSetMoviesList={setSavedMoviesList} />
      <MyButton className="saved-movie__more-btn">Ещё</MyButton>
    </section>
  );
}
