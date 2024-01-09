import FilterCheckbox from './../FilterCheckbox/FilterCheckbox';
import MyInput from './../ui/MyInput/MyInput';
import MyButton from './../ui/MyButton/MyButton';
import './SearchForm.css';

export default function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={(e) => e.preventDefault()}>
        <h2 className="search-form__header">Форма поиска фильмов</h2>
        <fieldset className="search-form__fieldset">
          <MyInput className="search-form__input" placeholder="Фильм" />
          <MyButton className="search-form__btn">Найти</MyButton>
        </fieldset>
        <FilterCheckbox />
      </form>
    </section>
  );
}
