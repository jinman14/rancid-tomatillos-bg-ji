import './MoviesContainer.css';
import MoviePoster from '../MoviePoster/MoviePoster';

function Movies({posters, castVote, upvoteIcon, downvoteIcon, playHoverSound}) {
  const posterData = posters.map(poster => {
    return (
      <MoviePoster
        id={poster.id}
        key={poster.id}
        image={poster.poster_path}
        title={poster.title}
        vote_count={poster.vote_count}
        castVote={castVote}
        upvoteIcon={upvoteIcon}
        downvoteIcon={downvoteIcon}
        playHoverSound={playHoverSound}
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