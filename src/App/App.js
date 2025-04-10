import './App.css';
// import searchIcon from '../icons/search.png';

import dingSound from '../sounds/ding.mp3';
import hoverSound from '../sounds/hover_over.mp3';
import upvoteIcon from '../icons/upvote.png';
import downvoteIcon from '../icons/downvote.png';
import homeIcon from '../icons/home.png';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

import { useState, useEffect } from 'react';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import MovieDetails from '../MovieDetails/MovieDetails';

function App() {

  const [posters, setPosters] = useState([])
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
    };

    function playHoverSound() {
      if (soundOn) {
      hover.currentTime = 0;
      hover.play().catch((err) => {
        console.warn('hover sound failed:', err)
      });
      }
    }

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
                            upvoteIcon={upvoteIcon} 
                            downvoteIcon={downvoteIcon} 
                            playHoverSound={playHoverSound} 
                            />} />
        <Route path="/:id" element={ <MovieDetails />} />
      </Routes>
    </main>
  )
}
export default App;
