import { useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';

import useEscapeKey from './../../hooks/useEscapeKey';
import useOutsideClick from './../../hooks/useOverlayClick';

import MenuToggler from './../ui/MenuToggler/MenuToggler';
import './MenuAuth.css';

export default function MenuAuth() {
  const menuClassName = 'menu-auth';

  const closeMenu = useCallback(() => {
    document.querySelector(`.${menuClassName}`).classList.add(`${menuClassName}_closed`);
    document.querySelector('.menu-toggler').classList.add('menu-toggler_closed');
  }, []);

  useEscapeKey(closeMenu);
  useOutsideClick(closeMenu, menuClassName);

  return (
    <>
      <nav className={`${menuClassName} ${menuClassName}_closed`}>
        <div className={`${menuClassName}__nav-links`}>
          <ul className={`${menuClassName}__links-list`}>
            <li className={`${menuClassName}__nav-item ${menuClassName}__nav-item_type_home`}>
              <NavLink onClick={closeMenu} className={`${menuClassName}__link`} to="/">
                Главная
              </NavLink>
            </li>

            <li className={`${menuClassName}__nav-item`}>
              <NavLink onClick={closeMenu} className={`${menuClassName}__link`} to="/movies">
                Фильмы
              </NavLink>
            </li>

            <li className={`${menuClassName}__nav-item`}>
              <NavLink onClick={closeMenu} className={`${menuClassName}__link`} to="/saved-movies">
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>

          <div className={`${menuClassName}__nav-item ${menuClassName}__nav-item_type_profile`}>
            <Link
              onClick={closeMenu}
              className={`${menuClassName}__link ${menuClassName}__link_type_profile`}
              to="/profile"
            >
              Аккаунт
            </Link>
          </div>
        </div>
      </nav>

      <MenuToggler menuClassName={menuClassName} />
    </>
  );
}
