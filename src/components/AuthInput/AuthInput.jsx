import React from 'react';
import MyInput from './../ui/MyInput/MyInput';

import './AuthInput.css';

const allowedInputTypes = ['email', 'password'];

export default function AuthInput({ name, labelText, ...props }) {
  return (
    <div className="auth-input">
      <label className="auth-input__input-label" htmlFor={name}>
        {labelText}
      </label>

      <MyInput
        type={allowedInputTypes.includes(name) ? name : 'text'}
        className="auth-input__input-field"
        id={name}
        {...props}
      />

      <span className={`auth-input__input-error ${name}-error`}></span>
    </div>
  );
}
