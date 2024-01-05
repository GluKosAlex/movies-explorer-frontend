import React from 'react';

export default function Portfolio() {
  return (
    <section>
      <h4>Портфолио</h4>
      <ul>
        <li>
          <a href="https://github.com/GluKosAlex/how-to-learn" target="_blank" rel="noopener noreferrer">
            Статичный сайт
          </a>
        </li>
        <li>
          <a href="https://github.com/GluKosAlex/russian-travel" target="_blank" rel="noopener noreferrer">
            Адаптивный сайт
          </a>
        </li>
        <li>
          <a
            href="https://github.com/GluKosAlex/react-mesto-api-full-gha"
            target="_blank"
            rel="noopener noreferrer"
          >
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
}
