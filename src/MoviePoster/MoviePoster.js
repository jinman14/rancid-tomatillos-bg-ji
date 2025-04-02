import './MoviePoster.css';

function MoviePoster({id, image, title, vote_count}) {
  return (
    <div className='MoviePoster'>
      <img src = {image}/>
        <h3>{vote_count}</h3>
    </div>
  );
}

export default MoviePoster;