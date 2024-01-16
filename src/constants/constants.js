const emailExpression =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const userNameExpression = /^[^\s]+[0-9A-Za-z\s]*[^\s]+$/g;

const inputPlaceholders = {
  userNamePlaceholder: 'Введите имя пользователя',
  emailPlaceholder: 'some@mail.com',
  passwordPlaceholder: 'Введите пароль',
};

export { emailExpression, userNameExpression, inputPlaceholders };
