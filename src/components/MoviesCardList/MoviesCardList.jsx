import MoviesCard from './../MoviesCard/MoviesCard';

import './MoviesCardList.css';

export default function MoviesCardList({ moviesToShow }) {
  return (
    <ul className="movie-card-list">
      {moviesToShow.map((item) => {
        return <MoviesCard key={item.movieId} movie={item} />;
      })}
    </ul>
  );
}
