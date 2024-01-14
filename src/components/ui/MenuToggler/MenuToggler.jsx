import './MenuToggler.css';

export default function MenuToggler({ menuClassName, className: classList }) {
  const toggleHandler = (e) => {
    e.currentTarget.classList.toggle('menu-toggler_closed');
    document.querySelector(`.${menuClassName}`).classList.toggle(`${menuClassName}_closed`);
  };

  return (
    <button className={`menu-toggler menu-toggler_closed ${classList}`} onClick={toggleHandler}>
      <span>Открыть меню</span>
    </button>
  );
}
