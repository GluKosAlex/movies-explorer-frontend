import { useState, useContext } from 'react';

import { MoviesContext } from '../../contexts/MoviesContext.js';

import './SavedMovies.css';

import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';

import { filterMoviesByName, filterShortMovies } from './../../utils/filterMovies.js';
import { movieSearchErrorMessages } from './../../constants/constants.js';

export default function SavedMovies() {
  const { savedMoviesList } = useContext(MoviesContext);

  const [moviesFilter, setMoviesFilter] = useState({ query: '', isShort: false }); // Search form data
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [moviesToRender, setMoviesToRender] = useState([]);

  const filterMoviesHandler = (movies, filterQuery) => {
    const filteredMoviesByName = filterMoviesByName(movies, filterQuery.query);
    setSearchedMovies(filteredMoviesByName);
    if (!filterQuery.isShort) {
      setMoviesToRender(filteredMoviesByName);
    } else {
      const filteredMoviesByNameAndShort = filterShortMovies(filteredMoviesByName);
      setMoviesToRender(filteredMoviesByNameAndShort);
    }
  };

  const searchFormSubmitHandler = (data) => {
    const newMoviesFilter = { ...moviesFilter, query: data.search };
    setMoviesFilter(newMoviesFilter);
    filterMoviesHandler(searchedMovies, newMoviesFilter);
  };

  const isShortChangeHandler = (e) => {
    const newMoviesFilter = { ...moviesFilter, isShort: e.target.checked };
    setMoviesFilter(newMoviesFilter);

    if (newMoviesFilter.isShort) {
      const filteredMoviesByNameAndShort = filterShortMovies(searchedMovies);
      setMoviesToRender(filteredMoviesByNameAndShort);
    }
  };

  return (
    <main className="page__content main">
      <SearchForm
        onSearchFormSubmit={searchFormSubmitHandler}
        onIsShortChangeHandler={isShortChangeHandler}
        moviesFilter={moviesFilter}
      />

      <section className="saved-movies">
        {moviesToRender.length !== 0 ? (
          <MoviesCardList moviesToRender={moviesToRender} />
        ) : (
          savedMoviesList.length !== 0 && (
            <p className="movies__message">{movieSearchErrorMessages.notFoundError}</p>
          )
        )}
      </section>
    </main>
  );
}
