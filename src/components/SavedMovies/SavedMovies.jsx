import { useState, useContext, useEffect } from 'react';

import { MoviesContext } from '../../contexts/MoviesContext.js';

import './SavedMovies.css';

import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';

import { filterMoviesByName, filterShortMovies } from './../../utils/filterMovies.js';
import { movieSearchErrorMessages } from './../../constants/constants.js';

export default function SavedMovies() {
  const { savedMoviesList } = useContext(MoviesContext); // List of saved movies

  const [moviesFilter, setMoviesFilter] = useState({ query: '', isShort: false }); // Search form data
  const [searchedMovies, setSearchedMovies] = useState([]); // List of movies filtered by name
  const [moviesToRender, setMoviesToRender] = useState([]); // List of movies filtered by name and shortness

  useEffect(() => {
    setSearchedMovies(savedMoviesList);
    setMoviesToRender(savedMoviesList);
  }, [savedMoviesList]);

  const filterMoviesHandler = (movies, filterQuery) => {
    const filteredMoviesByName = filterMoviesByName(movies, filterQuery.query);
    setSearchedMovies(filteredMoviesByName);
    if (!filterQuery.isShort) {
      setMoviesToRender(filteredMoviesByName);
    } else {
      const filteredMoviesByNameAndShort = filterShortMovies(filteredMoviesByName, filterQuery.isShort);
      setMoviesToRender(filteredMoviesByNameAndShort);
    }
  };

  const searchFormSubmitHandler = (data) => {
    const newMoviesFilter = { ...moviesFilter, query: data.search };
    setMoviesFilter(newMoviesFilter);
    filterMoviesHandler(savedMoviesList, newMoviesFilter);
  };

  const isShortChangeHandler = (e) => {
    const newMoviesFilter = { ...moviesFilter, isShort: e.target.checked };
    setMoviesFilter(newMoviesFilter);

    const filteredMoviesByNameAndShort = filterShortMovies(searchedMovies, newMoviesFilter.isShort);
    setMoviesToRender(filteredMoviesByNameAndShort);
  };

  return (
    <main className="page__content main">
      <SearchForm
        onSearchFormSubmit={searchFormSubmitHandler}
        onIsShortChangeHandler={isShortChangeHandler}
        moviesFilter={moviesFilter}
      />

      {savedMoviesList.length !== 0 && (
        <section className="saved-movies">
          {moviesToRender.length !== 0 ? (
            <MoviesCardList moviesToShow={moviesToRender} />
          ) : (
            savedMoviesList.length !== 0 && (
              <p className="saved-movies__message">{movieSearchErrorMessages.notFoundError}</p>
            )
          )}
        </section>
      )}
    </main>
  );
}
