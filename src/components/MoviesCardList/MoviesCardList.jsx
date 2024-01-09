import MoviesCard from './../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList() {
  return (
    <ul className="movie-card-list">
      <MoviesCard className="movie-card-list__item" />
      <MoviesCard className="movie-card-list__item" />
      <MoviesCard className="movie-card-list__item" />
      <MoviesCard className="movie-card-list__item" />
      <MoviesCard className="movie-card-list__item" />
    </ul>
  );
}
