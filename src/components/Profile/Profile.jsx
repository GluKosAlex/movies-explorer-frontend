import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { CurrentUserContext } from './../../contexts/CurrentUserContext';
import { IsLoadingContext } from './../../contexts/IsLoadingContext';

import Header from './../Header/Header';
import MyButton from './../ui/MyButton/MyButton';

import './Profile.css';
import { validationOptions } from './../../constants/validationOptions.js';
import { apiErrorMessages } from './../../constants/constants.js';

const { nameValidOptions, emailValidOptions } = validationOptions;

export default function Profile({ onLogout, onEditUserInfo, isApiError, setIsApiError }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { isLoading, setIsLoading } = useContext(IsLoadingContext);

  const methods = useForm({ values: { name: currentUser.name, email: currentUser.email }, mode: 'onChange' });
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isDirty },
  } = methods;

  const [editUserInfo, setEditUserInfo] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(apiErrorMessages.userEditError);

  useEffect(() => {
    if (editUserInfo) {
      const formInputs = document.querySelectorAll('input');
      formInputs[0].focus();
    }
  }, [editUserInfo, isApiError]);

  const getErrorMessage = (err) => {
    if (err.message === 'Validation failed') {
      return `Не корректно введено значение ${err.validation.body.keys.join(', ')}`;
    } else if (err.message) {
      return err.message;
    } else {
      return apiErrorMessages.userEditError;
    }
  };

  const editUserInfoHandler = (e) => {
    e.preventDefault();
    setIsApiError(false);
    setEditUserInfo(true);
  };

  const formSubmitHandler = (data) => {
    onEditUserInfo(data)
      .then(() => {
        setEditUserInfo(false);
      })
      .catch((err) => {
        setIsApiError(true);
        const message = getErrorMessage(err);
        setApiErrorMessage(message);
      })
      .finally(() => {
        setIsApiError(true);
        setIsLoading(false);
      });
  };

  const logoutClickHandler = (e) => {
    e.preventDefault();
    onLogout();
  };

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
                disabled={!editUserInfo || isLoading}
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
                disabled={!editUserInfo || isLoading}
              />
              <span className={`profile__input-error`}>{errors?.['email']?.message}</span>
            </li>
          </ul>
          <p className={`profile__api-error ${!editUserInfo && 'profile__hidden-block'}`}>
            {isApiError && apiErrorMessage}
          </p>
          <MyButton
            className={`profile__form-submit ${!editUserInfo && 'profile__hidden-block'} ${
              isLoading && 'button_loading'
            }`}
            disabled={!isValid || !isDirty || isLoading}
          >
            {isLoading ? 'Сохранение...' : 'Сохранить'}
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
