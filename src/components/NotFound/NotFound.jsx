import React from 'react';
import { useNavigate } from 'react-router-dom';

import './NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <main className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <button
        className="not-found__back"
        onClick={() => {
          navigate(-1);
        }}
      >
        назад
      </button>
    </main>
  );
}
