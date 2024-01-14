import { useContext, useEffect, useState } from 'react';

import Header from '../Header/Header';
import './Profile.css';
import MyButton from '../ui/MyButton/MyButton';
import { CurrentUserContext } from './../../contexts/CurrentUserContext';

export default function Profile() {
  const { currentUser, setCurrentUser, setLoggedIn } = useContext(CurrentUserContext);

  const [editUserInfo, setEditUserInfo] = useState(false);

  const editUserInfoHandler = (e) => {
    e.preventDefault();
    setEditUserInfo(true);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setEditUserInfo(false);
  };

  const logoutClickHandler = (e) => {
    e.preventDefault();
    setLoggedIn(false);
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
        <form className="profile__form" onSubmit={formSubmitHandler}>
          <ul className="profile__input-list">
            <li className="profile__input-list-item">
              <label className="profile__input-label" htmlFor="userName">
                Имя
              </label>
              <input
                className="profile__input"
                id="userName"
                type="text"
                value={currentUser.name}
                onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                disabled={!editUserInfo}
              />
            </li>
            <li className="profile__input-list-item">
              <label className="profile__input-label" htmlFor="userEmail">
                E-mail
              </label>
              <input
                className="profile__input"
                id="userEmail"
                type="email"
                value={currentUser.email}
                onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                disabled={!editUserInfo}
              />
            </li>
          </ul>
          <MyButton className="profile__form-submit" hidden={!editUserInfo}>
            Сохранить
          </MyButton>
        </form>
        <div className="profile__control">
          <button className="profile__btn" onClick={editUserInfoHandler} hidden={editUserInfo}>
            Редактировать
          </button>
          <button
            className="profile__btn profile__btn_logout"
            onClick={logoutClickHandler}
            hidden={editUserInfo}
          >
            Выйти из аккаунта
          </button>
        </div>
      </main>
    </>
  );
}
