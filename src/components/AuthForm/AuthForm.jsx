import React from 'react';
import { useState, createElement } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import './AuthForm.css';
import MyButton from './../ui/MyButton/MyButton';
import { apiErrorMessages } from './../../constants/constants';
const { defaultError, authError, emailExistError, userRegisterError, serverError } = apiErrorMessages;

export default function AuthForm({ submitBtnText, defaultValues, className: classList, onSubmit, children }) {
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(defaultError);

  const location = useLocation();

  const methods = useForm({ defaultValues, mode: 'all', reValidateMode: 'onChange' });
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = methods;

  const getErrorMessage = async (err) => {
    switch (true) {
      case location.pathname === '/signup' && err.status === 400:
        return err.json().then((res) => {
          return `Не корректно введено значение ${res.validation.body.keys.join(', ')}`;
        });

      case (location.pathname === '/signin' && err.status === 400) || err.status === 401:
        return authError;

      case err.status === 409:
        return emailExistError;

      case err.status === 500:
        return serverError;

      default:
        return location.pathname === '/signup' ? userRegisterError : defaultError;
    }
  };

  const submitHandler = (data) => {
    onSubmit(data)
      .then(() => {
        reset();
      })
      .catch((err) => {
        setApiError(true);
        getErrorMessage(err).then((message) => setApiErrorMessage(message));
      })
      .finally(setApiError(false));
  };

  return (
    <form className={`auth-form ${classList}`} onSubmit={handleSubmit(submitHandler)} noValidate={true}>
      <ul className="auth-form__input-list">
        {React.Children.map(children, (child) => {
          return child.props.name
            ? createElement(
                'li',
                { className: 'auth-form__input-list-item' },
                createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    error: errors[child.props.name],
                    key: child.props.name,
                  },
                }),
              )
            : child;
        })}
      </ul>
      {<p className="auth-form__error">{apiError && apiErrorMessage}</p>}
      <MyButton className="auth-form__btn" disabled={!isValid}>
        {submitBtnText}
      </MyButton>
    </form>
  );
}
