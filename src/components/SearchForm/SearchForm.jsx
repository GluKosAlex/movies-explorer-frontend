import { useForm } from 'react-hook-form';
import { useContext } from 'react';

import FilterCheckbox from './../FilterCheckbox/FilterCheckbox';
import MyInput from './../ui/MyInput/MyInput';
import MyButton from './../ui/MyButton/MyButton';
import './SearchForm.css';
import { MoviesFilterContext } from './../../contexts/MoviesFilterContext';

export default function SearchForm() {
  const { moviesFilter, setMoviesFilter } = useContext(MoviesFilterContext);

  const methods = useForm({
    defaultValues: { search: '', isShort: false },
    value: { search: moviesFilter.query, isShort: moviesFilter.isShort },
  });
  const { handleSubmit, register } = methods;

  const searchFormSubmitHandler = (data) => {
    setMoviesFilter({ query: data.search, isShort: data.isShort });
  };

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit(searchFormSubmitHandler)}>
        <h2 className="search-form__header">Форма поиска фильмов</h2>
        <fieldset className="search-form__fieldset">
          <MyInput register={register} name={'search'} className="search-form__input" placeholder="Фильм" />
          <MyButton className="search-form__btn">Найти</MyButton>
        </fieldset>
        <FilterCheckbox name={'isShort'} register={register} />
      </form>
    </section>
  );
}
