import './MoviePoster.css';

function MoviePoster({id, image, title, vote_count, upvote, downvote, upvoteIcon, downvoteIcon}) {
  return (
    <div className='MoviePoster'>
      <img className = "MoviePosterImg" src = {image}/>
      <h3><button onClick={() => upvote(id)}><img className = "VoteButton" src={upvoteIcon}/></button> {vote_count}<button onClick={() => upvote(id)}><img className = "VoteButton" src={downvoteIcon}/></button></h3>
    </div>
  );
}

export default MoviePoster;