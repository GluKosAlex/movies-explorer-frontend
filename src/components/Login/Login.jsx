import { Link } from 'react-router-dom';

import logo from './../../images/logo.svg';
import FormAuth from '../AuthForm/AuthForm';
import AuthInput from './../AuthInput/AuthInput';

import './Login.css';
import { validationOptions } from './../../constants/validationOptions';
import { inputPlaceholders } from './../../constants/constants';

const { emailValidOptions, passwordValidOptions } = validationOptions;
const { emailPlaceholder, passwordPlaceholder } = inputPlaceholders;

export default function Login() {
  const onSubmitHandler = (data) => {
    console.log(data);
  };

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

        <FormAuth className="login__form" submitBtnText={'Войти'} onSubmit={onSubmitHandler}>
          <AuthInput
            name={'email'}
            registerOptions={emailValidOptions}
            labelText="E-mail"
            placeholder={emailPlaceholder}
          />
          <AuthInput
            registerOptions={passwordValidOptions}
            name={'password'}
            labelText="Пароль"
            placeholder={passwordPlaceholder}
          />
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
