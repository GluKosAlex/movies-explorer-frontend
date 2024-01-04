import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Главная</NavLink>
          </li>
          <li>
            <NavLink to="movies">Фильмы</NavLink>
          </li>
          <li>
            <NavLink to="saved-movies">Сохранённые фильмы</NavLink>
          </li>
          <li>
            <Link to="profile">Аккаунт</Link>
          </li>
          <li>
            <Link to="signin">Войти</Link>
          </li>
          <li>
            <Link to="signup">Регистрация</Link>
          </li>
        </ul>
      </nav>
      <button
        className="menu__toggle menu__toggle_closed"
        onClick={(e) => {
          e.target.classList.toggle('menu__toggle_closed');
          e.target.parentNode.classList.toggle('header__menu_closed');
        }}
      >
        <span>Открыть меню</span>
      </button>
    </>
  );
}
