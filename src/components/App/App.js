import { Routes, Route } from 'react-router-dom';

import './App.css';
import Main from './../Main/Main';
import Layout from '../Layout/Layout';
import Movies from './../Movies/Movies';
import SavedMovies from './../SavedMovies/SavedMovies';
import Profile from './../Profile/Profile';
import Login from './../Login/Login';
import Register from '../Register/Register';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />

          <Route path="movies" element={<Movies />} />

          <Route path="saved-movies" element={<SavedMovies />} />

          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/signin" element={<Login />} />

        <Route path="/signup" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
