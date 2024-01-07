import React from 'react';
import { Link } from 'react-router-dom';

import logo from './../../images/logo.svg';
import FormAuth from '../AuthForm/AuthForm';
import AuthInput from './../AuthInput/AuthInput';
import { user } from './../../constants/db_mock';

import './Login.css';

export default function Login() {
  return (
    <>
      <main className="login">
        <a className="login__logo-link" href="/">
          <img
            className="login__logo-img"
            src={logo}
            alt="Логотип сайта Movie Explorer. Перейти на главную страницу"
          />
        </a>
        <h1 className="login__title">Рады видеть!</h1>

        <FormAuth className="login__form" submitBtnText={'Войти'} onSubmitHandler={() => {}}>
          <AuthInput name={'email'} labelText="E-mail" value={user.email} />
          <AuthInput name={'password'} labelText="Пароль" />
        </FormAuth>

        <p className="login__footnote">
          Ещё не зарегистрированы?
          <Link className="login__footnote-link" to="/signup">
            Регистрация
          </Link>
        </p>
      </main>
    </>
  );
}
