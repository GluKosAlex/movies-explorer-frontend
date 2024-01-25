import MoviesCard from './../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ moviesToRender }) {
  return (
    <ul className="movie-card-list">
      {moviesToRender.map((item) => {
        return <MoviesCard key={item.movieId} movie={item} />;
      })}
    </ul>
  );
}
