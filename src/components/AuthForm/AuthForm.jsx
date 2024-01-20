import React from 'react';
import { useForm } from 'react-hook-form';

import './AuthForm.css';
import MyButton from '../ui/MyButton/MyButton';

export default function AuthForm({ submitBtnText, defaultValues, className: classList, onSubmit, children }) {
  const methods = useForm({ defaultValues, mode: 'all', reValidateMode: 'onChange' });
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = methods;

  return (
    <form
      className={`auth-form ${classList}`}
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
      noValidate={true}
    >
      <ul className="auth-form__input-list">
        {React.Children.map(children, (child) => {
          return child.props.name
            ? React.createElement(
                'li',
                { className: 'auth-form__input-list-item' },
                React.createElement(child.type, {
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
      <MyButton className="auth-form__btn" disabled={!isValid}>
        {submitBtnText}
      </MyButton>
    </form>
  );
}
