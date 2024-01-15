import { Link } from 'react-router-dom';

import logo from './../../images/logo.svg';
import FormAuth from '../AuthForm/AuthForm';
import AuthInput from './../AuthInput/AuthInput';

import './Register.css';
import { validationOptions } from './../../constants/validationOptions';

const { nameValidOptions, emailValidOptions, passwordValidOptions } = validationOptions;

export default function Register() {
  const onSubmit = (data) => {
    console.log(data);
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

        <FormAuth className="register__form" submitBtnText={'Зарегистрироваться'} onSubmit={onSubmit}>
          <AuthInput name={'name'} registerOptions={nameValidOptions} labelText="Имя" />
          <AuthInput name={'email'} registerOptions={emailValidOptions} labelText="E-mail" />
          <AuthInput name={'password'} registerOptions={passwordValidOptions} labelText="Пароль" />
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
