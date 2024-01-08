import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './Navigation.css';

export default function Navigation() {
  return (
    <>
      <nav className="navigation">
        <ul className="navigation__list">
          <li className="navigation__item">
            <NavLink className="navigation__link" to="/">
              Главная
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink className="navigation__link" to="/movies">
              Фильмы
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink className="navigation__link" to="/saved-movies">
              Сохранённые фильмы
            </NavLink>
          </li>
          <li className="navigation__item">
            <Link className="navigation__link" to="/profile">
              Аккаунт
            </Link>
          </li>
          <li className="navigation__item">
            <Link className="navigation__link" to="signin">
              Войти
            </Link>
          </li>
          <li className="navigation__item">
            <Link className="navigation__link" to="signup">
              Регистрация
            </Link>
          </li>
        </ul>

        <button
          className="navigation__toggle navigation__toggle_closed"
          onClick={(e) => {
            e.target.classList.toggle('navigation__toggle_closed');
            e.target.parentNode.classList.toggle('header__navigation_closed');
          }}
        >
          <span>Открыть меню</span>
        </button>
      </nav>
    </>
  );
}
