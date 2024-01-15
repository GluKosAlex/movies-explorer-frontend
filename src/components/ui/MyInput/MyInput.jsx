// import { useState } from 'react';

import './MyInput.css';

export default function MyInput({ register, name, registerOptions, className: classList = '', ...props }) {
  return <input {...register(name, registerOptions)} className={`${classList} input`} {...props} />;
}
