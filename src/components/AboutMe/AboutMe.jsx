import React from 'react';
import avatar from './../../images/avatar.jpg';

import Portfolio from './../Portfolio/Portfolio';

export default function AboutMe() {
  return (
    <section>
      <h2>Студент</h2>

      <section>
        <img src={avatar} alt="Портретная фотография автора" />
        <h3>Константин</h3>
        <p>Фронтенд-разработчик, 38 лет</p>
        <p>
          Я живу в Новосибирске. Закончил факультет Информатики и Вычислительной Техники в СФУ. С 2004 года
          работал графическим дизайнером в крупных производственных компаниях. А с 2018 года открыл своё ИП и
          помогаю бизнесу со всего мира эффективно продавать свои продукты, выполняя услуги по вэб-разработке
          и дизайну. Люблю всё что связано с ИТ, цифровой графикой и искусством, а в качестве хобби строю дом
          и делаю мебель своими руками.
        </p>
        <a href="https://github.com/GluKosAlex" target="_blank" rel="noopener noreferrer">
          Github
        </a>
      </section>

      <Portfolio />
    </section>
  );
}
