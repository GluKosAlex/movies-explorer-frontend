import './Techs.css';

export default function Techs({ className: classList }) {
  return (
    <section className="techs">
      <div className={`${classList} techs__wrap`}>
        <h2 className="techs__title">Технологии</h2>
        <h3 className="techs__lead">7 технологий</h3>
        <p className="techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
        <ul className="techs__tags-list">
          <li className="techs__tag">HTML</li>
          <li className="techs__tag">CSS</li>
          <li className="techs__tag">JS</li>
          <li className="techs__tag">React</li>
          <li className="techs__tag">Git</li>
          <li className="techs__tag">Express.js</li>
          <li className="techs__tag">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}
