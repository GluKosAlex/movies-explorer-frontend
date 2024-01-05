import React from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox({ className: classList = '' }) {
  return (
    <div className={`${classList} show-shorts`}>
      <input type="checkbox" id="show-shorts" name="show-shorts" className="show-shorts__checkbox" />
      <label htmlFor="show-shorts" className="show-shorts__label">
        Короткометражки
      </label>
    </div>
  );
}
