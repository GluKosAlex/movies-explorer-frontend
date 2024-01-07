import React from 'react';

import logo from './../../images/logo.svg';
import FormAuth from '../AuthForm/AuthForm';
import AuthInput from './../AuthInput/AuthInput';
import { user } from './../../constants/db_mock';

export default function Register() {
  return (
    <main className="register">
      <img src={logo} alt="Логотип сайта Movie Explorer" />
      <h1>Добро пожаловать!</h1>

      <FormAuth submitBtnText={'Зарегистрироваться'} onSubmitHandler={() => {}}>
        <AuthInput name={'name'} labelText="Имя" value={user.name} />
        <AuthInput name={'email'} labelText="E-mail" value={user.email} />
        <AuthInput name={'password'} labelText="Пароль" />
      </FormAuth>
    </main>
  );
}
