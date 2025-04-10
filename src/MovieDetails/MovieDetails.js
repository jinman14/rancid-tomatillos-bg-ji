import './MovieDetails.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetails() {

  const [details, setDetails] = useState(null) 
  const posterId = useParams().id

  useEffect(() => {
      displayDetails(posterId)
    }, [])

  function displayDetails(id) {
    console.log('clicked')
    fetch(`https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/${id}`)
    .then((response) => response.json())
    .then((data) => { console.log(data); setDetails(data) })
    .catch((err) => console.log("Error:", err))
  }

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

  const genres = genre_ids?.join(', ');

  return (
    <section className='MovieDetails'>
      <div className='MovieBackdrop'>
        <img className = "MovieDetailImg" src={backdrop_path} alt={title} />
      <h2> {title} </h2>
      <h3> {genres} </h3>
      <p> {overview} </p>
      </div>
    </section>
  );
}

export default MovieDetails;