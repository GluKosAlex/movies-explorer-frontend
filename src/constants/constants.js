const emailExpression =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const userNameExpression = /^[^\s]+[0-9A-Za-z\s]*[^\s]+$/g;

const inputPlaceholders = {
  userNamePlaceholder: 'Введите имя пользователя',
  emailPlaceholder: 'some@mail.com',
  passwordPlaceholder: 'Введите пароль',
};

const apiErrorMessages = {
  defaultError: 'Что-то пошло не так...',
  authError: 'Вы ввели неправильный логин или пароль.',
  authTokenFormatError: 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.',
  authTokenError: 'При авторизации произошла ошибка. Переданный токен некорректен.',
  emailExistError: 'Пользователь с таким email уже существует.',
  userRegisterError: 'При регистрации пользователя произошла ошибка.',
  userEditError: 'При обновлении профиля произошла ошибка.',
  serverError: '500 На сервере произошла ошибка.',
  notFoundError: '404 Страница по указанному маршруту не найдена.',
};

const movieSearchErrorMessages = {
  notFoundError: 'Ничего не найдено',
  serverError:
    'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
};

const movieApiURL = 'https://api.nomoreparties.co';
const mainApiURL = 'http://localhost:3000';

export {
  emailExpression,
  userNameExpression,
  inputPlaceholders,
  apiErrorMessages,
  movieSearchErrorMessages,
  movieApiURL,
  mainApiURL,
};
