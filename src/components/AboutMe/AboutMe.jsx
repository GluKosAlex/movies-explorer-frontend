import './AboutMe.css';
import avatar from './../../images/avatar.jpg';
import Portfolio from './../Portfolio/Portfolio';

export default function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>

      <section className="about-me__section">
        <img className="about-me__photo" src={avatar} alt="Фотография автора" />
        <h3 className="about-me__name">Константин</h3>
        <p className="about-me__subscript">Фронтенд-разработчик, 38 лет</p>
        <p className="about-me__text">
          Я живу в Новосибирске. Закончил факультет Информатики и Вычислительной Техники в СФУ. С 2004 года
          работал графическим дизайнером в крупных производственных компаниях. А с 2018 года открыл своё ИП и
          помогаю бизнесу со всего мира эффективно продавать свои продукты, выполняя услуги по вэб-разработке
          и дизайну. Люблю всё что связано с ИТ, цифровой графикой и искусством, а в качестве хобби строю дом
          и делаю мебель своими руками.
        </p>
        <a
          className="about-me__link"
          href="https://github.com/GluKosAlex"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </section>

      <Portfolio className="about-me__section" />
    </section>
  );
}
