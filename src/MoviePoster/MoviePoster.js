import './MoviePoster.css';

function MoviePoster({id, image, title, vote_count, castVote, upvoteIcon, downvoteIcon, displayDetails}) {
  return (
    <div className='MoviePoster'>
      <img className = "MoviePosterImg" src = {image}
      onClick={() => displayDetails(id) }/>
      <h3><button onClick={() => castVote(id, "up")}><img className = "VoteButton" src={upvoteIcon}/></button> {vote_count}<button onClick={() => castVote(id, "down")}><img className = "VoteButton" src={downvoteIcon}/></button></h3>
    </div>
  );
}

export default MoviePoster;