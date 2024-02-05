import React from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox({
  register,
  name,
  className: classList = '',
  onCheckboxChange,
  ...props
}) {
  return (
    <div className={`${classList} show-shorts`}>
      <input
        {...register(name, { onChange: onCheckboxChange })}
        type="checkbox"
        id="show-shorts"
        className="show-shorts__checkbox"
        {...props}
      />
      <label htmlFor="show-shorts" className="show-shorts__label">
        Короткометражки
      </label>
    </div>
  );
}
