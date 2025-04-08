import './App.css';
import searchIcon from '../icons/search.png';
import upvoteIcon from '../icons/upvote.png';
import downvoteIcon from '../icons/downvote.png';
import homeIcon from '../icons/home.png';
import { Routes, Route, useNavigate } from 'react-router-dom'

// Example imports (for later):
import { useState, useEffect } from 'react';
// import moviePosters from '../data/movie_posters';
// import movieDetails from '../data/movie_details';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import MovieDetails from '../MovieDetails/MovieDetails';

function App() {

  const [posters, setPosters] = useState([])
  const [details, setDetails] = useState(null) 
  const navigate = useNavigate();

  useEffect(() => {
    displayMoviePosters()
  }, [])
//check later if we ever need this, refactor to just a useEffect if not
  function displayMoviePosters() {
    fetch('https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies')
    .then((response) => response.json())
    .then((data) => setPosters(data))
  }

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
      let desiredPoster = posters.find((poster) => {
        return poster.id === id
      })
      desiredPoster.vote_count = data.vote_count
      setPosters([...posters])})
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

  function displayDetails(id) {
    console.log('clicked')
    fetch(`https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/${id}`)
    .then((response) => response.json())
    .then((data) => { console.log(data); setDetails(data) })
  }

  function goHome(){
    setDetails(null)
    navigate('/')
  }

  let pageContent
  if (details !== null && details !== undefined ){
    pageContent = <MovieDetails details={details} homeIcon={homeIcon} goHome={goHome} />
  }
  else {
    pageContent = (
      <MoviesContainer posters={posters} 
                          castVote={castVote} 
                          // downvote={downvote} 
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
      <Routes>
        <Route path="/" element={  <MoviesContainer posters={posters} 
                            castVote={castVote} 
                            // downvote={downvote} 
                            upvoteIcon={upvoteIcon} 
                            downvoteIcon={downvoteIcon} 
                            displayDetails={displayDetails} 
                            />} />
        <Route path="/:id" element={ <MovieDetails details={details} homeIcon={homeIcon} goHome={goHome} />} />
      </Routes>
    </main>
  )
}
export default App;
