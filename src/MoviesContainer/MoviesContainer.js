import './MoviesContainer.css';
import MoviePoster from '../MoviePoster/MoviePoster';

function Movies({posters}) {
  const posterData = posters.map(poster => {
    return (
      <MoviePoster
        id={poster.id}
        key={poster.id}
        image={poster.poster_path}
        title={poster.title}
        vote_count={poster.vote_count}
      />
    )
  })

  return (
      <section className='MoviesContainer'>
        {posterData}
      </section>
  );
}
  
export default Movies;