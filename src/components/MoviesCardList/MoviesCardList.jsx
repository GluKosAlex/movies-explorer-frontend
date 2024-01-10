import MoviesCard from './../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ moviesList }) {
  return (
    <ul className="movie-card-list">
      {moviesList.map((item) => (
        <MoviesCard
          key={item.movieId}
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
