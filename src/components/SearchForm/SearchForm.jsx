import { useContext, useState } from 'react';

import FilterCheckbox from './../FilterCheckbox/FilterCheckbox';
import MyInput from './../ui/MyInput/MyInput';
import MyButton from './../ui/MyButton/MyButton';
import './SearchForm.css';
import { MoviesFilterContext } from './../../contexts/MoviesFilterContext';

export default function SearchForm() {
  const { moviesFilter, setMoviesFilter } = useContext(MoviesFilterContext);
  const [filterInput, setFilterInput] = useState(moviesFilter);

  const searchFormSubmitHandler = (e) => {
    e.preventDefault();
    setMoviesFilter(filterInput);
  };

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={searchFormSubmitHandler}>
        <h2 className="search-form__header">Форма поиска фильмов</h2>
        <fieldset className="search-form__fieldset">
          <MyInput
            value={filterInput}
            onChange={setFilterInput}
            className="search-form__input"
            placeholder="Фильм"
          />
          <MyButton className="search-form__btn">Найти</MyButton>
        </fieldset>
        <FilterCheckbox />
      </form>
    </section>
  );
}
