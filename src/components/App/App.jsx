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
import MoviesLayout from '../MoviesLayout/MoviesLayout';
import NotFound from '../NotFound/NotFound';
import { CurrentUserContext } from './../../contexts/CurrentUserContext.js';

import { user } from '../../constants/db_mock';

function App() {
  const loggedInFromStorage = JSON.parse(localStorage.getItem('loggedIn'));
  const [loggedIn, setLoggedIn] = useState(JSON.parse(loggedInFromStorage));

  const [currentUser, setCurrentUser] = useState({
    name: '...',
    email: '...',
  });

  useEffect(() => {
    setCurrentUser(user); // mockup user data
    localStorage.setItem('loggedIn', 'true');
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser, loggedIn, setLoggedIn }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />

          <Route path="/" element={<MoviesLayout />}>
            <Route path="movies" index element={<Movies />} />

            <Route path="saved-movies" element={<SavedMovies />} />
          </Route>
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
