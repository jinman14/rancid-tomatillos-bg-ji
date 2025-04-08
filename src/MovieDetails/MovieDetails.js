import './MovieDetails.css';
// import { useParams } from 'react-router-dom';

function MovieDetails({details, homeIcon, goHome}) {
  // console.log(details)
  // const posterId = useParams().id
  // const details = displayDetails(posterId)
  if (!details) {
    return (
      <section className='MovieDetails'>
        <div className="loading">Loading movie details...</div>
      </section>
    );
  }
  
  const backdrop_path = details.backdrop_path
  const genre_ids = details.genre_ids
  const overview = details.overview
  const title = details.title

  const genres = genre_ids.join(', ');

  return (
    <section className='MovieDetails'>
      <div className='MovieBackdrop'>
        <img className = "MovieDetailImg" src={backdrop_path} />
      <h2> {title} </h2>
      <h3> {genres} </h3>
      <p> {overview} </p>
      </div>
    </section>
  );
}

export default MovieDetails;