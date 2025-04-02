import './MoviePoster.css';

function MoviePoster({id, image, title, vote_count}) {
  return (
    <section className='MoviePoster'>
      <img src = {image}/>
      <h3>{title}</h3>
      <p>{vote_count}</p>
    </section>
  );
}

export default MoviePoster;