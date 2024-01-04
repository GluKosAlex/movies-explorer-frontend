import React from 'react';
import { Outlet } from 'react-router-dom';
import SearchForm from './../SearchForm/SearchForm';
import Preloader from './../Preloader/Preloader';

export default function MoviesLayout() {
  return (
    <>
      <SearchForm />
      <Preloader />
      <Outlet />
    </>
  );
}
