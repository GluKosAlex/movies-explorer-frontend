import { Link } from 'react-router-dom';

import logo from './../../images/logo.svg';
import FormAuth from '../AuthForm/AuthForm';
import AuthInput from './../AuthInput/AuthInput';
import { user } from './../../constants/db_mock';

import './Register.css';

export default function Register() {
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

        <FormAuth className="register__form" submitBtnText={'Зарегистрироваться'} onSubmitHandler={() => {}}>
          <AuthInput name={'name'} labelText="Имя" value={user.name} />
          <AuthInput name={'email'} labelText="E-mail" value={user.email} />
          <AuthInput name={'password'} labelText="Пароль" />
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
