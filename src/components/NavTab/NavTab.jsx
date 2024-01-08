import './NavTab.css';

export default function NavTab({ className: classList }) {
  return (
    <nav className={`nav-tab ${classList}`}>
      <ul className="nav-tab__list">
        <li className="nav-tab__list-item">
          <a className="nav-tab__link" href="#">
            О проекте
          </a>
        </li>
        <li className="nav-tab__list-item">
          <a className="nav-tab__link" href="#">
            Технологии
          </a>
        </li>
        <li className="nav-tab__list-item">
          <a className="nav-tab__link" href="#">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}
