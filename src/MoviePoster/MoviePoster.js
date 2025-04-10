import './MoviePoster.css';
import { Link } from 'react-router-dom';

function MoviePoster({id, image, title, vote_count, castVote, upvoteIcon, downvoteIcon, playHoverSound}) {
  return (
    <div className='MoviePoster'>
      <Link to={`/${id}`}>
        <img className = "MoviePosterImg" src = {image} onMouseEnter={playHoverSound}/>
      </Link>
      <h3><button onClick={() => castVote(id, "up")}><img className = "UpVoteButton" src={upvoteIcon}/></button> {vote_count}<button onClick={() => castVote(id, "down")}><img className = "DownVoteButton" src={downvoteIcon}/></button></h3>
    </div>
  );
}

export default MoviePoster;