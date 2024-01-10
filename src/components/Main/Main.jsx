import Promo from './../Promo/Promo';
import AboutProject from './../AboutProject/AboutProject';
import Techs from './../Techs/Techs';
import AboutMe from './../AboutMe/AboutMe';

import './Main.css';

export default function Main() {
  return (
    <main className="page__content main">
      <Promo className="main__section" />
      <AboutProject className="main__section" />
      <Techs className="main__section" />
      <AboutMe className="main__section" />
    </main>
  );
}
