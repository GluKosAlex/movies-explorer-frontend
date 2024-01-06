import React from 'react';

import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <ul className="footer__links-list">
        <li className="footer__links-list-item">
          <a
            className="footer__link"
            href="https://practicum.yandex.ru"
            target="_blank"
            rel="noopener noreferrer"
          >
            Яндекс.Практикум
          </a>
        </li>
        <li className="footer__links-list-item">
          <a
            className="footer__link"
            href="https://github.com/GluKosAlex"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </li>
      </ul>
      <p className="footer__copy">©{new Date().getFullYear()}</p>
    </footer>
  );
}
