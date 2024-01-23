import { useForm } from 'react-hook-form';

import FilterCheckbox from './../FilterCheckbox/FilterCheckbox';
import MyInput from './../ui/MyInput/MyInput';
import MyButton from './../ui/MyButton/MyButton';
import { validationOptions } from './../../constants/validationOptions';
import './SearchForm.css';

const { movieSearchValidOptions } = validationOptions;

export default function SearchForm({ onSearchFormSubmit, onIsShortChangeHandler, moviesFilter }) {
  const methods = useForm({
    defaultValues: { search: '', isShort: false },
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
          />
          <span className={`search-form__input-error`}>{errors?.['search']?.message}</span>
          <MyButton className="search-form__btn">Найти</MyButton>
        </fieldset>
        <FilterCheckbox name={'isShort'} register={register} onCheckboxChange={onIsShortChangeHandler} />
      </form>
    </section>
  );
}
