import { Link } from 'react-router-dom';

import './MenuNotAuth.css';

export default function MenuNotAuth() {
  return (
    <nav className="menu-not-auth">
      <ul className="menu-not-auth__list">
        <li className="menu-not-auth__item">
          <Link className="menu-not-auth__link" to="/signup">
            Регистрация
          </Link>
        </li>

        <li className="menu-not-auth__item">
          <Link className="menu-not-auth__link menu-not-auth__link_type_login" to="/signin">
            Войти
          </Link>
        </li>
      </ul>
    </nav>
  );
}
