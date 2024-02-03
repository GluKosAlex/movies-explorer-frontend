import { useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { IsLoadingContext } from './../../contexts/IsLoadingContext';

import logo from './../../images/logo.svg';
import FormAuth from '../AuthForm/AuthForm';
import AuthInput from './../AuthInput/AuthInput';

import './Register.css';
import { validationOptions } from './../../constants/validationOptions';
import { inputPlaceholders } from './../../constants/constants';

const { nameValidOptions, emailValidOptions, passwordValidOptions } = validationOptions;
const { userNamePlaceholder, emailPlaceholder, passwordPlaceholder } = inputPlaceholders;

export default function Register({ onRegister, loggedIn }) {
  const { isLoading } = useContext(IsLoadingContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    return onRegister(data).then(() => {
      navigate('/movies');
    });
  };

  return loggedIn ? (
    <Navigate to="/" replace />
  ) : (
    <>
      <main className="register">
        <a className="register__logo-link" href="/">
          <img
            className="register__logo-img"
            src={logo}
            alt="Логотип сайта Movie Explorer. Перейти на главную страницу"
          />
        </a>
        <h1 className="register__title">Добро пожаловать!</h1>

        <FormAuth
          className="register__form"
          submitBtnText={!isLoading ? 'Зарегистрироваться' : 'Регистрация...'}
          onSubmit={onSubmit}
        >
          <AuthInput
            name={'name'}
            registerOptions={{
              ...nameValidOptions,
              onBlur: (e) => {
                e.target.value = e.target.value.trim();
              },
            }}
            labelText="Имя"
            placeholder={userNamePlaceholder}
            autoComplete="name"
          />
          <AuthInput
            name={'email'}
            registerOptions={emailValidOptions}
            labelText="E-mail"
            placeholder={emailPlaceholder}
            autoComplete="email"
          />
          <AuthInput
            name={'password'}
            registerOptions={passwordValidOptions}
            labelText="Пароль"
            placeholder={passwordPlaceholder}
            autoComplete="new-password"
          />
        </FormAuth>

        <p className="register__footnote">
          Уже зарегистрированы?
          <Link className="register__footnote-link" to="/signin">
            Войти
          </Link>
        </p>
      </main>
    </>
  );
}
