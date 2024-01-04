import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Главная</Link>
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
    </>
  );
}
