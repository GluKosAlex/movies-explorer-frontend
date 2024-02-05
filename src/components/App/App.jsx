import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import useEscapeKey from './../../hooks/useEscapeKey';
import useOutsideClick from './../../hooks/useOverlayClick';

import './App.css';

import Main from '../Main/Main';
import Layout from '../Layout/Layout';
import Movies from './../Movies/Movies';
import SavedMovies from './../SavedMovies/SavedMovies';
import Profile from './../Profile/Profile';
import Login from './../Login/Login';
import Register from './../Register/Register';
import NotFound from './../NotFound/NotFound';
import InfoTooltip from './../InfoTooltip/InfoTooltip';
import ProtectedRoute from './../ProtectedRoute/ProtectedRoute';

import { CurrentUserContext } from './../../contexts/CurrentUserContext.js';
import { IsLoadingContext } from './../../contexts/IsLoadingContext.js';
import { MoviesContext } from '../../contexts/MoviesContext.js';
import { InfoTooltipContext } from './../../contexts/InfoTooltipContext.js';

import mainApi from './../../utils/MainApi';
import movieApi from './../../utils/MoviesApi';
import moviesDataAdapter from './../../utils/moviesDataAdapter';
import { apiErrorMessages } from './../../constants/constants.js';

function App() {
  const navigate = useNavigate();

  const loggedInFromStorage = JSON.parse(localStorage.getItem('loggedIn'));

  const [isApiError, setIsApiError] = useState(false); // Indicate if there is api error
  const [loggedIn, setLoggedIn] = useState(JSON.parse(loggedInFromStorage));
  const [moviesList, setMoviesList] = useState([]); // All movies fetched from server
  const [savedMoviesList, setSavedMoviesList] = useState([]); // Saved movies
  const [isLoading, setIsLoading] = useState(false);

  const [infoTooltipContent, setInfoTooltipContent] = useState({
    isFail: true,
    text: apiErrorMessages.defaultError,
  });
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

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
        setIsInfoTooltipOpen(true);
        setInfoTooltipContent({ isFail: true, text: err });
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
        .catch((err) => {
          setIsInfoTooltipOpen(true);
          setInfoTooltipContent({ isFail: true, text: err });
          console.error(err);
        });
    }
  }, [loggedIn]);

  function fetchAllMovies() {
    setIsLoading(true);

    return movieApi.getMovies().then((movies) => {
      const adaptedMovies = movies.map((movie) => moviesDataAdapter(movie)); // Convert movies data for frontend and main api
      setMoviesList(adaptedMovies);
      setIsApiError(false);
      return adaptedMovies;
    });
  }

  function editUserInfo(data) {
    setIsLoading(true);

    return mainApi.setUserInfo(data).then(({ name, email }) => {
      setCurrentUser({ name, email });
      setIsApiError(false);
    });
  }

  function handleLogin({ email, password }) {
    setIsLoading(true);

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
    setIsLoading(true);

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

  function saveMovie(movie) {
    return mainApi.createMovie(movie).then((movieData) => {
      setSavedMoviesList([...savedMoviesList, movieData]);
    });
  }

  function deleteMovie(movieId) {
    const savedMovie = savedMoviesList.find((item) => item.movieId === movieId);
    return mainApi.deleteMovie(savedMovie._id).then((res) => {
      setSavedMoviesList(savedMoviesList.filter((movie) => movie._id !== savedMovie._id));
      return res;
    });
  }

  function handleLogout() {
    setLoggedIn(false);
    setCurrentUser({});
    localStorage.clear();
    localStorage.setItem('loggedIn', 'false');
    navigate('/', { replace: true });
  }

  function closeModal() {
    setIsInfoTooltipOpen(false);
  }

  useEscapeKey(closeModal);
  useOutsideClick(closeModal, 'modal');

  return (
    <>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser, loggedIn, setLoggedIn }}>
        <IsLoadingContext.Provider value={{ isLoading, setIsLoading }}>
          <InfoTooltipContext.Provider
            value={{ infoTooltipContent, setInfoTooltipContent, isInfoTooltipOpen, setIsInfoTooltipOpen }}
          >
            <MoviesContext.Provider
              value={{
                moviesList,
                setMoviesList,
                savedMoviesList,
                setSavedMoviesList,
                saveMovie,
                deleteMovie,
              }}
            >
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Main />} />

                  <Route
                    path="movies"
                    element={
                      <ProtectedRoute loggedIn={loggedIn}>
                        <Movies
                          fetchAllMovies={fetchAllMovies}
                          isApiError={isApiError}
                          setIsApiError={setIsApiError}
                        />
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
                      <Profile
                        onLogout={handleLogout}
                        onEditUserInfo={editUserInfo}
                        isApiError={isApiError}
                        setIsApiError={setIsApiError}
                      />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<NotFound />} />

                <Route path="signin" element={<Login onLogin={handleLogin} loggedIn={loggedIn} />} />

                <Route path="signup" element={<Register onRegister={handleRegister} loggedIn={loggedIn} />} />
              </Routes>
            </MoviesContext.Provider>
          </InfoTooltipContext.Provider>
        </IsLoadingContext.Provider>
      </CurrentUserContext.Provider>

      <InfoTooltip
        title={infoTooltipContent.text}
        isFail={infoTooltipContent.isFail}
        isOpen={isInfoTooltipOpen}
        onClose={closeModal}
      />
    </>
  );
}

export default App;
