import './Portfolio.css';

export default function Portfolio({ className: classList }) {
  return (
    <section className={`portfolio ${classList}`}>
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            href="https://github.com/GluKosAlex/how-to-learn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            href="https://github.com/GluKosAlex/russian-travel"
            target="_blank"
            rel="noopener noreferrer"
          >
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
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
