import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

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

import { user } from './../../constants/db_mock';
import mainApi from './../../utils/MainApi';

function App() {
  const loggedInFromStorage = JSON.parse(localStorage.getItem('loggedIn'));
  const [loggedIn, setLoggedIn] = useState(JSON.parse(loggedInFromStorage));
  const [savedMoviesList, setSavedMoviesList] = useState([]);

  const [currentUser, setCurrentUser] = useState({
    name: '...',
    email: '...',
  });

  useEffect(() => {
    mainApi.setAuthorizationHeader(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg4NGI0YTNiYzVjY2JlMWNjY2Y0MTEiLCJpYXQiOjE3MDU5NDQ5MzAsImV4cCI6MTcwNjU0OTczMH0.iPhZ46_YR_0R2za7Wmi8Y3D0K8i7E0AP9sxiIcUPkeU',
    );
    mainApi
      .getMovies()
      .then((savedMovies) => {
        setSavedMoviesList(savedMovies);
      })
      .catch((err) => console.error('ОШИБКА СЕРВЕРА', err));
  }, []);

  useEffect(() => {
    setCurrentUser(user); // mockup user data
    localStorage.setItem('loggedIn', 'true');
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser, loggedIn, setLoggedIn }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />

          <Route path="movies" savedMoviesList={savedMoviesList} element={<Movies />} />

          <Route path="saved-movies" savedMoviesList={savedMoviesList} element={<SavedMovies />} />
        </Route>

        <Route path="profile" element={<Profile />} />

        <Route path="*" element={<NotFound />} />

        <Route path="signin" element={<Login />} />

        <Route path="signup" element={<Register />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
