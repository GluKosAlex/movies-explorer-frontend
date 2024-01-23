import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import './App.css';
import Main from '../Main/Main';
import Layout from '../Layout/Layout';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';

import { CurrentUserContext } from './../../contexts/CurrentUserContext.js';

// import { user } from './../../constants/db_mock';
import mainApi from './../../utils/MainApi';

function App() {
  const navigate = useNavigate();

  // const loggedInFromStorage = JSON.parse(localStorage.getItem('loggedIn'));
  // const [loggedIn, setLoggedIn] = useState(JSON.parse(loggedInFromStorage));
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedMoviesList, setSavedMoviesList] = useState([]);

  const [currentUser, setCurrentUser] = useState({
    name: '...',
    email: '...',
  });

  function authToken(token) {
    const path = location.pathname;
    mainApi
      .getUserInfo(token)
      .then((res) => {
        if (!res.ok) {
          console.log('🚀 ~ .then ~ res:', res);
          return res.json().then((err) => {
            return Promise.reject(`Ошибка: ${res.status} ${err.message}`);
          });
        } else {
          setLoggedIn(true);
          localStorage.setItem('loggedIn', 'true');
        }
      })
      .catch((err) => {
        console.error('ВОТ ЭТА!!', err);
        navigate(path, { replace: true });
      });
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authToken(token);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem('token');
      mainApi.setAuthorizationHeader(token);
      Promise.all([mainApi.getUserInfo(token), mainApi.getMovies()])
        .then(([userData, savedMovies]) => {
          console.log('🚀 ~ .then ~ savedMovies:', savedMovies);
          console.log('🚀 ~ .then ~ userData:', userData);
          setCurrentUser(userData);
          setSavedMoviesList(savedMovies);
        })
        .catch((err) => console.error(err));
    }
  }, [loggedIn]);

  function handleLogin({ email, password }) {
    return mainApi.authorize({ email, password }).then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          return Promise.reject(`Ошибка: ${res.status} ${err.message}`);
        });
      } else {
        return res.json().then((res) => {
          setLoggedIn(true);
          localStorage.setItem('token', res.token);
          navigate('/movies');
        });
      }
    });
  }

  function handleRegister({ name, email, password }) {
    return mainApi.register({ name, email, password }).then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          return Promise.reject(`Ошибка: ${res.status} ${err.message}`);
        });
      } else {
        return res.json().then((res) => {
          if (res._id) {
            handleLogin({ email, password });
          }
        });
      }
    });
  }

  function handleLogout() {
    setLoggedIn(false);
    setCurrentUser({});
    localStorage.setItem('loggedIn', 'false');
    localStorage.removeItem('token');
    navigate('/signin', { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser, loggedIn, setLoggedIn }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />

          <Route path="movies" savedMoviesList={savedMoviesList} element={<Movies />} />

          <Route path="saved-movies" savedMoviesList={savedMoviesList} element={<SavedMovies />} />
        </Route>

        <Route path="profile" element={<Profile onLogout={handleLogout} />} />

        <Route path="*" element={<NotFound />} />

        <Route path="signin" element={<Login onLogin={handleLogin} />} />

        <Route path="signup" element={<Register onRegister={handleRegister} />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
