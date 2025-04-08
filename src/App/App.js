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
import MovieDetails from '../MovieDetails/MovieDetails';

function App() {

  const [posters, setPosters] = useState(moviePosters)
  const [details, setDetails] = useState(null) 

  function upvote(id){
    let specificPoster = posters.filter((poster) => {
      return poster.id === id
    })
    specificPoster[0].vote_count += 1
    setPosters([...posters])
  };

  function downvote(id){
    let specificPoster = posters.filter((poster) => {
      return poster.id === id
    })
    specificPoster[0].vote_count -= 1
    setPosters([...posters])
  };

  function displayDetails() {
    console.log('clicked')
    setDetails(movieDetails)
    //not sure if i should pass id yet since all moviedetails are the same for now, i think we will need it for fetching real data
  }
  
  function goHome(){
    setDetails(null)
  }

  let pageContent
  if (details !== null && details !== undefined ){
    pageContent = <MovieDetails details={details} homeIcon={homeIcon} goHome={goHome} />
  }
  else {
    pageContent = (
      <MoviesContainer posters={posters} 
                          upvote={upvote} 
                          downvote={downvote} 
                          upvoteIcon={upvoteIcon} 
                          downvoteIcon={downvoteIcon} 
                          displayDetails={displayDetails} 
                          />
    )
  }

  return (
    <main className='App'>
      <header>
        <h1>
          rancid tomatillos
          {details !== null && details !== undefined && (
            <button onClick={goHome} className="home-button">
            <img src={homeIcon} alt="Home Icon" />
          </button>
          )}
        </h1>
      </header>
      {pageContent}
    </main>
  )
}
export default App;
