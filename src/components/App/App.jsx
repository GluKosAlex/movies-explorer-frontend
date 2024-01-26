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
import { MoviesContext } from '../../contexts/MoviesContext.js';

import mainApi from './../../utils/MainApi';
import ProtectedRoute from './../ProtectedRoute/ProtectedRoute';

function App() {
  const navigate = useNavigate();

  // const loggedInFromStorage = JSON.parse(localStorage.getItem('loggedIn'));
  // const [loggedIn, setLoggedIn] = useState(JSON.parse(loggedInFromStorage));
  const [loggedIn, setLoggedIn] = useState(false);
  const [moviesList, setMoviesList] = useState([]); // All movies fetched from server
  const [savedMoviesList, setSavedMoviesList] = useState([]); // Saved movies

  const [currentUser, setCurrentUser] = useState({
    name: '...',
    email: '...',
  });

  function authToken(token) {
    const path = location.pathname;
    mainApi
      .tokenCheck(token)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            return Promise.reject(`Ошибка: ${res.status} ${err.message}`);
          });
        } else {
          setLoggedIn(true);
          localStorage.setItem('loggedIn', 'true');
        }
      })
      .catch((err) => {
        console.error(err);
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
      Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
        .then(([userData, savedMovies]) => {
          setCurrentUser(userData);
          setSavedMoviesList(savedMovies);
        })
        .catch((err) => console.error(err));
    }
  }, [loggedIn]);

  function handleLogin({ email, password }) {
    return mainApi.authorize({ email, password }).then((res) => {
      if (!res.ok) {
        return Promise.reject(res);
      } else {
        return res.json().then((res) => {
          setLoggedIn(true);
          localStorage.setItem('token', res.token);
          localStorage.setItem('loggedIn', 'true');
          navigate('/movies');
        });
      }
    });
  }

  function handleRegister({ name, email, password }) {
    return mainApi.register({ name, email, password }).then((res) => {
      if (!res.ok) {
        return Promise.reject(res);
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
    localStorage.clear();
    localStorage.setItem('loggedIn', 'false');
    navigate('/signin', { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser, loggedIn, setLoggedIn }}>
      <MoviesContext.Provider value={{ moviesList, setMoviesList, savedMoviesList, setSavedMoviesList }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />

            <Route
              path="movies"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Movies />
                </ProtectedRoute>
              }
            />

            <Route
              path="saved-movies"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <SavedMovies />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="profile"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Profile onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />

          <Route path="signin" element={<Login onLogin={handleLogin} />} />

          <Route path="signup" element={<Register onRegister={handleRegister} />} />
        </Routes>
      </MoviesContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
