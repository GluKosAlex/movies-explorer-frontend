import NavTab from './../NavTab/NavTab';
import './Promo.css';

export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__wrap">
        <h1 className="promo__header">Учебный проект студента факультета Веб-разработки.</h1>
        <NavTab className="promo__nav-tab" />
      </div>
    </section>
  );
}
