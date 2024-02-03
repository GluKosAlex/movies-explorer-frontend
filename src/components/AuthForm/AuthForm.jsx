import React from 'react';
import { useState, createElement, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { IsLoadingContext } from './../../contexts/IsLoadingContext';

import './AuthForm.css';
import MyButton from './../ui/MyButton/MyButton';
import { apiErrorMessages } from './../../constants/constants';
const { defaultError, authError, emailExistError, userRegisterError, serverError } = apiErrorMessages;

export default function AuthForm({ submitBtnText, defaultValues, className: classList, onSubmit, children }) {
  const { isLoading, setIsLoading } = useContext(IsLoadingContext);

  const [isApiError, setIsApiError] = useState(false); // Indicate if there is api error
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
        setIsApiError(false);
      })
      .catch((err) => {
        setIsApiError(true);
        getErrorMessage(err).then((message) => setApiErrorMessage(message));
      })
      .finally(() => {
        setIsLoading(false);
      });
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
      {<p className="auth-form__error">{isApiError && apiErrorMessage}</p>}
      <MyButton
        className={`auth-form__btn ${isLoading && 'button_loading'}`}
        disabled={!isValid || isLoading}
      >
        {submitBtnText}
      </MyButton>
    </form>
  );
}
