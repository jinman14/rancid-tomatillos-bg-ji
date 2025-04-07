import './MoviesContainer.css';
import MoviePoster from '../MoviePoster/MoviePoster';
import MovieDetails from '../MovieDetails/MovieDetails';

function Movies({posters, upvote, downvote, upvoteIcon, downvoteIcon, displayDetails, homeIcon, details, goHome}) {
  const posterData = posters.map(poster => {
    return (
      <MoviePoster
        id={poster.id}
        key={poster.id}
        image={poster.poster_path}
        title={poster.title}
        vote_count={poster.vote_count}
        upvote={upvote}
        downvote={downvote}
        upvoteIcon={upvoteIcon}
        downvoteIcon={downvoteIcon}
        displayDetails={displayDetails}
        homeIcon={homeIcon}
        goHome={goHome}
      />
    )
  })

    const movieDetailsContent = null
    if (details !== null && details !== undefined) {
      movieDetailsContent = (
        <MovieDetails
          details={details}
          homeIcon={homeIcon}
          goHome={goHome}
          />
      )
    }
  return (
      <section className='MoviesContainer'>
        {posterData}
        {movieDetailsContent}
      </section>
  );
}
  
export default Movies;