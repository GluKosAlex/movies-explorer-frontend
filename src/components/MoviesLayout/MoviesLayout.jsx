import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import SearchForm from './../SearchForm/SearchForm';
import { MoviesFilterContext } from './../../contexts/MoviesFilterContext';
// import Preloader from './../Preloader/Preloader';

export default function MoviesLayout() {
  const [moviesFilter, setMoviesFilter] = useState('');

  return (
    <main className="page__content main">
      <MoviesFilterContext.Provider value={{ moviesFilter, setMoviesFilter }}>
        <SearchForm />
        {/* <Preloader /> */}
        <Outlet />
      </MoviesFilterContext.Provider>
    </main>
  );
}
