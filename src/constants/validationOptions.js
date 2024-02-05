import { emailExpression, userNameExpression } from './constants.js';

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
    pattern: {
      value: userNameExpression,
      message:
        'Строка должна состоять только из цифр и букв, а так же не может содержать пробелы в начале и в конце',
    },
  },
  emailValidOptions: {
    required: 'Поле с адресом электронной почты является обязательным',
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
  movieSearchValidOptions: { required: 'Нужно ввести ключевое слово' },
};

export { validationOptions };
