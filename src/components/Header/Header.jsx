import React from 'react';

import Navigation from './../Navigation/Navigation';
import logo from './../../images/logo.svg';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип сайта Movie Explorer" />
      <Navigation />
    </header>
  );
}
