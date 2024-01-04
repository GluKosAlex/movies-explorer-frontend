import { Routes, Route } from 'react-router-dom';

import './App.css';
import Main from './../Main/Main';
import Layout from './../Layout/Layout';
import Movies from './../Movies/Movies';
import SavedMovies from './../SavedMovies/SavedMovies';
import Profile from './../Profile/Profile';
import Login from './../Login/Login';
import Register from './../Register/Register';
import MoviesLayout from './../MoviesLayout/MoviesLayout';
import NotFound from './../NotFound/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<NotFound />} />
          <Route index element={<Main />} />

          <Route path="/" element={<MoviesLayout />}>
            <Route path="movies" index element={<Movies />} />

            <Route path="saved-movies" element={<SavedMovies />} />
          </Route>
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/signin" element={<Login />} />

        <Route path="/signup" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
