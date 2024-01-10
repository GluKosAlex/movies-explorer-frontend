import { useState, useContext } from 'react';

import MoviesCardList from './../MoviesCardList/MoviesCardList';
import MyButton from './../ui/MyButton/MyButton';

import { MoviesFilterContext } from '../../contexts/MoviesFilterContext';
import { useFilteredMovies } from './../../hooks/useFilteredMovies';

import { MoviesMock } from './../../constants/db_mock';
import './Movies.css';

export default function Movies() {
  const [moviesList, setMoviesList] = useState(MoviesMock);
  const { moviesFilter } = useContext(MoviesFilterContext);
  const sortedAndSearchedMovies = useFilteredMovies(moviesList, moviesFilter.query, moviesFilter.isShort);

  return (
    <section className="movies">
      <MoviesCardList moviesList={sortedAndSearchedMovies} onSetMoviesList={setMoviesList} />
      <MyButton className="movie__more-btn">Ещё</MyButton>
    </section>
  );
}
