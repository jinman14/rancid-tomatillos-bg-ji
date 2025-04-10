import './App.css';
// import searchIcon from '../icons/search.png';

import dingSound from '../sounds/ding.mp3';
import hoverSound from '../sounds/hover_over.mp3';
import upvoteIcon from '../icons/upvote.png';
import downvoteIcon from '../icons/downvote.png';
import homeIcon from '../icons/home.png';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

// Example imports (for later):
import { useState, useEffect } from 'react';
// import moviePosters from '../data/movie_posters';
// import movieDetails from '../data/movie_details';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import MovieDetails from '../MovieDetails/MovieDetails';

function App() {

  const [posters, setPosters] = useState([])
  // const [details, setDetails] = useState(null) 
  const [error, setError] = useState(null)
  const [soundOn, setSoundOn] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();

  const ding = new Audio(dingSound)
  ding.volume = 0.2
  const hover = new Audio(hoverSound)
  hover.volume = 0.1

  function goHome(){
    navigate('/')
  }
  
  const showHomeIcon = location.pathname !== '/';
  
  useEffect(() => {
    displayMoviePosters()
  }, [])
//check later if we ever need this, refactor to just a useEffect if not
  function displayMoviePosters() {
    fetch('https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies')
    .then((response) => response.json())
    .then((data) => setPosters(data))
    .catch((err) => setError(err))
  }

  useEffect(() => {
    const enableAudio = () => {
      setSoundOn(true);
      document.removeEventListener('click', enableAudio);
    };

    document.addEventListener('click', enableAudio);

    return () => document.removeEventListener('click', enableAudio)
  })

  function castVote(id, direction){
    // //these will become POST requests
    // let specificPoster = posters.filter((poster) => {
    //   return poster.id === id
    // })
    // let updatedVoteCount = specificPoster[0].vote_count += 1
    // // console.log(updatedVoteCount)
    // let updatedPoster = { "vote_count": updatedVoteCount }
    // // setPosters([...posters])
    fetch(`https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/${id}`, {
    method:"PATCH",
    body: JSON.stringify({ vote_direction: direction }),
    headers: {
    'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => { console.log(data)
      ding.play();
      let desiredPoster = posters.find((poster) => {
        return poster.id === id
      })
      desiredPoster.vote_count = data.vote_count
      setPosters([...posters])})
    .catch((err) => setError(err))
      // .then((data) => console.log(data))
      // .then(displayMoviePosters())
    };
    
    // function downvote(id){
      //   let specificPoster = posters.filter((poster) => {
        //     return poster.id === id
        //   })
        //   specificPoster[0].vote_count -= 1
        //   setPosters([...posters])
        // };
        
    function playHoverSound() {
      if (soundOn) {
      hover.currentTime = 0;
      hover.play().catch((err) => {
        console.warn('hover sound failed:', err)
      });
      }
    }
  // let pageContent
  // if (details !== null && details !== undefined ){
  //   pageContent = <MovieDetails details={details} homeIcon={homeIcon} goHome={goHome} />
  // }
  // else {
  //   pageContent = (
  //     <MoviesContainer posters={posters} 
  //                         castVote={castVote} 
  //                         // downvote={downvote} 
  //                         upvoteIcon={upvoteIcon} 
  //                         downvoteIcon={downvoteIcon} 
  //                         displayDetails={displayDetails} 
  //                         />
  //   )
  // }

  return (
    <main className='App'>
      <header>
        <h1>
          rancid tomatillos
          {showHomeIcon && (
            <button onClick={goHome} className="home-button">
            <img src={homeIcon} alt="Home Icon" />
          </button>
          )}
        </h1>
      </header>
      {error && (
        <div className="error-message">
          {error.message}
        </div>
      )}
      <Routes>
        <Route path="/" element={  <MoviesContainer posters={posters} 
                            castVote={castVote} 
                            // downvote={downvote} 
                            upvoteIcon={upvoteIcon} 
                            downvoteIcon={downvoteIcon} 
                            // displayDetails={displayDetails}
                            playHoverSound={playHoverSound} 
                            />} />
        <Route path="/:id" element={ <MovieDetails />} />
      </Routes>
    </main>
  )
}
export default App;
