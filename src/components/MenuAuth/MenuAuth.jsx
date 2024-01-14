import { Link, NavLink } from 'react-router-dom';

import useEscapeKey from './../../hooks/useEscapeKey';
import useOutsideClick from './../../hooks/useOverlayClick';

import MenuToggler from './../ui/MenuToggler/MenuToggler';
import './MenuAuth.css';

export default function MenuAuth() {
  const menuClassName = 'menu-auth';

  const closeMenu = () => {
    document.querySelector(`.${menuClassName}`).classList.add(`${menuClassName}_closed`);
    document.querySelector(`.${menuClassName}__toggle`).classList.add('menu-toggler_closed');
  };

  useEscapeKey(closeMenu);
  useOutsideClick(closeMenu, menuClassName);

  return (
    <>
      <nav className={`${menuClassName} ${menuClassName}_closed`}>
        <ul className={`${menuClassName}__list`}>
          <div className={`${menuClassName}_links-group`}>
            <li className={`${menuClassName}__item ${menuClassName}__item_type_home`}>
              <NavLink onClick={closeMenu} className={`${menuClassName}__link`} to="/">
                Главная
              </NavLink>
            </li>

            <li className={`${menuClassName}__item`}>
              <NavLink onClick={closeMenu} className={`${menuClassName}__link`} to="/movies">
                Фильмы
              </NavLink>
            </li>

            <li className={`${menuClassName}__item`}>
              <NavLink onClick={closeMenu} className={`${menuClassName}__link`} to="/saved-movies">
                Сохранённые фильмы
              </NavLink>
            </li>
          </div>

          <li className={`${menuClassName}__item ${menuClassName}__item_type_profile`}>
            <Link
              onClick={closeMenu}
              className={`${menuClassName}__link ${menuClassName}__link_type_profile`}
              to="/profile"
            >
              Аккаунт
            </Link>
          </li>
        </ul>
      </nav>

      <MenuToggler menuClassName={menuClassName} className={`${menuClassName}__toggle`} />
    </>
  );
}
