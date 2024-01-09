import { Link, NavLink } from 'react-router-dom';

import './MenuAuth.css';
import MenuToggler from './../ui/MenuToggler/MenuToggler';

export default function MenuAuth() {
  const linksClickHandler = () => {
    document.querySelector('.menu-auth').classList.add('menu-auth_closed');
  };

  return (
    <>
      <nav className="menu-auth menu-auth_closed">
        <ul className="menu-auth__list">
          <div className="menu-auth_links-group">
            <li className="menu-auth__item menu-auth__item_type_home">
              <NavLink onClick={linksClickHandler} className="menu-auth__link" to="/">
                Главная
              </NavLink>
            </li>

            <li className="menu-auth__item">
              <NavLink onClick={linksClickHandler} className="menu-auth__link" to="/movies">
                Фильмы
              </NavLink>
            </li>

            <li className="menu-auth__item">
              <NavLink onClick={linksClickHandler} className="menu-auth__link" to="/saved-movies">
                Сохранённые фильмы
              </NavLink>
            </li>
          </div>

          <li className="menu-auth__item menu-auth__item_type_profile">
            <Link
              onClick={linksClickHandler}
              className="menu-auth__link menu-auth__link_type_profile"
              to="/profile"
            >
              Аккаунт
            </Link>
          </li>
        </ul>
      </nav>

      <MenuToggler menuClassName="menu-auth" className="menu-auth__toggle" />
    </>
  );
}
