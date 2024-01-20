import MyInput from './../ui/MyInput/MyInput';

import './AuthInput.css';

const allowedInputTypes = ['email', 'password'];

export default function AuthInput({ register, name, labelText, error, ...props }) {
  return (
    <div className="auth-input">
      <label className="auth-input__input-label" htmlFor={name}>
        {labelText}
      </label>

      <MyInput
        register={register}
        name={name}
        type={allowedInputTypes.includes(name) ? name : 'text'}
        className={`auth-input__input-field ${error && 'auth-input__input-field_error'}`}
        id={name}
        {...props}
      />

      <span className={`auth-input__input-error ${name}-error`}>{error?.message}</span>
    </div>
  );
}
