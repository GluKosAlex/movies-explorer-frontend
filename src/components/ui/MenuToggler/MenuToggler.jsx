import './MenuToggler.css';

export default function MenuToggler({ menuClassName, className: classList }) {
  return (
    <button
      className={`menu-toggler menu-toggler_closed ${classList}`}
      onClick={(e) => {
        e.currentTarget.classList.toggle('menu-toggler_closed');
        document.querySelector(`.${menuClassName}`).classList.toggle(`${menuClassName}_closed`);
      }}
    >
      <span>Открыть меню</span>
    </button>
  );
}
