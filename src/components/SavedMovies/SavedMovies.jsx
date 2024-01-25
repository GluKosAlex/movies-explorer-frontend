import { useEffect, useState, useRef, useCallback, useContext } from 'react';

import { MoviesContext } from '../../contexts/MoviesContext.js';

import './SavedMovies.css';

import Preloader from './../Preloader/Preloader';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';

import { filterMoviesByName, filterShortMovies } from './../../utils/filterMovies.js';
import { movieSearchErrorMessages } from './../../constants/constants.js';

export default function SavedMovies() {
  const { savedMoviesList } = useContext(MoviesContext);

  const [moviesFilter, setMoviesFilter] = useState({ query: '', isShort: false }); // Search form data
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [moviesToRender, setMoviesToRender] = useState([]);

  const searchFormSubmitHandler = (data) => {
    const newMoviesFilter = { ...moviesFilter, query: data.search };

    const filteredMoviesByName = filterMoviesByName(savedMoviesList, newMoviesFilter.query);
    setSearchedMovies(filteredMoviesByName);
    if (!newMoviesFilter.isShort) {
      setMoviesToRender(filteredMoviesByName);
    } else {
      const filteredMoviesByNameAndShort = filterShortMovies(filteredMoviesByName);
      setMoviesToRender(filteredMoviesByNameAndShort);
    }
  };

  const isShortChangeHandler = (e) => {
    setMoviesFilter({ ...moviesFilter, isShort: e.target.checked });
  };

  const showMoreHandler = useCallback(() => {
    setMoviesToShow(
      getMoviesToShow(sortedAndSearchedMovies, arrayForHoldingSavedMovies.current, index, index + nextCount),
    );
    setIndex(index + nextCount);
    checkIfCompleted(index + nextCount);
  }, [index, nextCount, sortedAndSearchedMovies]);

  return (
    <main className="page__content main">
      <SearchForm
        onSearchFormSubmit={searchFormSubmitHandler}
        onIsShortChangeHandler={isShortChangeHandler}
        moviesFilter={moviesFilter}
      />
      {moviesToShow.length === 0 ? (
        <Preloader />
      ) : (
        <section className="saved-movies">
          {moviesToShow.length !== 0 ? (
            <MoviesCardList moviesToRender={moviesToShow} />
          ) : (
            savedMoviesList.length !== 0 && (
              <p className="movies__message">{movieSearchErrorMessages.notFoundError}</p>
            )
          )}
          {!isCompleted && (
            <MyButton onClick={showMoreHandler} className="saved-movies__more-btn">
              Ещё
            </MyButton>
          )}
        </section>
      )}
    </main>
  );
}
