import { Link, useNavigate } from 'react-router-dom';

import logo from './../../images/logo.svg';
import FormAuth from '../AuthForm/AuthForm';
import AuthInput from './../AuthInput/AuthInput';

import './Register.css';
import { validationOptions } from './../../constants/validationOptions';
import { inputPlaceholders } from './../../constants/constants';

const { nameValidOptions, emailValidOptions, passwordValidOptions } = validationOptions;
const { userNamePlaceholder, emailPlaceholder, passwordPlaceholder } = inputPlaceholders;

export default function Register({ onRegister, errorMessage, setErrorMessage }) {
  const navigate = useNavigate();

  const onSubmit = (data) => {
    onRegister(data)
      .then(() => {
        navigate('/movies');
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(err);
      });
  };

  return (
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
          submitBtnText={'Зарегистрироваться'}
          onSubmit={onSubmit}
          errorMessage={errorMessage}
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
