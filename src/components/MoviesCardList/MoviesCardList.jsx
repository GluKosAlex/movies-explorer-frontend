import MoviesCard from './../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ moviesToRender }) {
  return (
    <ul className="movie-card-list">
      {moviesToRender.map((item) => (
        <MoviesCard
          key={item.movieId}
          movieId={item.movieId}
          name={item.nameRU}
          image={item.image}
          duration={item.duration}
          isSaved={item.saved}
          className="movie-card-list__item"
        />
      ))}
    </ul>
  );
}
