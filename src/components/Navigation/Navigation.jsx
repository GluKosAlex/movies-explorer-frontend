import { useContext } from 'react';

import { CurrentUserContext } from './../../contexts/CurrentUserContext';
import MenuAuth from './../MenuAuth/MenuAuth';
import MenuNotAuth from './../MenuNotAuth/MenuNotAuth';

export default function Navigation() {
  const { loggedIn: isLoggedIn } = useContext(CurrentUserContext);
  return isLoggedIn ? <MenuAuth /> : <MenuNotAuth />;
}
