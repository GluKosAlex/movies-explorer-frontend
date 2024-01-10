import { useState, useContext, useEffect } from 'react';

import MoviesCardList from './../MoviesCardList/MoviesCardList';
import MyButton from './../ui/MyButton/MyButton';
import { MoviesFilterContext } from '../../contexts/MoviesFilterContext';
import './Movies.css';

import { MoviesMock } from './../../constants/db_mock';

export default function Movies() {
  const [moviesList, setMoviesList] = useState([]);

  const { moviesFilter } = useContext(MoviesFilterContext);

  useEffect(() => {
    const filteredMoviesList = MoviesMock.filter((movie) =>
      movie.nameRU.includes(moviesFilter.toLowerCase()),
    );
    setMoviesList(filteredMoviesList);
  }, [moviesFilter, setMoviesList]);

  return (
    <section className="movies">
      <MoviesCardList moviesList={moviesList} onSetMoviesList={setMoviesList} />
      <MyButton className="movie__more-btn">Ещё</MyButton>
    </section>
  );
}
