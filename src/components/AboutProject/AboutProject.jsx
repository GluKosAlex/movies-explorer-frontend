import React from 'react';

export default function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <ul className="about-project__description-list">
        <li className="about-project__description-item">
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
            доработки.
          </p>
        </li>

        <li className="about-project__description-item">
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно
            защититься.
          </p>
        </li>
      </ul>
      <dl className="about-project__time-line">
        <dt className="about-project__time">1 неделя</dt>
        <dd className="about-project__time-description">Back-end</dd>

        <dt className="about-project__time">4 недели</dt>
        <dd className="about-project__time-description">Front-end</dd>
      </dl>
    </section>
  );
}
