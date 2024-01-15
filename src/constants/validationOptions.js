import { emailExpression } from './constants.js';

const validationOptions = {
  nameValidOptions: {
    required: 'Поле с именем пользователя является обязательным',
    maxLength: {
      value: 30,
      message: 'Максимальная длина строки 30 символов',
    },
    minLength: {
      value: 2,
      message: 'Минимальная длина строки 2 символа',
    },
  },
  emailValidOptions: {
    pattern: {
      value: emailExpression,
      message: 'Не валидный адрес электронной почты!',
    },
  },
  passwordValidOptions: {
    required: 'Поле с паролем является обязательным',
    minLength: {
      value: 3,
      message: 'Минимальная длина пароля 3 символов',
    },
  },
};

export { validationOptions };
