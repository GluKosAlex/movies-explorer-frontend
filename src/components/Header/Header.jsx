import React from 'react';
import { Link } from 'react-router-dom';

import Navigation from './../Navigation/Navigation';
import logo from './../../images/logo.svg';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <Link className="header__logo-link" to="/">
        <img className="header__logo-img" src={logo} alt="Логотип сайта Movie Explorer" />
      </Link>
      <Navigation />
    </header>
  );
}
