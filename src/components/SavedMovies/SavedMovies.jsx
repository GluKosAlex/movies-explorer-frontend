import { useState, useContext } from 'react';

import MoviesCardList from './../MoviesCardList/MoviesCardList';
import MyButton from './../ui/MyButton/MyButton';

import { MoviesFilterContext } from '../../contexts/MoviesFilterContext';
import { useFilteredMovies } from './../../hooks/useFilteredMovies';

import { MoviesSavedMock } from './../../constants/db_mock';
import './SavedMovies.css';

export default function SavedMovies() {
  const [savedMoviesList, setSavedMoviesList] = useState(MoviesSavedMock);
  const { moviesFilter } = useContext(MoviesFilterContext);
  const sortedAndSearchedMovies = useFilteredMovies(
    savedMoviesList,
    moviesFilter.query,
    moviesFilter.isShort,
  );

  return (
    <section className="saved-movies">
      <MoviesCardList moviesList={sortedAndSearchedMovies} onSetMoviesList={setSavedMoviesList} />
      <MyButton className="saved-movie__more-btn">Ещё</MyButton>
    </section>
  );
}
