import { Link, NavLink } from 'react-router-dom';

import './MenuAuth.css';
import MenuToggler from './../ui/MenuToggler/MenuToggler';

export default function MenuAuth() {
  return (
    <>
      <nav className="menu-auth menu-auth_closed">
        <ul className="menu-auth__list">
          <li className="menu-auth__item">
            <NavLink className="menu-auth__link" to="/">
              Главная
            </NavLink>
          </li>

          <li className="menu-auth__item">
            <NavLink className="menu-auth__link" to="/movies">
              Фильмы
            </NavLink>
          </li>

          <li className="menu-auth__item">
            <NavLink className="menu-auth__link" to="/saved-movies">
              Сохранённые фильмы
            </NavLink>
          </li>

          <li className="menu-auth__item menu-auth__item_type_profile">
            <Link className="menu-auth__link menu-auth__link_type_profile" to="/profile">
              Аккаунт
            </Link>
          </li>
        </ul>
      </nav>

      <MenuToggler menuClassName="menu-auth" className="menu-auth__toggle" />
    </>
  );
}
