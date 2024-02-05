import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { IsLoadingContext } from './../../contexts/IsLoadingContext';

import FilterCheckbox from './../FilterCheckbox/FilterCheckbox';
import MyInput from './../ui/MyInput/MyInput';
import MyButton from './../ui/MyButton/MyButton';
import { validationOptions } from './../../constants/validationOptions';
import './SearchForm.css';

const { movieSearchValidOptions } = validationOptions;

export default function SearchForm({ onSearchFormSubmit, onIsShortChangeHandler, moviesFilter }) {
  const { isLoading } = useContext(IsLoadingContext);

  const methods = useForm({
    defaultValues: { search: moviesFilter.query, isShort: moviesFilter.isShort },
    value: { search: moviesFilter.query, isShort: moviesFilter.isShort },
    mode: 'onSubmit',
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit(onSearchFormSubmit)}>
        <h2 className="search-form__header">Форма поиска фильмов</h2>
        <fieldset className="search-form__fieldset">
          <MyInput
            register={register}
            registerOptions={movieSearchValidOptions}
            name="search"
            type="search"
            className="search-form__input"
            placeholder="Фильм"
            disabled={isLoading}
          />
          <span className={`search-form__input-error`}>{errors?.['search']?.message}</span>
          <MyButton className="search-form__btn" disabled={isLoading}>
            Найти
          </MyButton>
        </fieldset>
        <FilterCheckbox
          name={'isShort'}
          register={register}
          onCheckboxChange={onIsShortChangeHandler}
          disabled={isLoading}
        />
      </form>
    </section>
  );
}
