import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { CurrentUserContext } from './../../contexts/CurrentUserContext';

import Header from '../Header/Header';
import MyButton from '../ui/MyButton/MyButton';

import './Profile.css';
import { validationOptions } from './../../constants/validationOptions';

const { nameValidOptions, emailValidOptions } = validationOptions;

export default function Profile({ onLogout }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  console.log(currentUser);

  const methods = useForm({ values: { name: currentUser.name, email: currentUser.email }, mode: 'onChange' });
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = methods;

  const [editUserInfo, setEditUserInfo] = useState(false);

  const editUserInfoHandler = (e) => {
    e.preventDefault();
    setEditUserInfo(true);
  };

  const formSubmitHandler = (data) => {
    setCurrentUser(data);
    setEditUserInfo(false);
  };

  const logoutClickHandler = (e) => {
    e.preventDefault();
    onLogout();
  };

  useEffect(() => {
    if (editUserInfo) {
      const userNameInput = document.querySelector('#userName');
      userNameInput.focus();
    }
  }, [editUserInfo]);

  return (
    <>
      <Header />
      <main className="page__content profile main">
        <h1 className="profile__header">Привет, {currentUser.name}!</h1>
        <form className="profile__form" onSubmit={handleSubmit(formSubmitHandler)} noValidate={true}>
          <ul className="profile__input-list">
            <li className="profile__input-list-item">
              <label className="profile__input-label" htmlFor="userName">
                Имя
              </label>
              <input
                {...register('name', nameValidOptions)}
                className={`profile__input ${errors['name'] && 'profile__input_error'}`}
                id="userName"
                type="text"
                disabled={!editUserInfo}
              />
              <span className={`profile__input-error`}>{errors?.['name']?.message}</span>
            </li>
            <li className="profile__input-list-item">
              <label className="profile__input-label" htmlFor="userEmail">
                E-mail
              </label>
              <input
                {...register('email', emailValidOptions)}
                className={`profile__input ${errors['email'] && 'profile__input_error'}`}
                id="userEmail"
                type="email"
                disabled={!editUserInfo}
              />
              <span className={`profile__input-error`}>{errors?.['email']?.message}</span>
            </li>
          </ul>
          <p className={`profile__api-error ${!editUserInfo && 'profile__hidden-block'}`}>
            {'При обновлении профиля произошла ошибка.'}
          </p>
          <MyButton
            className={`profile__form-submit ${!editUserInfo && 'profile__hidden-block'}`}
            disabled={!isValid}
          >
            Сохранить
          </MyButton>
        </form>
        <div className={`profile__control ${editUserInfo && 'profile__hidden-block'}`}>
          <button className="profile__btn" onClick={editUserInfoHandler}>
            Редактировать
          </button>
          <button className="profile__btn profile__btn_logout" onClick={logoutClickHandler}>
            Выйти из аккаунта
          </button>
        </div>
      </main>
    </>
  );
}
