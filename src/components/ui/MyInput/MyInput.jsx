import { useState } from 'react';

import './MyInput.css';

export default function MyInput({ value, className: classList = '', ...props }) {
  const [inputValue, setInputValue] = useState(value);
  const changeHandler = (e) => {
    setInputValue(e.target.value);
  };

  return <input value={inputValue} onChange={changeHandler} className={`${classList} input`} {...props} />;
}
