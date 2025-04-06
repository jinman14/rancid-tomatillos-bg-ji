import './App.css';
import searchIcon from '../icons/search.png';
import upvoteIcon from '../icons/upvote.png';
import downvoteIcon from '../icons/downvote.png';
import homeIcon from '../icons/home.png';

// Example imports (for later):
import { useState, useEffect } from 'react';
import moviePosters from '../data/movie_posters';
import movieDetails from '../data/movie_details';
import MoviesContainer from '../MoviesContainer/MoviesContainer';

function App() {

  const [posters, setPosters] = useState(moviePosters)
  const [details, setDetails] = useState(movieDetails)

  function upvote(id){
    // code that says increase vote count
    // find poster by id
    // get posters vote_count and add one, 
    // re render
    // console.log('clicked upvote!', posters)
    let specificPoster = posters.filter((poster) => {
      return poster.id === id
    })
    // console.log(specificPoster)
    specificPoster[0].vote_count += 1
    // console.log(specificPoster)
    setPosters([...posters])
  };

  function downvote(id){
    //decrease vote count by one
    // console.log('clicked downvote!', id)
    let specificPoster = posters.filter((poster) => {
      return poster.id === id
    })
    // console.log(specificPoster)
    specificPoster[0].vote_count -= 1
    // console.log(specificPoster)
    setPosters([...posters])
  };

  function displayDetails(id) {
    setDetails([...details])
    //not sure if i should pass id yet since all moviedetails are the same for now, i think we will need it for fetching real data
  }

  return (
    <main className='App'>
      <header>
        <h1>rancid tomatillos</h1>
      </header>
        <MoviesContainer posters={posters} upvote={upvote} downvote={downvote} upvoteIcon={upvoteIcon} downvoteIcon={downvoteIcon}/>
        <MovieDetails details={details} displayDetails={displayDetails} homeIcon={homeIcon}/>
    </main>
  );
}

export default App;
